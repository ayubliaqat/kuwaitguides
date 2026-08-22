import Link from "next/link";
import { getAllUsers } from "./actions";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-text">All Users</h1>
        <Link href="/admin/users/new" className="rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition">
          + Add User
        </Link>
      </div>

      <div className="rounded-[16px] border border-border bg-white overflow-hidden">
        {users.map((user, i) => (
          <div key={user.id} className={`flex items-center justify-between px-5 py-4 ${i !== users.length - 1 ? "border-b border-border" : ""}`}>
            <div>
              <p className="text-sm font-medium text-text">{user.name}</p>
              <p className="text-xs text-text-muted">{user.email}</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand/10 text-brand capitalize">
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}