"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Не удалось войти");
      setLoading(false);
      return;
    }
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm border border-gray-light rounded-sm p-6 shadow-sm">
        <h1 className="so-heading text-gray-dark mb-4">ÉTT Market — вход в админку</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="so-body text-gray-dark mb-1 block">Пароль</label>
            <input
              type="password"
              className="w-full border border-gray-light px-3 py-2 so-body"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="so-body text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-dark text-white so-body py-2"
            disabled={loading}
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
