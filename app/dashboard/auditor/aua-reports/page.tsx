"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SavedQuestion = {
  id?: string;
  sno: number;
  controlNo: string;
  title: string;
  description: string;
  evidences: string[];
  checkedEvidences: boolean[];
  uploadedFiles: { name: string; url: string }[];
  comment: string;
  auditorComment?: string;
  status?: "approved" | "rejected" | "pending";
};

type ComplianceRow = {
  id: string;
  control_id: string;
  checked_evidences: boolean[];
  uploaded_files: { name: string; url: string }[];
  comment: string | null;
  auditor_comment: string | null;
  status: "approved" | "rejected" | "pending" | null;
  controls: {
    sno: number;
    control_no: string;
    title: string;
    description: string;
    evidences: string[];
  }[];
};

export default function AuditComplianceReports() {
  const [controls, setControls] = useState<SavedQuestion[]>([]);
  const [auditorComments, setAuditorComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    const { data, error } = await supabase
      .from("compliance_answers")
      .select(
        `
        id,
        control_id,
        checked_evidences,
        uploaded_files,
        comment,
        auditor_comment,
        status,
        controls (
          sno,
          control_no,
          title,
          description,
          evidences
        )
      `
      );

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    if (!data) return;

    const mapped: SavedQuestion[] = (data as ComplianceRow[]).map((row) => {
      const control = row.controls[0];
      return {
        id: row.id,
        sno: control?.sno || 0,
        controlNo: control?.control_no || "",
        title: control?.title || "",
        description: control?.description || "",
        evidences: control?.evidences || [],
        checkedEvidences: row.checked_evidences || [],
        uploadedFiles: row.uploaded_files || [],
        comment: row.comment || "",
        auditorComment: row.auditor_comment || "",
        status: row.status || "pending",
      };
    });

    setControls(mapped);
    setAuditorComments(mapped.map((c) => c.auditorComment || ""));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    }
  };

  const handleCommentChange = (idx: number, value: string) => {
    const updated = [...auditorComments];
    updated[idx] = value;
    setAuditorComments(updated);
  };

  const saveComment = async (idx: number) => {
    if (!controls[idx].id) return;
    setLoading(true);

    const { error } = await supabase
      .from("compliance_answers")
      .update({ auditor_comment: auditorComments[idx] })
      .eq("id", controls[idx].id);

    if (error) {
      console.error("Save comment error:", error);
    } else {
      const updatedControls = [...controls];
      updatedControls[idx].auditorComment = auditorComments[idx];
      setControls(updatedControls);
      alert("Comment saved successfully.");
    }

    setLoading(false);
  };

  const handleStatusChange = async (
    idx: number,
    status: "approved" | "rejected" | "pending"
  ) => {
    if (!controls[idx].id) return;
    setLoading(true);

    const { error } = await supabase
      .from("compliance_answers")
      .update({ status })
      .eq("id", controls[idx].id);

    if (error) {
      console.error("Status update error:", error);
    } else {
      const updatedControls = [...controls];
      updatedControls[idx].status = status;
      setControls(updatedControls);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-12">
        AUA / KUA Compliance Reports
      </h1>

      {controls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No compliance reports found.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control, idx) => (
            <Card
              key={idx}
              className="bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition"
            >
              <CardHeader className="bg-indigo-600 p-4 rounded-t-2xl">
                <CardTitle className="text-white font-semibold text-lg">
                  {control.controlNo}. {control.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <p className="text-gray-700 leading-relaxed">
                  {control.description}
                </p>

                <div className="bg-gray-50 border p-3 rounded-lg">
                  <strong className="text-indigo-600">Evidences Required:</strong>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {control.evidences.map((evi, i) => (
                      <li key={i}>
                        {evi} {control.checkedEvidences?.[i] ? "✔️" : "❌"}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 border p-3 rounded-lg">
                  <strong className="text-indigo-600">Uploaded Files:</strong>
                  {control.uploadedFiles.length > 0 ? (
                    <ul className="list-disc list-inside text-indigo-700 mt-2">
                      {control.uploadedFiles.map((file, fileIdx) => (
                        <li key={fileIdx}>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-indigo-500"
                          >
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No files uploaded</p>
                  )}
                </div>

                <div className="bg-gray-50 border p-3 rounded-lg">
                  <strong className="text-indigo-600">Department Comment:</strong>
                  <p className="text-gray-700 mt-1">{control.comment || "N/A"}</p>
                </div>

                {/* Auditor Section */}
                <div className="bg-gray-100 border p-4 rounded-xl space-y-3">
                  <label className="block font-semibold text-indigo-700">
                    Auditor Comment:
                  </label>
                  <textarea
                    className="w-full p-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={auditorComments[idx]}
                    onChange={(e) => handleCommentChange(idx, e.target.value)}
                    placeholder="Add your auditor comment here..."
                  />
                  <button
                    onClick={() => saveComment(idx)}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {loading ? "Saving..." : "Save Comment"}
                  </button>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleStatusChange(idx, "approved")}
                      disabled={loading}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(idx, "rejected")}
                      disabled={loading}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(idx, "pending")}
                      disabled={loading}
                      className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
                    >
                      Pending
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        control.status || "pending"
                      )}`}
                    >
                      {control.status?.toUpperCase() || "PENDING"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 