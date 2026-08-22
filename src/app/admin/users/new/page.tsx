"use client";

import { useState } from "react";
import { createUser } from "../actions";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createUser({ name, email, password, role });
    } catch {
      setError("Could not create user. Check the details and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-8 py-8 max-w-md">
      <h1 className="text-2xl font-semibold text-text mb-8">Add User</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[16px] border border-border bg-white p-6">
        <div>
          <label className="block text-sm text-text-muted mb-1.5">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1.5">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "editor")} className={inputClass}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={saving} className="w-full rounded-[10px] bg-brand text-white py-2.5 font-medium hover:bg-brand-dark transition disabled:opacity-50">
          {saving ? "Creating…" : "Create User"}
        </button>
      </form>
    </div>
  );
}