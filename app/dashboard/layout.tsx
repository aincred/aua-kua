// "use client";

// import { ReactNode } from "react";
// import { usePathname } from "next/navigation";
// import Sidebar from "@/app/dashboard/_components/Sidebar";
// import Header from "@/app/dashboard/_components/Header";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   const pathname = usePathname();
//   const role = pathname.split("/")[2] || "admin";

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <Sidebar role={role} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <Header role={role} />
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/dashboard/_components/Sidebar";
import Header from "@/app/dashboard/_components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  if (!role) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Header role={role} />
        <main className="p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
