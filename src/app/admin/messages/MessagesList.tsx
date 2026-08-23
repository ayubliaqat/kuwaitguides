"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markAsRead, deleteMessage } from "./actions";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

export default function MessagesList({
  messages,
}: {
  messages: Message[];
}) {
  const router = useRouter();

  const [viewTarget, setViewTarget] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleView(msg: Message) {
    setViewTarget(msg);

    if (!msg.read) {
      await markAsRead(msg.id);
      router.refresh();
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteMessage(deleteTarget.id);
      setDeleteTarget(null);
      setViewTarget(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setDeleting(false);
    }
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-border py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path
              d="M3 7l9 6 9-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-text font-medium mb-1">No messages yet</p>
        <p className="text-sm text-text-muted">
          Messages from the contact form will show up here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[16px] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left font-medium text-slate-500 px-4 py-3 w-8"></th>

              <th className="text-left font-semibold text-slate-600 px-4 py-3">
                Name
              </th>

              <th className="text-left font-semibold text-slate-600 px-4 py-3 hidden sm:table-cell">
                Email
              </th>

              <th className="text-left font-semibold text-slate-600 px-4 py-3 hidden md:table-cell">
                Message
              </th>

              <th className="text-left font-semibold text-slate-600 px-4 py-3 whitespace-nowrap">
                Date
              </th>

              <th className="text-right font-semibold text-slate-600 px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition"
              >
                <td className="px-4 py-3.5">
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-brand block shadow-[0_0_0_3px_rgba(0,113,227,0.15)]" />
                  )}
                </td>

                <td className="px-4 py-3.5 max-w-[140px]">
                  <p
                    className={`truncate ${
                      msg.read ? "text-text" : "text-text font-semibold"
                    }`}
                  >
                    {msg.name}
                  </p>

                  <p className="text-xs text-text-muted truncate sm:hidden">
                    {msg.email}
                  </p>
                </td>

                <td className="px-4 py-3.5 text-text-muted hidden sm:table-cell max-w-[180px]">
                  <p className="truncate">{msg.email}</p>
                </td>

                <td className="px-4 py-3.5 text-text-muted hidden md:table-cell max-w-[260px]">
                  <p className="truncate">{msg.message}</p>
                </td>

                <td className="px-4 py-3.5 text-text-muted whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleView(msg)}
                      title="View"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-200"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>

                    <a
                      href={`mailto:${msg.email}`}
                      title="Reply"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all duration-200"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M3 10l7-6 11 6-11 6-7-6z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M10 10v9" strokeLinecap="round" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(msg)}
                      title="Delete"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          onClick={() => setViewTarget(null)}
        >
          <div
            className="bg-white rounded-[16px] max-w-lg w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-base font-semibold text-text">
                  {viewTarget.name}
                </p>

                <a
                  href={`mailto:${viewTarget.email}`}
                  className="text-sm text-brand hover:text-brand-dark transition"
                >
                  {viewTarget.email}
                </a>
              </div>

              <button
                type="button"
                onClick={() => setViewTarget(null)}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-text-muted hover:bg-surface transition flex-shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <p className="text-xs text-text-muted mb-4">
              {new Date(viewTarget.createdAt).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <div className="rounded-[10px] bg-surface p-4 mb-5">
              <p className="text-sm text-text leading-relaxed whitespace-pre-wrap">
                {viewTarget.message}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${viewTarget.email}`}
                className="flex-1 rounded-[10px] bg-brand py-2.5 text-sm font-medium text-white text-center hover:bg-brand-dark transition"
              >
                Reply by email
              </a>

              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(viewTarget);
                }}
                className="rounded-[10px] border border-border px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center px-4"
          onClick={() => {
            if (!deleting) setDeleteTarget(null);
          }}
        >
          <div
            className="bg-white rounded-[14px] max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-text mb-1">
              Delete message?
            </h3>

            <p className="text-sm text-text-muted mb-5">
              This message from &ldquo;{deleteTarget.name}&rdquo; will be
              permanently deleted.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-[8px] border border-border py-2 text-sm text-text hover:bg-surface transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 rounded-[8px] bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}