"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Control = {
  id: string;
  sno: number;
  control_no: string;
  title: string;
  description: string;
  evidences: string[];
};

type ComplianceAnswer = {
  id?: string;
  control_id: string;
  checked_evidences: boolean[];
  uploaded_files: { name: string; url: string }[];
  comment: string;
};

export default function DepartmentAuaKuaPage() {
  const [controls, setControls] = useState<Control[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<ComplianceAnswer | null>(
    null
  );
  const [savedAnswers, setSavedAnswers] = useState<ComplianceAnswer[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved answer for a control
  const fetchAnswer = useCallback(async (controlId: string) => {
    const { data, error } = await supabase
      .from("compliance_answers")
      .select("*")
      .eq("control_id", controlId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Fetch answer error:", error);
      return null;
    }

    if (!data) return null;

    return {
      ...data,
      checked_evidences: Array.isArray(data.checked_evidences)
        ? data.checked_evidences
        : [],
      uploaded_files: Array.isArray(data.uploaded_files)
        ? data.uploaded_files
        : [],
    };
  }, []);

  // Load a specific control into the UI
  const loadControl = useCallback(
    async (index: number, controlsArray: Control[]) => {
      const control = controlsArray[index];
      const answer = await fetchAnswer(control.id);

      setCurrentAnswer({
        id: answer?.id,
        control_id: control.id,
        checked_evidences:
          answer?.checked_evidences ||
          Array(control.evidences.length).fill(false),
        uploaded_files: answer?.uploaded_files || [],
        comment: answer?.comment || "",
      });

      setCurrentIndex(index);
    },
    [fetchAnswer]
  );

  // Fetch all controls on mount
  useEffect(() => {
    const fetchControls = async () => {
      const { data, error } = await supabase
        .from("controls")
        .select("*")
        .order("sno");

      if (error) {
        console.error("Fetch controls error:", error);
        return;
      }

      setControls(data || []);
      if (data && data.length > 0) loadControl(0, data);
    };

    fetchControls();
  }, [loadControl]);

  // Toggle evidence checkbox
  const handleEvidenceCheck = (idx: number) => {
    if (!currentAnswer) return;
    const updatedChecks = [...currentAnswer.checked_evidences];
    updatedChecks[idx] = !updatedChecks[idx];
    setCurrentAnswer({ ...currentAnswer, checked_evidences: updatedChecks });
  };

  // Upload evidence files to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentAnswer) return;
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    const uploaded: { name: string; url: string }[] = [];

    for (const file of Array.from(files)) {
      const filePath = `department1/${currentAnswer.control_id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload failed:", uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("evidence")
        .getPublicUrl(filePath);

      uploaded.push({ name: file.name, url: publicUrlData.publicUrl });
    }

    setCurrentAnswer({
      ...currentAnswer,
      uploaded_files: [...currentAnswer.uploaded_files, ...uploaded],
    });

    setLoading(false);
  };

  // Update comment
  const handleCommentChange = (comment: string) => {
    if (!currentAnswer) return;
    setCurrentAnswer({ ...currentAnswer, comment });
  };

  // Save current compliance answer
  const saveCurrentAnswer = async () => {
    if (!currentAnswer) return;
    setLoading(true);

    const payload = {
      control_id: currentAnswer.control_id,
      checked_evidences: currentAnswer.checked_evidences,
      uploaded_files: currentAnswer.uploaded_files,
      comment: currentAnswer.comment,
      updated_at: new Date(),
    };

    if (currentAnswer.id) {
      const { error } = await supabase
        .from("compliance_answers")
        .update(payload)
        .eq("id", currentAnswer.id);

      if (error) console.error("Update error:", error);
    } else {
      const { data, error } = await supabase
        .from("compliance_answers")
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        setCurrentAnswer({ ...currentAnswer, id: data.id });
      }
      if (error) console.error("Insert error:", error);
    }

    setSavedAnswers((prev) => {
      const exists = prev.find((a) => a.control_id === currentAnswer.control_id);
      if (exists) {
        return prev.map((a) =>
          a.control_id === currentAnswer.control_id ? currentAnswer : a
        );
      }
      return [...prev, currentAnswer];
    });

    setLoading(false);
    alert("Compliance saved successfully.");
  };

  // Navigation buttons
  const goPrevious = () => {
    if (currentIndex > 0) loadControl(currentIndex - 1, controls);
  };

  const goNext = () => {
    if (currentIndex < controls.length - 1) loadControl(currentIndex + 1, controls);
  };

  if (controls.length === 0 || !currentAnswer) {
    return <p className="text-center text-gray-500">No controls available.</p>;
  }

  const control = controls[currentIndex];

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        AUA/KUA Compliance Panel
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {control.control_no}. {control.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{control.description}</p>

          <div className="mb-4">
            <h4 className="font-semibold text-indigo-600 mb-2">Evidences</h4>
            {control.evidences.map((evidence, idx) => (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <input
                  type="checkbox"
                  checked={currentAnswer.checked_evidences[idx] || false}
                  onChange={() => handleEvidenceCheck(idx)}
                  className="w-5 h-5 text-indigo-600 rounded"
                />
                <span>{evidence}</span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-indigo-600 mb-1">
              Upload Evidence Files
            </label>
            <Input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={loading}
            />
            {currentAnswer.uploaded_files.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {currentAnswer.uploaded_files.map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 underline"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-indigo-600 mb-1">
              Comments
            </label>
            <Textarea
              value={currentAnswer.comment}
              onChange={(e) => handleCommentChange(e.target.value)}
              rows={4}
              placeholder="Add your comment..."
            />
          </div>

          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={saveCurrentAnswer}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Compliance"}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between mb-6">
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={goPrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={goNext}
          disabled={currentIndex === controls.length - 1}
        >
          Next
        </Button>
      </div>

      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
        Saved Compliances
      </h3>
      {savedAnswers.length === 0 ? (
        <p className="text-gray-500">No saved compliances yet.</p>
      ) : (
        savedAnswers.map((q, idx) => {
          const controlRef = controls.find((c) => c.id === q.control_id);
          return (
            <Card key={idx} className="mb-4">
              <CardContent>
                <h4 className="font-semibold text-indigo-600">
                  {controlRef?.control_no}. {controlRef?.title}
                </h4>
                <p className="text-gray-700">{controlRef?.description}</p>
                <p className="mt-2">
                  <strong>Evidences:</strong> {controlRef?.evidences.join(", ")}
                </p>
                {q.uploaded_files.length > 0 && (
                  <ul className="list-disc list-inside mt-2">
                    {q.uploaded_files.map((file, fileIdx) => (
                      <li key={fileIdx}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-gray-700">
                  <strong>Comment:</strong> {q.comment}
                </p>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

