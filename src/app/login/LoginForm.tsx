"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Incorrect email or password");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 mb-8"
        >
          <div className="w-9 h-9 rounded-[10px] bg-brand flex items-center justify-center shadow-sm shadow-brand/30">
            <span className="text-white text-xs font-semibold">K</span>
          </div>

          <span className="text-sm font-semibold text-text">
            Kuwait Guides
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-[20px] border border-border bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-xl font-semibold text-text mb-1.5">
              Welcome back
            </h1>

            <p className="text-sm text-text-muted">
              Sign in to manage your guides
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-text-muted mb-1.5"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
                className="w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-text outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-text-muted mb-1.5"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-[10px] border border-border bg-white pl-4 pr-11 py-2.5 text-text outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-sm text-red-600 text-center"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[10px] bg-brand text-white py-2.5 font-medium shadow-sm shadow-brand/25 transition hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="block text-center text-sm text-text-muted hover:text-brand transition mt-6"
        >
          ← Back to Kuwait Guides
        </Link>
      </div>
    </div>
  );
}
