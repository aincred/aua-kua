// // "use client";

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
// // import { Icons } from "@/components/ui/icons";

// // export default function SignupPage() {
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
// //   const [errors, setErrors] = useState<Record<string, string>>({});

// //   function validate() {
// //     const e: Record<string, string> = {};
// //     if (!form.name || form.name.trim().length < 2) e.name = "Please enter your name.";
// //     if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
// //       e.email = "Please enter a valid email.";
// //     if (!form.password || form.password.length < 8)
// //       e.password = "Password must be at least 8 characters.";
// //     if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   }

// //   async function handleSubmit(e: React.FormEvent) {
// //     e.preventDefault();
// //     if (!validate()) return;
// //     setLoading(true);
// //     await new Promise((r) => setTimeout(r, 800));
// //     console.log("Signing up with", form);
// //     setLoading(false);
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
// //       >
// //         {/* Left */}
// //         <aside className="hidden md:flex flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 shadow-xl ring-1 ring-white/6 backdrop-blur">
// //           <div className="flex items-center gap-3 mb-6">
// //             <div className="p-3 rounded-lg bg-white/6">
// //               <Icons.Logo className="w-8 h-8" />
// //             </div>
// //             <div>
// //               <h3 className="text-white text-xl font-semibold">Ember</h3>
// //               <p className="text-sm text-slate-300">A gentle place for fierce creations.</p>
// //             </div>
// //           </div>
// //           <h2 className="text-3xl font-extrabold text-white mb-4">Join us today</h2>
// //           <p className="text-slate-300">Create an account and start your journey.</p>
// //         </aside>

// //         {/* Right */}
// //         <Card className="rounded-3xl shadow-2xl">
// //           <CardContent className="p-8 md:p-10">
// //             <CardTitle className="text-2xl">Create your account</CardTitle>
// //             <CardDescription className="mt-1 text-slate-400">
// //               It only takes a minute to join us.
// //             </CardDescription>

// //             <form onSubmit={handleSubmit} className="space-y-4 mt-6">
// //               <div>
// //                 <Label htmlFor="name" className="text-slate-200">Name</Label>
// //                 <Input
// //                   id="name"
// //                   value={form.name}
// //                   onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
// //                 />
// //                 {errors.name && <p className="text-xs text-rose-400">{errors.name}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="email" className="text-slate-200">Email</Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   value={form.email}
// //                   onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
// //                 />
// //                 {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="password" className="text-slate-200">Password</Label>
// //                 <Input
// //                   id="password"
// //                   type="password"
// //                   value={form.password}
// //                   onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
// //                 />
// //                 {errors.password && <p className="text-xs text-rose-400">{errors.password}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="confirm" className="text-slate-200">Confirm Password</Label>
// //                 <Input
// //                   id="confirm"
// //                   type="password"
// //                   value={form.confirm}
// //                   onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
// //                 />
// //                 {errors.confirm && <p className="text-xs text-rose-400">{errors.confirm}</p>}
// //               </div>

// //               <Button type="submit" className="w-full" disabled={loading}>
// //                 {loading ? "Creating..." : "Create account"}
// //               </Button>

// //               <Separator className="my-4" />
// //               <p className="text-center text-sm text-slate-400">
// //                 Already have an account? <a href="/login" className="text-white underline">Sign in</a>
// //               </p>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </motion.div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Icons } from "@/components/ui/icons";

// export default function SignupPage() {
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   function validate() {
//     const e: Record<string, string> = {};
//     if (!form.name || form.name.trim().length < 2) e.name = "Please enter your name.";
//     if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
//       e.email = "Please enter a valid email.";
//     if (!form.password || form.password.length < 8)
//       e.password = "Password must be at least 8 characters.";
//     if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 800));
//     console.log("Signing up with", form);
//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
//       >
//         {/* Left Info Panel */}
//         <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white p-10">
//           <div className="mb-6">
//             <Icons.Logo className="w-12 h-12 mb-4" />
//             <h2 className="text-3xl font-bold mb-2">Welcome to Ember</h2>
//             <p className="text-white/90 text-lg">A clean, modern platform to start your journey.</p>
//           </div>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Intuitive design
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Secure authentication
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Fast and responsive
//             </li>
//           </ul>
//         </div>

//         {/* Right Signup Form */}
//         <Card className="bg-white rounded-none md:rounded-r-3xl">
//           <CardContent className="p-10">
//             <CardTitle className="text-3xl font-bold text-gray-800">Sign Up</CardTitle>
//             <CardDescription className="mt-2 text-gray-500">
//               Create your account and get started instantly.
//             </CardDescription>

//             <form onSubmit={handleSubmit} className="space-y-5 mt-6">
//               <div>
//                 <Label htmlFor="name" className="text-gray-700">Full Name</Label>
//                 <Input
//                   id="name"
//                   value={form.name}
//                   onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
//                   placeholder="John Doe"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="email" className="text-gray-700">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
//                   placeholder="you@example.com"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="password" className="text-gray-700">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
//                   placeholder="Minimum 8 characters"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="confirm" className="text-gray-700">Confirm Password</Label>
//                 <Input
//                   id="confirm"
//                   type="password"
//                   value={form.confirm}
//                   onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
//                   placeholder="Repeat password"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md"
//                 disabled={loading}
//               >
//                 {loading ? "Creating..." : "Sign Up"}
//               </Button>

//               <Separator className="my-4" />
//               <p className="text-center text-sm text-gray-500">
//                 Already have an account?{" "}
//                 <a href="/login" className="text-indigo-500 hover:underline">Sign in</a>
//               </p>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// export default function SignupPage() {
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   function validate() {
//     const e: Record<string, string> = {};
//     if (!form.name || form.name.trim().length < 2) e.name = "Please enter your name.";
//     if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
//       e.email = "Please enter a valid email.";
//     if (!form.password || form.password.length < 8)
//       e.password = "Password must be at least 8 characters.";
//     if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 800));
//     console.log("Signing up with", form);
//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
//       >
//         {/* Left Info Panel */}
//         <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white p-10">
//           <div className="mb-6">
//             <Image
//               src="/DW_light.webp"
//               alt="DW Logo"
//               width={500}
//               height={500}
//               className="mb-4"
//             />
//             <h2 className="text-3xl font-bold mb-2">Welcome to Ember</h2>
//             <p className="text-white/90 text-lg">A clean, modern platform to start your journey.</p>
//           </div>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Intuitive design
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Secure authentication
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" />
//               Fast and responsive
//             </li>
//           </ul>
//         </div>

//         {/* Right Signup Form */}
//         <Card className="bg-white rounded-none md:rounded-r-3xl">
//           <CardContent className="p-10">
//             <CardTitle className="text-3xl font-bold text-gray-800">Sign Up</CardTitle>
//             <CardDescription className="mt-2 text-gray-500">
//               Create your account and get started instantly.
//             </CardDescription>

//             <form onSubmit={handleSubmit} className="space-y-5 mt-6">
//               <div>
//                 <Label htmlFor="name" className="text-gray-700">Full Name</Label>
//                 <Input
//                   id="name"
//                   value={form.name}
//                   onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
//                   placeholder="John Doe"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="email" className="text-gray-700">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
//                   placeholder="you@example.com"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="password" className="text-gray-700">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
//                   placeholder="Minimum 8 characters"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="confirm" className="text-gray-700">Confirm Password</Label>
//                 <Input
//                   id="confirm"
//                   type="password"
//                   value={form.confirm}
//                   onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
//                   placeholder="Repeat password"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md"
//                 disabled={loading}
//               >
//                 {loading ? "Creating..." : "Sign Up"}
//               </Button>

//               <Separator className="my-4" />
//               <p className="text-center text-sm text-gray-500">
//                 Already have an account?{" "}
//                 <a href="/login" className="text-indigo-500 hover:underline">Sign in</a>
//               </p>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function DepartmentSignupPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ departmentName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.departmentName || form.departmentName.trim().length < 2)
      e.departmentName = "Please enter department name.";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.password || form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm)
      e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("Department account created:", form);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
      >
        {/* Left AUA/KUA Info Card */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white p-10">
          <div className="mb-6">
            <Image
              src="/DW_light.webp"
              alt="AUA/KUA Logo"
              width={300}
              height={300}
              className="mb-6"
            />
            <h2 className="text-3xl font-bold mb-2">AUA/KUA Compliance System</h2>
            <p className="text-white/90 text-lg">
              Manage compliance, track evidences, and collaborate securely.
            </p>
          </div>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full" />
              Easy department account setup
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full" />
              Submit compliance reports
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full" />
              Collaborate with auditors
            </li>
          </ul>
        </div>

        {/* Right Department Signup Form */}
        <Card className="bg-white rounded-none md:rounded-r-3xl">
          <CardContent className="p-10">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Create Department Account
            </CardTitle>
            <CardDescription className="mt-2 text-gray-500">
              Register your department to submit compliance reports.
            </CardDescription>

            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              <div>
                <Label htmlFor="departmentName" className="text-gray-700">Department Name</Label>
                <Input
                  id="departmentName"
                  value={form.departmentName}
                  onChange={(e) => setForm((s) => ({ ...s, departmentName: e.target.value }))}
                  placeholder="Department of IT"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500"
                />
                {errors.departmentName && <p className="text-xs text-red-500">{errors.departmentName}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="department@example.com"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                  placeholder="Minimum 8 characters"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500"
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirm" className="text-gray-700">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
                  placeholder="Repeat password"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500"
                />
                {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
