"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  {
    section: "Content",
    items: [
      { href: "/admin", label: "Dashboard", icon: "grid" },
      { href: "/admin/posts", label: "All Posts", icon: "list" },
      { href: "/admin/posts/new", label: "Add Post", icon: "plus" },
    ],
  },
  {
    section: "People",
    items: [
      { href: "/admin/users", label: "All Users", icon: "users" },
      { href: "/admin/users/new", label: "Add User", icon: "userPlus" },
    ],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  ),
  list: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round" />
      <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M15.5 14.8c2.4.4 4 1.9 4.7 5.2" strokeLinecap="round" />
    </svg>
  ),
  userPlus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" strokeLinecap="round" />
      <path d="M19 8v6M16 11h6" strokeLinecap="round" />
    </svg>
  ),
};

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 border-r border-border bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-brand flex items-center justify-center">
            <span className="text-white text-xs font-semibold">K</span>
          </div>
          <span className="text-sm font-semibold text-text">Kuwait Guides</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="px-3 text-[11px] font-medium uppercase tracking-wide text-text-muted/70 mb-2">
              {section.section}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm transition ${
                      active ? "bg-brand/10 text-brand font-medium" : "text-text hover:bg-surface"
                    }`}
                  >
                    {ICONS[item.icon]}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <p className="text-xs text-text-muted mb-2 truncate">{userName}</p>
        <button
          type="button"
          onClick={() => signOut({ redirectTo: "/login" })}
          className="w-full text-left text-sm text-text-muted hover:text-red-600 transition"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}