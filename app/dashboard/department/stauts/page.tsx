"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Control = {
  id: string;
  sno: number;
  control_no: string;
  title: string;
  description: string;
  evidences: string[];
};

type UploadedFile = {
  name: string;
  url: string;
};

type ComplianceAnswer = {
  id?: string;
  control_id: string;
  checked_evidences: boolean[];
  uploaded_files: UploadedFile[];
  comment: string;
  auditor_comment?: string;
  status?: "approved" | "rejected" | "pending" | null;
};

type SavedQuestion = {
  id?: string;
  sno: number;
  controlNo: string;
  title: string;
  description: string;
  evidences: string[];
  checkedEvidences: boolean[];
  uploadedFiles: UploadedFile[];
  comment: string;
  auditorComment: string | null;
  status: "approved" | "rejected" | "pending";
};

export default function DepartmentStatusPage() {
  const [controls, setControls] = useState<Control[]>([]);
  const [savedAnswers, setSavedAnswers] = useState<SavedQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch controls
  const fetchControls = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<"controls", Control>("controls")
      .select("*")
      .order("sno");

    if (error) {
      console.error("Fetch controls error:", error);
      setLoading(false);
      return;
    }

    if (data) setControls(data);
    setLoading(false);
  }, []);

  // Fetch saved compliance answers
  const fetchAnswers = useCallback(async () => {
    if (controls.length === 0) return;

    setLoading(true);
    const { data, error } = await supabase
      .from<"compliance_answers", ComplianceAnswer>("compliance_answers")
      .select("*");

    if (error) {
      console.error("Fetch compliance answers error:", error);
      setLoading(false);
      return;
    }

    if (!data) {
      setSavedAnswers([]);
      setLoading(false);
      return;
    }

    const mapped: SavedQuestion[] = data
      .map((row) => {
        const control = controls.find((c) => c.id === row.control_id);
        if (!control) return null;
        return {
          id: row.id,
          sno: control.sno,
          controlNo: control.control_no,
          title: control.title,
          description: control.description,
          evidences: control.evidences,
          checkedEvidences: row.checked_evidences,
          uploadedFiles: row.uploaded_files,
          comment: row.comment,
          auditorComment: row.auditor_comment || null,
          status: row.status || "pending",
        };
      })
      .filter(Boolean) as SavedQuestion[];

    setSavedAnswers(mapped);
    setLoading(false);
  }, [controls]);

  useEffect(() => {
    fetchControls();
  }, [fetchControls]);

  useEffect(() => {
    if (controls.length > 0) {
      fetchAnswers();
    }
  }, [controls, fetchAnswers]);

  if (loading) {
    return <p className="text-center text-gray-500 p-4">Loading...</p>;
  }

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        Department Compliance Status
      </h2>

      {savedAnswers.length === 0 ? (
        <p className="text-gray-500 text-center">No saved compliances yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {savedAnswers.map((q) => (
            <Card key={q.id} className="shadow-lg border rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {q.controlNo}. {q.title}
                </CardTitle>
                <Badge className={`${getStatusColor(q.status)} capitalize`}>
                  {q.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>{q.description}</p>

                <div>
                  <strong>Evidences:</strong>
                  <ul className="list-disc list-inside ml-4 text-gray-600">
                    {q.evidences.map((ev, idx) => (
                      <li key={idx}>{ev}</li>
                    ))}
                  </ul>
                </div>

                {q.uploadedFiles.length > 0 && (
                  <div>
                    <strong>Uploaded Files:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {q.uploadedFiles.map((file) => (
                        <li key={file.url}>
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
                  </div>
                )}

                <div>
                  <strong>Checked Evidences:</strong>{" "}
                  {q.checkedEvidences.map((c, i) => (
                    <span key={i} className="mr-1">
                      {c ? "✔️" : "❌"}
                    </span>
                  ))}
                </div>

                <div>
                  <strong>Department Comment:</strong>{" "}
                  <span className="text-gray-600">
                    {q.comment || "No comment"}
                  </span>
                </div>

                <div>
                  <strong>Auditor Comment:</strong>{" "}
                  <span className="text-gray-600">
                    {q.auditorComment || "No auditor comment"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
