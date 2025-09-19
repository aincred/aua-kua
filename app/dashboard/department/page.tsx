"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

// Type for Supabase response row
type ComplianceRow = {
  id: string;
  checked_evidences: boolean[];
  uploaded_files: { name: string; url: string }[];
  comment: string;
  auditor_comment?: string;
  status: "approved" | "rejected" | "pending" | null;
  controls: {
    sno: number;
    control_no: string;
    title: string;
    description: string;
    evidences: string[];
  };
};

export default function DepartmentDashboard() {
  const [savedControls, setSavedControls] = useState<SavedQuestion[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Fetch department's compliance records
  const fetchSavedCompliance = async () => {
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
      console.error("Failed to fetch compliance answers:", error);
      return;
    }

    // Fix: cast via unknown first
    const mapped: SavedQuestion[] = (data as unknown as ComplianceRow[]).map(
      (row) => ({
        id: row.id,
        sno: row.controls.sno,
        controlNo: row.controls.control_no,
        title: row.controls.title,
        description: row.controls.description,
        evidences: row.controls.evidences || [],
        checkedEvidences: row.checked_evidences || [],
        uploadedFiles: row.uploaded_files || [],
        comment: row.comment || "",
        auditorComment: row.auditor_comment || "",
        status: row.status || "pending",
      })
    );

    setSavedControls(mapped);

    // Count statuses
    const counts = mapped.reduce(
      (acc, item) => {
        if (item.status === "approved") acc.approved += 1;
        else if (item.status === "rejected") acc.rejected += 1;
        else acc.pending += 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );
    setStatusCounts(counts);
  };

  useEffect(() => {
    fetchSavedCompliance();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white px-2 py-1 rounded";
      case "rejected":
        return "bg-red-500 text-white px-2 py-1 rounded";
      default:
        return "bg-yellow-500 text-gray-900 px-2 py-1 rounded";
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Department Dashboard
      </h1>
      <p className="text-gray-600 text-center">
        Overview of your AUA/KUA compliance submissions
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Pending", value: statusCounts.pending, color: "bg-yellow-500" },
          { title: "Approved", value: statusCounts.approved, color: "bg-green-500" },
          { title: "Rejected", value: statusCounts.rejected, color: "bg-red-500" },
          { title: "Total Controls", value: savedControls.length, color: "bg-blue-500" },
        ].map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl shadow-lg p-6 ${card.color} text-white`}
          >
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Control Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Pending Controls", value: statusCounts.pending },
          { title: "Approved Controls", value: statusCounts.approved },
          { title: "Rejected Controls", value: statusCounts.rejected },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Compliance Table */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Compliance Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Control No.</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedControls.slice(-5).reverse().map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{c.controlNo}</td>
                  <td className="px-4 py-2">{c.title}</td>
                  <td className="px-4 py-2 capitalize font-medium">
                    <span className={getStatusBadge(c.status || "pending")}>
                      {c.status?.toUpperCase() || "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
              {savedControls.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 p-4">
                    No compliance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
