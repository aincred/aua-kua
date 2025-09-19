// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { LogOut } from "lucide-react";

// export default function Sidebar({ role }: { role: string }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const menus: Record<string, { name: string; href: string }[]> = {
//     admin: [
//       { name: "Overview", href: "/dashboard/admin" },
//       { name: "Manage Users", href: "/dashboard/admin/users" },
//       { name: "AUA/KUA", href: "/dashboard/admin/aua-feature" },
//     ],
//     auditor: [
//       { name: "Overview", href: "/dashboard/auditor" },
//       { name: "AUA/KUA", href: "/dashboard/auditor/aua-reports" },
//     ],
//     department: [
//       { name: "Overview", href: "/dashboard/department" },
//       { name: "AUA/KUA", href: "/dashboard/department/aua" },
//       { name: "AUA/KUA Stauts", href: "/dashboard/department/stauts" },
//     ],
//   };

//   const handleLogout = () => {
//     router.push("/");
//   };

//   return (
//     <aside className="w-64 bg-gray-800 p-6 flex flex-col">
//       <h2 className="text-2xl font-bold mb-6 capitalize">{role} Panel</h2>

//       <nav className="space-y-3">
//         {menus[role]?.map((item) => (
//           <button
//             key={item.href}
//             onClick={() => router.push(item.href)}
//             className={`w-full text-left p-3 rounded-xl transition ${
//               pathname === item.href
//                 ? "bg-purple-600 text-white"
//                 : "bg-gray-700 hover:bg-gray-600"
//             }`}
//           >
//             {item.name}
//           </button>
//         ))}
//       </nav>

//       <div className="mt-auto">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 w-full p-3 bg-red-600 hover:bg-red-500 rounded-xl transition"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menus: Record<string, { name: string; href: string }[]> = {
    admin: [
      { name: "Overview", href: "/dashboard/admin" },
      { name: "Manage Users", href: "/dashboard/admin/users" },
      { name: "AUA/KUA", href: "/dashboard/admin/aua-feature" },
    ],
    auditor: [
      { name: "Overview", href: "/dashboard/auditor" },
      { name: "AUA/KUA", href: "/dashboard/auditor/aua-reports" },
    ],
    department: [
      { name: "Overview", href: "/dashboard/department" },
      { name: "AUA/KUA", href: "/dashboard/department/aua" },
      { name: "AUA/KUA Status", href: "/dashboard/department/stauts" },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    router.push("/");
  };

  return (
    <aside className="w-72 bg-white shadow-lg rounded-tr-3xl rounded-br-3xl p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600 capitalize">{role} Panel</h2>

      <nav className="flex-1 space-y-4">
        {menus[role]?.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              pathname === item.href
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-6 w-full justify-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
