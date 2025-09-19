
// // dashboard\admin\aua-feature\page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// type Control = {
//   id?: string;
//   sno: number;
//   control_no: string;
//   title: string;
//   description: string;
//   evidences: string[];
//   status?: "approved" | "rejected" | "pending";
// };

// export default function AdminControlDashboard() {
//   const [controls, setControls] = useState<Control[]>([]);
//   const [formData, setFormData] = useState({
//     sno: "",
//     control_no: "",
//     title: "",
//     description: "",
//   });
//   const [evidences, setEvidences] = useState<string[]>([""]);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // ✅ Fetch controls
//   useEffect(() => {
//     fetchControls();
//   }, []);

//   const fetchControls = async () => {
//     const { data, error } = await supabase.from("controls").select("*").order("sno");
//     if (error) console.error(error);
//     else setControls(data || []);
//   };

//   // ✅ Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEvidenceChange = (index: number, value: string) => {
//     const newEvidences = [...evidences];
//     newEvidences[index] = value;
//     setEvidences(newEvidences);
//   };

//   const handleAddEvidenceField = () => setEvidences([...evidences, ""]);
//   const handleRemoveEvidenceField = (index: number) => {
//     const newEvidences = [...evidences];
//     newEvidences.splice(index, 1);
//     setEvidences(newEvidences);
//   };

//   // ✅ Add or Update Control
//   const handleAddOrUpdateControl = async () => {
//     if (!formData.sno || !formData.control_no || !formData.title || !formData.description) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const control: Control = {
//       sno: Number(formData.sno),
//       control_no: formData.control_no,
//       title: formData.title,
//       description: formData.description,
//       evidences: evidences.filter((e) => e.trim() !== ""),
//       status: "pending",
//     };

//     if (editingId) {
//       // Update
//       const { error } = await supabase.from("controls").update(control).eq("id", editingId);
//       if (error) console.error(error);
//     } else {
//       // Insert
//       const { error } = await supabase.from("controls").insert([control]);
//       if (error) console.error(error);
//     }

//     // Reset
//     setFormData({ sno: "", control_no: "", title: "", description: "" });
//     setEvidences([""]);
//     setEditingId(null);
//     fetchControls();
//   };

//   // ✅ Edit Control
//   const handleEdit = (id: string) => {
//     const control = controls.find((c) => c.id === id);
//     if (!control) return;
//     setFormData({
//       sno: control.sno.toString(),
//       control_no: control.control_no,
//       title: control.title,
//       description: control.description,
//     });
//     setEvidences(control.evidences.length ? control.evidences : [""]);
//     setEditingId(control.id!);
//   };

//   // ✅ Delete Control
//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this control?")) {
//       const { error } = await supabase.from("controls").delete().eq("id", id);
//       if (error) console.error(error);
//       fetchControls();
//     }
//   };

//   return (
//     <div className="p-8 space-y-8 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-center">AUA/KUA Compliance Control Panel</h1>

//       {/* Form Section */}
//       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">
//           {editingId ? "Edit Control" : "Add New Control"}
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="sno"
//             placeholder="S. No."
//             value={formData.sno}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="control_no"
//             placeholder="Control No."
//             value={formData.control_no}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Short Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <textarea
//             name="description"
//             placeholder="Control Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white col-span-2"
//           />
//         </div>

//         {/* Evidences */}
//         <div className="mt-4">
//           <label className="font-medium text-gray-300">Evidences Required:</label>
//           {evidences.map((evidence, index) => (
//             <div key={index} className="flex items-center mt-2 space-x-2">
//               <input
//                 type="text"
//                 placeholder={`Evidence ${index + 1}`}
//                 value={evidence}
//                 onChange={(e) => handleEvidenceChange(index, e.target.value)}
//                 className="p-2 bg-gray-700 rounded-md border border-gray-600 flex-grow text-white"
//               />
//               <button
//                 onClick={() => handleRemoveEvidenceField(index)}
//                 className="text-red-500 hover:text-red-700"
//                 type="button"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddEvidenceField}
//             className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             + Add Evidence
//           </button>
//         </div>

//         <button
//           onClick={handleAddOrUpdateControl}
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {editingId ? "Update Control" : "Add Control"}
//         </button>
//       </section>

//       {/* Controls Table */}
//       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Existing Controls</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-700 rounded-md">
//             <thead className="bg-gray-700 text-gray-300">
//               <tr>
//                 <th className="px-4 py-2 text-left">S. No.</th>
//                 <th className="px-4 py-2 text-left">Control No.</th>
//                 <th className="px-4 py-2 text-left">Title</th>
//                 <th className="px-4 py-2 text-left">Description</th>
//                 <th className="px-4 py-2 text-left">Evidences</th>
//                 <th className="px-4 py-2 text-left">Status</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {controls.map((control) => (
//                 <tr key={control.id} className="hover:bg-gray-700">
//                   <td className="px-4 py-2">{control.sno}</td>
//                   <td className="px-4 py-2">{control.control_no}</td>
//                   <td className="px-4 py-2">{control.title}</td>
//                   <td className="px-4 py-2">{control.description}</td>
//                   <td className="px-4 py-2">
//                     <ul className="list-disc pl-5">
//                       {control.evidences.map((evi, idx) => (
//                         <li key={idx}>{evi}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="px-4 py-2 capitalize">{control.status}</td>
//                   <td className="px-4 py-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(control.id!)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(control.id!)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {controls.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="text-center p-4 text-gray-400">
//                     No controls available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";

// type Control = {
//   sno: number;
//   controlNo: string;
//   title: string;
//   description: string;
//   evidences: string[];
//   status?: "approved" | "rejected" | "pending";
// };

// export default function AdminControlDashboard() {
//   const [controls, setControls] = useState<Control[]>([]);
//   const [formData, setFormData] = useState({
//     sno: "",
//     controlNo: "",
//     title: "",
//     description: "",
//   });
//   const [evidences, setEvidences] = useState<string[]>([""]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("controls");
//     if (saved) setControls(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("controls", JSON.stringify(controls));
//   }, [controls]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEvidenceChange = (index: number, value: string) => {
//     const newEvidences = [...evidences];
//     newEvidences[index] = value;
//     setEvidences(newEvidences);
//   };

//   const handleAddEvidenceField = () => setEvidences([...evidences, ""]);

//   const handleRemoveEvidenceField = (index: number) => {
//     const newEvidences = [...evidences];
//     newEvidences.splice(index, 1);
//     setEvidences(newEvidences);
//   };

//   const handleAddOrUpdateControl = () => {
//     if (!formData.sno || !formData.controlNo || !formData.title || !formData.description) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const control: Control = {
//       sno: Number(formData.sno),
//       controlNo: formData.controlNo,
//       title: formData.title,
//       description: formData.description,
//       evidences: evidences.filter((e) => e.trim() !== ""),
//       status: "pending",
//     };

//     if (editingIndex !== null) {
//       const updatedControls = [...controls];
//       updatedControls[editingIndex] = control;
//       setControls(updatedControls);
//       setEditingIndex(null);
//     } else {
//       setControls([...controls, control]);
//     }

//     setFormData({ sno: "", controlNo: "", title: "", description: "" });
//     setEvidences([""]);
//   };

//   const handleEdit = (index: number) => {
//     const control = controls[index];
//     setFormData({
//       sno: control.sno.toString(),
//       controlNo: control.controlNo,
//       title: control.title,
//       description: control.description,
//     });
//     setEvidences(control.evidences.length ? control.evidences : [""]);
//     setEditingIndex(index);
//   };

//   const handleDelete = (index: number) => {
//     if (confirm("Are you sure you want to delete this control?")) {
//       const newControls = [...controls];
//       newControls.splice(index, 1);
//       setControls(newControls);
//     }
//   };

//   return (
//     <div className="p-8 space-y-8 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-center">AUA/KUA Compliance Control Panel</h1>

//       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">
//           {editingIndex !== null ? "Edit Control" : "Add New Control"}
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="sno"
//             placeholder="S. No."
//             value={formData.sno}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="controlNo"
//             placeholder="Control No."
//             value={formData.controlNo}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Short Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white"
//           />
//           <textarea
//             name="description"
//             placeholder="Control Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="p-3 bg-gray-700 rounded-md shadow-sm border border-gray-600 text-white col-span-2"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="font-medium text-gray-300">Evidences Required:</label>
//           {evidences.map((evidence, index) => (
//             <div key={index} className="flex items-center mt-2 space-x-2">
//               <input
//                 type="text"
//                 placeholder={`Evidence ${index + 1}`}
//                 value={evidence}
//                 onChange={(e) => handleEvidenceChange(index, e.target.value)}
//                 className="p-2 bg-gray-700 rounded-md border border-gray-600 flex-grow text-white"
//               />
//               <button
//                 onClick={() => handleRemoveEvidenceField(index)}
//                 className="text-red-500 hover:text-red-700"
//                 type="button"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddEvidenceField}
//             className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             + Add Evidence
//           </button>
//         </div>

//         <button
//           onClick={handleAddOrUpdateControl}
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {editingIndex !== null ? "Update Control" : "Add Control"}
//         </button>
//       </section>

//       <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Existing Controls</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-700 rounded-md">
//             <thead className="bg-gray-700 text-gray-300">
//               <tr>
//                 <th className="px-4 py-2 text-left">S. No.</th>
//                 <th className="px-4 py-2 text-left">Control No.</th>
//                 <th className="px-4 py-2 text-left">Title</th>
//                 <th className="px-4 py-2 text-left">Description</th>
//                 <th className="px-4 py-2 text-left">Evidences</th>
//                 <th className="px-4 py-2 text-left">Status</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {controls.map((control, index) => (
//                 <tr key={index} className="hover:bg-gray-700">
//                   <td className="px-4 py-2">{control.sno}</td>
//                   <td className="px-4 py-2">{control.controlNo}</td>
//                   <td className="px-4 py-2">{control.title}</td>
//                   <td className="px-4 py-2">{control.description}</td>
//                   <td className="px-4 py-2">
//                     <ul className="list-disc pl-5">
//                       {control.evidences.map((evi, idx) => (
//                         <li key={idx}>{evi}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="px-4 py-2 capitalize">{control.status}</td>
//                   <td className="px-4 py-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(index)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {controls.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="text-center p-4 text-gray-400">
//                     No controls available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// type Control = {
//   id?: string;
//   sno: number;
//   control_no: string;
//   title: string;
//   description: string;
//   evidences: string[];
//   status?: "approved" | "rejected" | "pending";
// };

// export default function AdminControlDashboard() {
//   const [controls, setControls] = useState<Control[]>([]);
//   const [formData, setFormData] = useState({
//     sno: "",
//     control_no: "",
//     title: "",
//     description: "",
//   });
//   const [evidences, setEvidences] = useState<string[]>([""]);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Fetch controls
//   useEffect(() => {
//     fetchControls();
//   }, []);

//   const fetchControls = async () => {
//     const { data, error } = await supabase.from("controls").select("*").order("sno");
//     if (error) console.error(error);
//     else setControls(data || []);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEvidenceChange = (index: number, value: string) => {
//     const newEvidences = [...evidences];
//     newEvidences[index] = value;
//     setEvidences(newEvidences);
//   };

//   const handleAddEvidenceField = () => setEvidences([...evidences, ""]);
//   const handleRemoveEvidenceField = (index: number) => {
//     const newEvidences = [...evidences];
//     newEvidences.splice(index, 1);
//     setEvidences(newEvidences);
//   };

//   const handleAddOrUpdateControl = async () => {
//     if (!formData.sno || !formData.control_no || !formData.title || !formData.description) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const control: Control = {
//       sno: Number(formData.sno),
//       control_no: formData.control_no,
//       title: formData.title,
//       description: formData.description,
//       evidences: evidences.filter((e) => e.trim() !== ""),
//       status: "pending",
//     };

//     if (editingId) {
//       const { error } = await supabase.from("controls").update(control).eq("id", editingId);
//       if (error) console.error(error);
//     } else {
//       const { error } = await supabase.from("controls").insert([control]);
//       if (error) console.error(error);
//     }

//     setFormData({ sno: "", control_no: "", title: "", description: "" });
//     setEvidences([""]);
//     setEditingId(null);
//     fetchControls();
//   };

//   const handleEdit = (id: string) => {
//     const control = controls.find((c) => c.id === id);
//     if (!control) return;
//     setFormData({
//       sno: control.sno.toString(),
//       control_no: control.control_no,
//       title: control.title,
//       description: control.description,
//     });
//     setEvidences(control.evidences.length ? control.evidences : [""]);
//     setEditingId(control.id!);
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this control?")) {
//       const { error } = await supabase.from("controls").delete().eq("id", id);
//       if (error) console.error(error);
//       fetchControls();
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 space-y-8 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl md:text-3xl font-bold text-center">AUA/KUA Compliance Control Panel</h1>

//       {/* Form Section */}
//       <section className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4">
//           {editingId ? "Edit Control" : "Add New Control"}
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="sno"
//             placeholder="S. No."
//             value={formData.sno}
//             onChange={handleChange}
//             className="p-2 md:p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="control_no"
//             placeholder="Control No."
//             value={formData.control_no}
//             onChange={handleChange}
//             className="p-2 md:p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Short Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="p-2 md:p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
//           />
//           <textarea
//             name="description"
//             placeholder="Control Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="p-2 md:p-3 bg-gray-700 rounded-md border border-gray-600 text-white col-span-1 md:col-span-2"
//           />
//         </div>

//         {/* Evidences */}
//         <div className="mt-4">
//           <label className="font-medium text-gray-300">Evidences Required:</label>
//           {evidences.map((evidence, index) => (
//             <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
//               <input
//                 type="text"
//                 placeholder={`Evidence ${index + 1}`}
//                 value={evidence}
//                 onChange={(e) => handleEvidenceChange(index, e.target.value)}
//                 className="p-2 flex-1 bg-gray-700 rounded-md border border-gray-600 text-white"
//               />
//               <button
//                 onClick={() => handleRemoveEvidenceField(index)}
//                 className="text-red-500 hover:text-red-700"
//                 type="button"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddEvidenceField}
//             className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             + Add Evidence
//           </button>
//         </div>

//         <button
//           onClick={handleAddOrUpdateControl}
//           className="mt-4 w-full md:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {editingId ? "Update Control" : "Add Control"}
//         </button>
//       </section>

//       {/* Controls Table */}
//       <section className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg overflow-x-auto">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4">Existing Controls</h2>
//         <table className="min-w-full border border-gray-700 rounded-md">
//           <thead className="bg-gray-700 text-gray-300">
//             <tr>
//               <th className="px-2 md:px-4 py-2 text-left">S. No.</th>
//               <th className="px-2 md:px-4 py-2 text-left">Control No.</th>
//               <th className="px-2 md:px-4 py-2 text-left">Title</th>
//               <th className="px-2 md:px-4 py-2 text-left">Description</th>
//               <th className="px-2 md:px-4 py-2 text-left">Evidences</th>
//               <th className="px-2 md:px-4 py-2 text-left">Status</th>
//               <th className="px-2 md:px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {controls.map((control) => (
//               <tr key={control.id} className="hover:bg-gray-700">
//                 <td className="px-2 md:px-4 py-2">{control.sno}</td>
//                 <td className="px-2 md:px-4 py-2">{control.control_no}</td>
//                 <td className="px-2 md:px-4 py-2">{control.title}</td>
//                 <td className="px-2 md:px-4 py-2">{control.description}</td>
//                 <td className="px-2 md:px-4 py-2">
//                   <ul className="list-disc pl-5">
//                     {control.evidences.map((evi, idx) => (
//                       <li key={idx}>{evi}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="px-2 md:px-4 py-2 capitalize">{control.status}</td>
//                 <td className="px-2 md:px-4 py-2 space-x-2 flex flex-col sm:flex-row">
//                   <button
//                     onClick={() => handleEdit(control.id!)}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mb-1 sm:mb-0"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(control.id!)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {controls.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center p-4 text-gray-400">
//                   No controls available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// ---------------- Types ----------------
type ControlStatus = "approved" | "rejected" | "pending";

export type Control = {
  id: string;
  sno: number;
  control_no: string;
  title: string;
  description: string;
  evidences: string[];
  status: ControlStatus;
};

type ControlInsert = Omit<Control, "id">; // for insert/update

// ---------------- Component ----------------
export default function AuditorAUAReports() {
  const [controls, setControls] = useState<Control[]>([]);
  const [formData, setFormData] = useState<{
    sno: string;
    control_no: string;
    title: string;
    description: string;
  }>({
    sno: "",
    control_no: "",
    title: "",
    description: "",
  });
  const [evidences, setEvidences] = useState<string[]>([""]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    const { data, error } = await supabase
      .from("controls")
      .select("*")
      .order("sno") as { data: Control[] | null; error: Error | null };

    if (error) {
      console.error(error);
    } else {
      setControls(data ?? []);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEvidenceChange = (index: number, value: string) => {
    const newEvidences = [...evidences];
    newEvidences[index] = value;
    setEvidences(newEvidences);
  };

  const handleAddEvidenceField = () => setEvidences([...evidences, ""]);

  const handleRemoveEvidenceField = (index: number) =>
    setEvidences(evidences.filter((_, i) => i !== index));

  const handleAddOrUpdateControl = async () => {
    if (
      !formData.sno ||
      !formData.control_no ||
      !formData.title ||
      !formData.description
    ) {
      return alert("Please fill all required fields");
    }

    const control: ControlInsert = {
      sno: Number(formData.sno),
      control_no: formData.control_no,
      title: formData.title,
      description: formData.description,
      evidences: evidences.filter((e) => e.trim() !== ""),
      status: "pending",
    };

    if (editingId) {
      const { error } = await supabase
        .from("controls")
        .update(control)
        .eq("id", editingId);

      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("controls").insert([control]);
      if (error) console.error(error);
    }

    // Reset form
    setFormData({ sno: "", control_no: "", title: "", description: "" });
    setEvidences([""]);
    setEditingId(null);

    fetchControls();
  };

  const handleEdit = (id: string) => {
    const control = controls.find((c) => c.id === id);
    if (!control) return;

    setFormData({
      sno: control.sno.toString(),
      control_no: control.control_no,
      title: control.title,
      description: control.description,
    });

    setEvidences(control.evidences.length ? control.evidences : [""]);
    setEditingId(control.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this control?")) return;

    const { error } = await supabase.from("controls").delete().eq("id", id);
    if (error) console.error(error);

    fetchControls();
  };

  const statusVariant = (status?: ControlStatus) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-500">
        AUA/KUA Compliance Control Panel
      </h1>

      {/* Form Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Control" : "Add New Control"}</CardTitle>
          <CardDescription>Fill in the control details below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              name="sno"
              placeholder="S. No."
              value={formData.sno}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="control_no"
              placeholder="Control No."
              value={formData.control_no}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Evidences Required:</label>
            {evidences.map((e, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={e}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleEvidenceChange(idx, ev.target.value)
                  }
                  placeholder={`Evidence ${idx + 1}`}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveEvidenceField(idx)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddEvidenceField}>
              + Add Evidence
            </Button>
          </div>

          <Button className="w-full md:w-auto" onClick={handleAddOrUpdateControl}>
            {editingId ? "Update Control" : "Add Control"}
          </Button>
        </CardContent>
      </Card>

      {/* Controls Table */}
      <Card className="max-w-6xl mx-auto overflow-x-auto">
        <CardHeader>
          <CardTitle>Existing Controls</CardTitle>
          <CardDescription>Manage all compliance controls</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S. No.</TableHead>
                <TableHead>Control No.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Evidences</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No controls available
                  </TableCell>
                </TableRow>
              ) : (
                controls.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.sno}</TableCell>
                    <TableCell>{c.control_no}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5">
                        {c.evidences.map((evidence, i) => (
                          <li key={i}>{evidence}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(c.status)}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(c.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
