import { auth } from "@/auth";
import AdminSidebar from "./AdminSidebar";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex">
      <AdminSidebar userName={session?.user?.name || ""} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}