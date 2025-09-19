// // "use client";

// // import { useState, useEffect } from "react";

// // type Role = "admin" | "auditor" | "department";
// // type User = { id: number; email: string; password: string; role: Role };

// // type Control = {
// //   sno: number;
// //   controlNo: string;
// //   title: string;
// //   description: string;
// //   evidences: string[];
// //   status?: "approved" | "rejected" | "pending";
// // };

// // export default function AdminOverviewPage() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [controls, setControls] = useState<Control[]>([]);

// //   const [userStats, setUserStats] = useState({
// //     admin: 0,
// //     auditor: 0,
// //     department: 0,
// //   });

// //   const [controlStats, setControlStats] = useState({
// //     pending: 0,
// //     approved: 0,
// //     rejected: 0,
// //   });

// //   useEffect(() => {
// //     // Load users & controls from localStorage
// //     const savedUsers = localStorage.getItem("allUsers");
// //     const savedControls = localStorage.getItem("controls");

// //     if (savedUsers) setUsers(JSON.parse(savedUsers));
// //     if (savedControls) setControls(JSON.parse(savedControls));
// //   }, []);

// //   useEffect(() => {
// //     // Update user stats
// //     const stats = { admin: 0, auditor: 0, department: 0 };
// //     users.forEach((u) => stats[u.role]++);
// //     setUserStats(stats);

// //     // Update control stats
// //     const cStats = { pending: 0, approved: 0, rejected: 0 };
// //     controls.forEach((c) => c.status ? cStats[c.status]++ : cStats.pending++);
// //     setControlStats(cStats);
// //   }, [users, controls]);

// //   return (
// //     <div className="p-8 bg-gray-900 min-h-screen text-white space-y-8">
// //       <h1 className="text-4xl font-bold text-center">Admin Overview</h1>
// //       <p className="text-gray-400 text-center">
// //         Quick summary of users and AUA/KUA controls
// //       </p>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <div className="bg-purple-600 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Admins</h2>
// //           <p className="text-3xl font-bold">{userStats.admin}</p>
// //         </div>
// //         <div className="bg-blue-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Auditors</h2>
// //           <p className="text-3xl font-bold">{userStats.auditor}</p>
// //         </div>
// //         <div className="bg-green-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Departments</h2>
// //           <p className="text-3xl font-bold">{userStats.department}</p>
// //         </div>
// //         <div className="bg-yellow-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Total Controls</h2>
// //           <p className="text-3xl font-bold">{controls.length}</p>
// //         </div>
// //       </div>

// //       {/* Controls Status */}
// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Pending Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.pending}</p>
// //         </div>
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Approved Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.approved}</p>
// //         </div>
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Rejected Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.rejected}</p>
// //         </div>
// //       </div>

// //       {/* Recent Users Table */}
// //       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border border-gray-700">
// //             <thead className="bg-gray-700 text-gray-300">
// //               <tr>
// //                 <th className="px-4 py-2 text-left">Email</th>
// //                 <th className="px-4 py-2 text-left">Role</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.slice(-5).reverse().map((u) => (
// //                 <tr key={u.id} className="hover:bg-gray-700">
// //                   <td className="px-4 py-2">{u.email}</td>
// //                   <td className="px-4 py-2 capitalize">{u.role}</td>
// //                 </tr>
// //               ))}
// //               {users.length === 0 && (
// //                 <tr>
// //                   <td colSpan={2} className="text-center p-4 text-gray-400">
// //                     No users available
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </section>

// //       {/* Recent Controls Table */}
// //       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold mb-4">Recent Controls</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border border-gray-700">
// //             <thead className="bg-gray-700 text-gray-300">
// //               <tr>
// //                 <th className="px-4 py-2">Control No.</th>
// //                 <th className="px-4 py-2">Title</th>
// //                 <th className="px-4 py-2">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {controls.slice(-5).reverse().map((c, i) => (
// //                 <tr key={i} className="hover:bg-gray-700">
// //                   <td className="px-4 py-2">{c.controlNo}</td>
// //                   <td className="px-4 py-2">{c.title}</td>
// //                   <td className="px-4 py-2 capitalize">{c.status}</td>
// //                 </tr>
// //               ))}
// //               {controls.length === 0 && (
// //                 <tr>
// //                   <td colSpan={3} className="text-center p-4 text-gray-400">
// //                     No controls available
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // type Role = "admin" | "auditor" | "department";
// // type User = { id: string; email: string; role: Role };
// // type Control = {
// //   sno: number;
// //   control_no: string;
// //   title: string;
// //   description: string;
// //   evidences: string[];
// //   status?: "approved" | "rejected" | "pending";
// // };

// // export default function AdminOverviewPage() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [controls, setControls] = useState<Control[]>([]);
// //   const [userStats, setUserStats] = useState({ admin: 0, auditor: 0, department: 0 });
// //   const [controlStats, setControlStats] = useState({ pending: 0, approved: 0, rejected: 0 });

// //   const fetchUsers = async () => {
// //     const { data, error } = await supabase.from("users").select("*");
// //     if (!error && data) setUsers(data as User[]);
// //   };

// //   const fetchControls = async () => {
// //     const { data, error } = await supabase.from("controls").select("*");
// //     if (!error && data) setControls(data as Control[]);
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //     fetchControls();
// //   }, []);

// //   useEffect(() => {
// //     // Update user stats
// //     const stats = { admin: 0, auditor: 0, department: 0 };
// //     users.forEach((u) => stats[u.role]++);
// //     setUserStats(stats);

// //     // Update control stats
// //     const cStats = { pending: 0, approved: 0, rejected: 0 };
// //     controls.forEach((c) => c.status ? cStats[c.status]++ : cStats.pending++);
// //     setControlStats(cStats);
// //   }, [users, controls]);

// //   return (
// //     <div className="p-8 bg-gray-900 min-h-screen text-white space-y-8">
// //       <h1 className="text-4xl font-bold text-center">Admin Overview</h1>
// //       <p className="text-gray-400 text-center">Summary of users and AUA/KUA controls</p>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <div className="bg-purple-600 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Admins</h2>
// //           <p className="text-3xl font-bold">{userStats.admin}</p>
// //         </div>
// //         <div className="bg-blue-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Auditors</h2>
// //           <p className="text-3xl font-bold">{userStats.auditor}</p>
// //         </div>
// //         <div className="bg-green-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Departments</h2>
// //           <p className="text-3xl font-bold">{userStats.department}</p>
// //         </div>
// //         <div className="bg-yellow-500 rounded-xl p-6 shadow-lg">
// //           <h2 className="text-lg font-semibold">Total Controls</h2>
// //           <p className="text-3xl font-bold">{controls.length}</p>
// //         </div>
// //       </div>

// //       {/* Controls Status */}
// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Pending Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.pending}</p>
// //         </div>
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Approved Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.approved}</p>
// //         </div>
// //         <div className="bg-gray-700 rounded-xl p-4 shadow">
// //           <h3 className="font-semibold text-lg">Rejected Controls</h3>
// //           <p className="text-2xl font-bold">{controlStats.rejected}</p>
// //         </div>
// //       </div>

// //       {/* Recent Users Table */}
// //       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border border-gray-700">
// //             <thead className="bg-gray-700 text-gray-300">
// //               <tr>
// //                 <th className="px-4 py-2 text-left">Email</th>
// //                 <th className="px-4 py-2 text-left">Role</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.slice(-5).reverse().map((u) => (
// //                 <tr key={u.id} className="hover:bg-gray-700">
// //                   <td className="px-4 py-2">{u.email}</td>
// //                   <td className="px-4 py-2 capitalize">{u.role}</td>
// //                 </tr>
// //               ))}
// //               {users.length === 0 && (
// //                 <tr>
// //                   <td colSpan={2} className="text-center p-4 text-gray-400">No users available</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </section>

// //       {/* Recent Controls Table */}
// //       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold mb-4">Recent Controls</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border border-gray-700">
// //             <thead className="bg-gray-700 text-gray-300">
// //               <tr>
// //                 <th className="px-4 py-2">Control No.</th>
// //                 <th className="px-4 py-2">Title</th>
// //                 <th className="px-4 py-2">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {controls.slice(-5).reverse().map((c, i) => (
// //                 <tr key={i} className="hover:bg-gray-700">
// //                   <td className="px-4 py-2">{c.control_no}</td>
// //                   <td className="px-4 py-2">{c.title}</td>
// //                   <td className="px-4 py-2 capitalize">{c.status}</td>
// //                 </tr>
// //               ))}
// //               {controls.length === 0 && (
// //                 <tr>
// //                   <td colSpan={3} className="text-center p-4 text-gray-400">No controls available</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Role = "admin" | "auditor" | "department";
type User = { id: string; email: string; role: Role };
type Control = {
  sno: number;
  control_no: string;
  title: string;
  description: string;
  evidences: string[];
  status?: "approved" | "rejected" | "pending";
};

export default function AdminOverviewPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [userStats, setUserStats] = useState({ admin: 0, auditor: 0, department: 0 });
  const [controlStats, setControlStats] = useState({ pending: 0, approved: 0, rejected: 0 });

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error && data) setUsers(data as User[]);
  };

  const fetchControls = async () => {
    const { data, error } = await supabase.from("controls").select("*");
    if (!error && data) setControls(data as Control[]);
  };

  useEffect(() => {
    fetchUsers();
    fetchControls();
  }, []);

  useEffect(() => {
    const stats = { admin: 0, auditor: 0, department: 0 };
    users.forEach((u) => stats[u.role]++);
    setUserStats(stats);

    const cStats = { pending: 0, approved: 0, rejected: 0 };
    controls.forEach((c) => c.status ? cStats[c.status]++ : cStats.pending++);
    setControlStats(cStats);
  }, [users, controls]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Admin Overview</h1>
      <p className="text-gray-600 text-center">A summary of users and AUA/KUA controls</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Admins", value: userStats.admin, color: "bg-purple-600" },
          { title: "Auditors", value: userStats.auditor, color: "bg-blue-500" },
          { title: "Departments", value: userStats.department, color: "bg-green-500" },
          { title: "Total Controls", value: controls.length, color: "bg-yellow-500" },
        ].map((card, i) => (
          <div key={i} className={`rounded-2xl shadow-lg p-6 ${card.color} text-white`}>
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Control Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Pending Controls", value: controlStats.pending },
          { title: "Approved Controls", value: controlStats.approved },
          { title: "Rejected Controls", value: controlStats.rejected },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Users Table */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(-5).reverse().map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center text-gray-500 p-4">No users available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Controls Table */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Controls</h2>
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
              {controls.slice(-5).reverse().map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{c.control_no}</td>
                  <td className="px-4 py-2">{c.title}</td>
                  <td className="px-4 py-2 capitalize font-medium">{c.status || "pending"}</td>
                </tr>
              ))}
              {controls.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 p-4">No controls available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}




