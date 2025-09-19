"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2, XCircle, FolderOpen } from "lucide-react";

type UploadedFile = { name: string; url: string };

type SavedQuestion = {
  id?: string;
  sno: number;
  controlNo: string;
  title: string;
  controlDescription: string; // from controls table
  answerDescription: string; // from compliance_answers table
  evidences: string[];
  checkedEvidences: boolean[];
  uploadedFiles: UploadedFile[];
  comment: string;
  auditorComment?: string;
  status?: "approved" | "rejected" | "pending";
};

type ComplianceRow = {
  id: string;
  control_id: string;
  checked_evidences: boolean[];
  uploaded_files: UploadedFile[];
  comment: string;
  auditor_comment: string | null;
  status: "approved" | "rejected" | "pending" | null;
  description: string | null;
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
      .select(`
        id,
        control_id,
        checked_evidences,
        uploaded_files,
        comment,
        auditor_comment,
        status,
        description,
        controls (
          sno,
          control_no,
          title,
          description,
          evidences
        )
      `);

    if (error) {
      console.error("Fetch error:", error);
      return;
    }
    if (!data) return;

    const mapped: SavedQuestion[] = (data as unknown as ComplianceRow[]).map(
      (row) => {
        const control = row.controls?.[0];
        return {
          id: row.id,
          sno: control?.sno || 0,
          controlNo: control?.control_no || "",
          title: control?.title || "",
          controlDescription: control?.description || "",
          answerDescription: row.description || "",
          evidences: control?.evidences || [],
          checkedEvidences: row.checked_evidences || [],
          uploadedFiles: row.uploaded_files || [],
          comment: row.comment || "",
          auditorComment: row.auditor_comment || "",
          status: row.status || "pending",
        };
      }
    );

    setControls(mapped);
    setAuditorComments(mapped.map((c) => c.auditorComment || ""));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
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

    if (!error) {
      const updatedControls = [...controls];
      updatedControls[idx].status = status;
      setControls(updatedControls);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-12 drop-shadow">
        AUA / KUA Compliance Reports
      </h1>

      {controls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No compliance reports found.
        </p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control, idx) => (
            <Card
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-5 rounded-t-2xl">
                <CardTitle className="text-white font-bold text-lg flex items-center gap-2">
                  <FileText size={20} /> {control.controlNo}. {control.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                {/* Control Description */}
                <div>
                  <h3 className="text-indigo-600 font-semibold mb-2">
                    Control Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {control.controlDescription}
                  </p>
                </div>

                {/* Answer Description */}
                <div>
                  <h3 className="text-indigo-600 font-semibold mb-2">
                    Department Answer Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {control.answerDescription || "No description provided"}
                  </p>
                </div>

                {/* Evidences */}
                <div>
                  <h3 className="text-indigo-600 font-semibold mb-2">
                    Evidences Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {control.evidences.map((evi, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                          control.checkedEvidences?.[i]
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {control.checkedEvidences?.[i] ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                        {evi}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Uploaded Files */}
                <div>
                  <h3 className="text-indigo-600 font-semibold mb-2 flex items-center gap-1">
                    <FolderOpen size={18} /> Uploaded Files
                  </h3>
                  {control.uploadedFiles.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {control.uploadedFiles.map((file, fileIdx) => (
                        <a
                          key={fileIdx}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200"
                        >
                          {file.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No files uploaded</p>
                  )}
                </div>

                {/* Department Comment */}
                <div>
                  <h3 className="text-indigo-600 font-semibold mb-2">
                    Department Comment
                  </h3>
                  <p className="text-gray-700">
                    {control.comment || "No comment provided"}
                  </p>
                </div>

                {/* Auditor Section */}
                <div className="bg-gray-50 border p-4 rounded-xl space-y-3">
                  <label className="block font-semibold text-indigo-700">
                    Auditor Comment
                  </label>
                  <textarea
                    className="w-full p-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={auditorComments[idx]}
                    onChange={(e) => handleCommentChange(idx, e.target.value)}
                    placeholder="Add your auditor comment..."
                  />
                  <button
                    onClick={() => saveComment(idx)}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {loading ? "Saving..." : "Save Comment"}
                  </button>

                  {/* Status buttons */}
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

                  {/* Status Badge */}
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
