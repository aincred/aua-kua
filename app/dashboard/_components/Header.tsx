// "use client";

// export default function Header({ role }: { role: string }) {
//   return (
//     <header className="h-16 bg-gray-800 flex items-center justify-between px-6 border-b border-gray-700">
//       <h1 className="text-xl font-semibold">Dashboard</h1>
//       <span className="capitalize">{role}</span>
//     </header>
//   );
// }
"use client";

interface HeaderProps {
  role: string;
}

export default function Header({ role }: HeaderProps) {
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-8 rounded-t-2xl">
      <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
      <span className="text-gray-600 capitalize font-medium">{role}</span>
    </header>
  );
}
