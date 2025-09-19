"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Role = "admin" | "auditor" | "department";

type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("auditor");

  useEffect(() => {
    const saved = localStorage.getItem("allUsers");
    if (saved) setUsers(JSON.parse(saved));
    else {
      const defaultAdmin: User = { id: Date.now(), email: "admin@example.com", password: "admin123", role: "admin" };
      setUsers([defaultAdmin]);
      localStorage.setItem("allUsers", JSON.stringify([defaultAdmin]));
      alert("Default admin created: admin@example.com / admin123");
    }
  }, []);

  useEffect(() => localStorage.setItem("allUsers", JSON.stringify(users)), [users]);

  const addUser = () => {
    if (!email || !password) return alert("Email & Password required!");
    if (users.some(u => u.email.trim() === email.trim())) return alert("Email already exists!");

    const newUser: User = { id: Date.now(), email: email.trim(), password: password.trim(), role };
    setUsers([...users, newUser]);
    setEmail("");
    setPassword("");
    alert("User added successfully!");
  };

  const deleteUser = (id: number) => {
    if (!confirm("Delete this user?")) return;
    setUsers(users.filter(u => u.id !== id));
  };

  const roleVariant = (role: Role) => {
    switch (role) {
      case "admin": return "default";
      case "auditor": return "secondary";
      case "department": return "destructive";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 space-y-8">
      {/* Form Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>New User</CardTitle>
          <CardDescription>Add a user to the system</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Select onValueChange={val => setRole(val as Role)} value={role}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addUser} className="w-full">Add User</Button>
        </CardContent>
      </Card>

      {/* Users Table Card */}
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No users added yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><Badge variant={roleVariant(u.role)}>{u.role}</Badge></TableCell>
                    <TableCell>{u.password}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" onClick={() => deleteUser(u.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
