
// // "use client";

// // import Image from "next/image";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // type Role = "admin" | "auditor" | "department";

// // type Credentials = Record<Role, { email: string; password: string }>;
// // type Access = Record<"auditor" | "department", boolean>;

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState<Role>("admin");
// //   const router = useRouter();

// //   const defaultCredentials: Credentials = {
// //     admin: { email: "admin@example.com", password: "admin123" },
// //     auditor: { email: "auditor@example.com", password: "auditor123" },
// //     department: { email: "department@example.com", password: "dept123" },
// //   };

// //   const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);

// //   useEffect(() => {
// //     const savedUsers = localStorage.getItem("users");
// //     if (savedUsers) {
// //       try {
// //         const parsed = JSON.parse(savedUsers);
// //         if (
// //           parsed.admin?.email &&
// //           parsed.auditor?.email &&
// //           parsed.department?.email
// //         ) {
// //           setCredentials(parsed);
// //         } else {
// //           localStorage.setItem("users", JSON.stringify(defaultCredentials));
// //           setCredentials(defaultCredentials);
// //         }
// //     } catch {
// //         localStorage.setItem("users", JSON.stringify(defaultCredentials));
// //         setCredentials(defaultCredentials);
// //       }
// //     } else {
// //       localStorage.setItem("users", JSON.stringify(defaultCredentials));
// //     }
// //   }, []);

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const user = credentials[role];
// //     const savedAccess: Access = JSON.parse(localStorage.getItem("userAccess") || "{}");

// //     if (user && email === user.email && password === user.password) {
// //       try {
// //         const response = await fetch('/api/auth/login', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ email, password, role })
// //         });

// //         if (response.ok) {
// //           const { token } = await response.json();
// //           localStorage.setItem('authToken', token);
// //           localStorage.setItem('userRole', role);
// //           router.push(`/dashboard/${role}`);
// //         } else {
// //           alert('Authentication failed');
// //         }
// //       } catch (error) {
// //         console.error('Login error:', error);
// //         alert('An error occurred during login');
// //       }
// //     } else {
// //       alert("Invalid credentials for selected role");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
// //       <div className="relative bg-gradient-to-tr from-gray-900/70 to-gray-800/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
// //         <div className="flex justify-center mb-6">
// //           <Image
// //             src="/DW_dark.webp"
// //             alt="Logo"
// //             width={120}
// //             height={120}
// //             className="rounded-full shadow-2xl"
// //           />
// //         </div>

// //         <h2 className="text-4xl text-white font-extrabold text-center mb-6 tracking-wide">
// //           Login
// //         </h2>

// //         <form onSubmit={handleLogin} className="space-y-6">
// //           <div>
// //             <label className="block text-gray-300 mb-2 font-medium">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Enter your email"
// //               className="w-full p-3 rounded-2xl bg-gray-800 text-white"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-300 mb-2 font-medium">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Enter your password"
// //               className="w-full p-3 rounded-2xl bg-gray-800 text-white"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-300 mb-2 font-medium">Select Role</label>
// //             <select
// //               value={role}
// //               onChange={(e) => setRole(e.target.value as Role)}
// //               className="w-full p-3 rounded-2xl bg-gray-800 text-white"
// //             >
// //               <option value="admin">Admin</option>
// //               <option value="auditor">Auditor</option>
// //               <option value="department">Department</option>
// //             </select>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-gradient-to-r from-purple-500 to-red-500 text-white p-3 rounded-2xl font-semibold shadow-lg"
// //           >
// //             Login
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
// // import { Icons } from "@/components/ui/icons";

// // export default function LoginPage() {
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [errors, setErrors] = useState<Record<string, string>>({});

// //   function validate() {
// //     const e: Record<string, string> = {};
// //     if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
// //       e.email = "Please enter a valid email.";
// //     if (!form.password) e.password = "Please enter your password.";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   }

// //   async function handleSubmit(e: React.FormEvent) {
// //     e.preventDefault();
// //     if (!validate()) return;
// //     setLoading(true);
// //     await new Promise((r) => setTimeout(r, 800));
// //     console.log("Logging in with", form);
// //     setLoading(false);
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-6">
// //       <motion.div
// //         initial={{ opacity: 0, y: 15 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.4 }}
// //         className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
// //       >
// //         {/* Left Info Panel */}
// //         <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white p-8 lg:p-10">
// //           <div className="mb-6">
// //             <Icons.Logo className="w-12 h-12 mb-4" />
// //             <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h2>
// //             <p className="text-white/90 text-sm md:text-lg">Login to access your account and continue your journey.</p>
// //           </div>
// //           <ul className="space-y-2 text-sm md:text-base">
// //             <li className="flex items-center gap-2">
// //               <span className="w-2 h-2 bg-white rounded-full" />
// //               Fast access
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="w-2 h-2 bg-white rounded-full" />
// //               Secure authentication
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="w-2 h-2 bg-white rounded-full" />
// //               24/7 support
// //             </li>
// //           </ul>
// //         </div>

// //         {/* Right Login Form */}
// //         <Card className="bg-white rounded-none md:rounded-r-3xl">
// //           <CardContent className="p-6 sm:p-8 md:p-10">
// //             <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Login</CardTitle>
// //             <CardDescription className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-base">
// //               Enter your credentials to access your account.
// //             </CardDescription>

// //             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
// //               <div>
// //                 <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">Email</Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   value={form.email}
// //                   onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
// //                   placeholder="you@example.com"
// //                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
// //                 />
// //                 {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="password" className="text-gray-700 text-sm sm:text-base">Password</Label>
// //                 <Input
// //                   id="password"
// //                   type="password"
// //                   value={form.password}
// //                   onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
// //                   placeholder="Enter your password"
// //                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
// //                 />
// //                 {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
// //               </div>

// //               <Button
// //                 type="submit"
// //                 className="w-full py-2 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition-colors"
// //                 disabled={loading}
// //               >
// //                 {loading ? "Logging in..." : "Login"}
// //               </Button>

// //               <Separator className="my-3 sm:my-4" />
// //               <p className="text-center text-sm sm:text-base text-gray-500">
// //                 Don't have an account?{" "}
// //                 <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a>
// //               </p>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </motion.div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Icons } from "@/components/ui/icons";

// type Role = "admin" | "auditor" | "department";
// type Credentials = Record<Role, { email: string; password: string }>;

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState<Role>("admin");
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [credentials, setCredentials] = useState<Credentials>({
//     admin: { email: "admin@example.com", password: "admin123" },
//     auditor: { email: "auditor@example.com", password: "auditor123" },
//     department: { email: "department@example.com", password: "dept123" },
//   });

//   useEffect(() => {
//     const savedUsers = localStorage.getItem("users");
//     if (savedUsers) {
//       try {
//         const parsed = JSON.parse(savedUsers);
//         if (parsed.admin?.email && parsed.auditor?.email && parsed.department?.email) {
//           setCredentials(parsed);
//         } else {
//           localStorage.setItem("users", JSON.stringify(credentials));
//         }
//       } catch {
//         localStorage.setItem("users", JSON.stringify(credentials));
//       }
//     } else {
//       localStorage.setItem("users", JSON.stringify(credentials));
//     }
//   }, []);

//   function validate() {
//     const e: Record<string, string> = {};
//     if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
//       e.email = "Please enter a valid email.";
//     }
//     if (!form.password) {
//       e.password = "Please enter your password.";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!validate()) return;

//     const user = credentials[role];

//     if (user && form.email === user.email && form.password === user.password) {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: form.email, password: form.password, role }),
//         });

//         if (response.ok) {
//           const { token } = await response.json();
//           localStorage.setItem("authToken", token);
//           localStorage.setItem("userRole", role);
//           router.push(`/dashboard/${role}`);
//         } else {
//           alert("Authentication failed");
//         }
//       } catch (err) {
//         console.error("Login error:", err);
//         alert("An error occurred during login");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert("Invalid credentials for selected role");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
//       >
//         {/* Left Info Panel */}
//         <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white p-8 lg:p-10">
//           <div className="mb-6">
//             <Icons.Logo className="w-12 h-12 mb-4" />
//             <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h2>
//             <p className="text-white/90 text-sm md:text-lg">
//               Login to access your account and continue your journey.
//             </p>
//           </div>
//           <ul className="space-y-2 text-sm md:text-base">
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" /> Fast access
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" /> Secure authentication
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-white rounded-full" /> 24/7 support
//             </li>
//           </ul>
//         </div>

//         {/* Right Login Form */}
//         <Card className="bg-white rounded-none md:rounded-r-3xl">
//           <CardContent className="p-6 sm:p-8 md:p-10">
//             <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Login</CardTitle>
//             <CardDescription className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-base">
//               Enter your credentials to access your account.
//             </CardDescription>

//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
//               <div>
//                 <Label htmlFor="role" className="text-gray-700 text-sm sm:text-base">Role</Label>
//                 <select
//                   id="role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value as Role)}
//                   className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500 p-2 rounded"
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="auditor">Auditor</option>
//                   <option value="department">Department</option>
//                 </select>
//               </div>

//               <div>
//                 <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">Email</Label>
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
//                 <Label htmlFor="password" className="text-gray-700 text-sm sm:text-base">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
//                   placeholder="Enter your password"
//                   className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
//                 />
//                 {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full py-2 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition-colors"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>

//               <Separator className="my-3 sm:my-4" />
//               <p className="text-center text-sm sm:text-base text-gray-500">
//                 Don't have an account?{" "}
//                 <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a>
//               </p>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";

type Role = "admin" | "auditor" | "department";
type Credentials = Record<Role, { email: string; password: string }>;

const defaultCredentials: Credentials = {
  admin: { email: "admin@example.com", password: "admin123" },
  auditor: { email: "auditor@example.com", password: "auditor123" },
  department: { email: "department@example.com", password: "dept123" },
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        if (
          parsed.admin?.email &&
          parsed.auditor?.email &&
          parsed.department?.email
        ) {
          setCredentials(parsed);
        } else {
          localStorage.setItem("users", JSON.stringify(defaultCredentials));
        }
      } catch {
        localStorage.setItem("users", JSON.stringify(defaultCredentials));
      }
    } else {
      localStorage.setItem("users", JSON.stringify(defaultCredentials));
    }
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!form.password) {
      e.password = "Please enter your password.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const user = credentials[role];

    if (user && form.email === user.email && form.password === user.password) {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role,
          }),
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem("authToken", token);
          localStorage.setItem("userRole", role);
          router.push(`/dashboard/${role}`);
        } else {
          alert("Authentication failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid credentials for selected role");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-3xl overflow-hidden"
      >
        {/* Left Info Panel */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white p-8 lg:p-10">
          <div className="mb-6">
            <Icons.Logo className="w-12 h-12 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-white/90 text-sm md:text-lg">
              Login to access your account and continue your journey.
            </p>
          </div>
          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" /> Fast access
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" /> Secure
              authentication
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" /> 24/7 support
            </li>
          </ul>
        </div>

        {/* Right Login Form */}
        <Card className="bg-white rounded-none md:rounded-r-3xl">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
              Login
            </CardTitle>
            <CardDescription className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-base">
              Enter your credentials to access your account.
            </CardDescription>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 mt-4 sm:mt-6"
            >
              <div>
                <Label
                  htmlFor="role"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Role
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500 p-2 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="auditor">Auditor</option>
                  <option value="department">Department</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, password: e.target.value }))
                  }
                  placeholder="Enter your password"
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Separator className="my-3 sm:my-4" />
              <p className="text-center text-sm sm:text-base text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-indigo-500 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
