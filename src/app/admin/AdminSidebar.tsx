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
    section: "Taxonomy",
    items: [
      { href: "/admin/categories", label: "All Categories", icon: "tag" },
      { href: "/admin/categories/new", label: "Add Category", icon: "tagPlus" },
    ],
  },
  {
    section: "People",
    items: [
      { href: "/admin/users", label: "All Users", icon: "users" },
      { href: "/admin/users/new", label: "Add User", icon: "userPlus" },
    ],
  },
  {
    section: "Inbox",
    items: [
      { href: "/admin/messages", label: "Messages", icon: "mail" },
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
  tag: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M20.5 12.5L12.5 20.5a2 2 0 01-2.83 0l-7.17-7.17a2 2 0 010-2.83L10.5 2.5H19a1.5 1.5 0 011.5 1.5v8.5z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  ),
  tagPlus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M20.5 12.5L12.5 20.5a2 2 0 01-2.83 0l-7.17-7.17a2 2 0 010-2.83L10.5 2.5H19a1.5 1.5 0 011.5 1.5v8.5z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
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
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 bg-brand/[0.06] h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-brand flex items-center justify-center">
            <span className="text-white text-xs font-semibold">K</span>
          </div>
          <span className="text-sm font-semibold text-text">Kuwait Guides</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-3 space-y-6 overflow-y-auto">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-brand mb-2.5">
              {section.section}
            </p>
            <div className="space-y-2.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-sm transition-all duration-200 ${
                      active
                        ? "bg-brand text-white font-semibold shadow-[0_4px_12px_rgba(0,113,227,0.35)]"
                        : "bg-white text-text shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    <span className={active ? "text-white" : "text-brand"}>
                      {ICONS[item.icon]}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

           <div className="px-4 py-4">
        <div className="bg-white rounded-[16px] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 px-1 pb-2.5 mb-1 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <span className="text-brand text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-text font-medium truncate">{userName}</p>
          </div>

          <button
            type="button"
            onClick={() => signOut({ redirectTo: "/login" })}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm text-text-muted hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}