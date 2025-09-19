"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Type for mapped data used in the UI
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

// Supabase response type
type ComplianceAnswerFromDB = {
  id: string;
  checked_evidences: boolean[] | null;
  uploaded_files: { name: string; url: string }[] | null;
  comment: string | null;
  auditor_comment: string | null;
  status: "approved" | "rejected" | "pending" | null;
  controls: {
    sno: number;
    control_no: string;
    title: string;
    description: string;
    evidences: string[];
  }[]; // <-- Supabase returns an array for joined tables
};

export default function AdminOverviewPage() {
  const [controls, setControls] = useState<SavedQuestion[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("compliance_answers")
      .select(
        `
        id,
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
      setLoading(false);
      return;
    }

    if (!data) {
      setLoading(false);
      return;
    }

    // Map data safely with full types
    const mapped: SavedQuestion[] = (data as ComplianceAnswerFromDB[])
      .filter((row) => row.controls.length > 0) // ensure controls array exists
      .map((row) => {
        const control = row.controls[0]; // take the first element
        return {
          id: row.id,
          sno: control.sno,
          controlNo: control.control_no,
          title: control.title,
          description: control.description,
          evidences: control.evidences ?? [],
          checkedEvidences: row.checked_evidences ?? [],
          uploadedFiles: row.uploaded_files ?? [],
          comment: row.comment ?? "",
          auditorComment: row.auditor_comment ?? "",
          status: row.status ?? "pending",
        };
      });

    // Count statuses
    const counts = { approved: 0, rejected: 0, pending: 0 };
    mapped.forEach((c) => {
      if (c.status === "approved") counts.approved += 1;
      else if (c.status === "rejected") counts.rejected += 1;
      else counts.pending += 1;
    });

    setControls(mapped);
    setStatusCounts(counts);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
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
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <h1 className="text-4xl font-bold text-indigo-600 text-center mb-10">
        Auditor Compliance Overview
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Status Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white shadow-md p-6 text-center">
              <h2 className="text-lg font-medium text-gray-700">Approved</h2>
              <p className="text-3xl font-bold text-green-600">{statusCounts.approved}</p>
            </Card>

            <Card className="bg-white shadow-md p-6 text-center">
              <h2 className="text-lg font-medium text-gray-700">Rejected</h2>
              <p className="text-3xl font-bold text-red-600">{statusCounts.rejected}</p>
            </Card>

            <Card className="bg-white shadow-md p-6 text-center">
              <h2 className="text-lg font-medium text-gray-700">Pending</h2>
              <p className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </Card>
          </div>

          {/* Controls List */}
          {controls.length === 0 ? (
            <p className="text-center text-gray-500">No compliance reports found.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {controls.map((control) => (
                <Card key={control.id} className="bg-white shadow-lg rounded-lg">
                  <CardHeader className="bg-indigo-50 p-4 rounded-t-lg">
                    <CardTitle className="text-indigo-600 font-semibold text-lg">
                      {control.controlNo}. {control.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4">
                    <p className="text-gray-700">{control.description}</p>

                    {/* Checked Evidences */}
                    <div className="bg-gray-100 rounded p-3">
                      <strong className="text-indigo-600">Checked Evidences:</strong>
                      <p className="text-gray-700 mt-1">
                        {control.checkedEvidences.length
                          ? control.evidences
                              .filter((_, i) => control.checkedEvidences[i])
                              .join(", ") || "None"
                          : "None"}
                      </p>
                    </div>

                    {/* Uploaded Files */}
                    <div className="bg-gray-100 rounded p-3">
                      <strong className="text-indigo-600">Uploaded Files:</strong>
                      {control.uploadedFiles.length > 0 ? (
                        <ul className="list-disc list-inside mt-1 text-indigo-700">
                          {control.uploadedFiles.map((file, idx) => (
                            <li key={idx}>
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
                        <p className="text-gray-700">None</p>
                      )}
                    </div>

                    {/* Department Comment */}
                    <div className="bg-gray-100 rounded p-3">
                      <strong className="text-indigo-600">Department Comment:</strong>
                      <p className="text-gray-700 mt-1">{control.comment || "N/A"}</p>
                    </div>

                    {/* Auditor Comment */}
                    <div className="bg-gray-100 rounded p-3">
                      <strong className="text-indigo-600">Auditor Comment:</strong>
                      <p className="text-gray-700 mt-1">{control.auditorComment || "N/A"}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                          control.status || "pending"
                        )}`}
                      >
                        {control.status?.toUpperCase() || "PENDING"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
