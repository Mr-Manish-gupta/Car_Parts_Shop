"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AlertCircle, ShieldCheck, Zap } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail("admin@carparts.com");
    setPassword("AdminParts#2026");
    setError("");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#07080B]">
      <div className="w-full max-w-md bg-[#0F1218] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#1C212B] space-y-6 text-white">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3.5 bg-red-600 text-white rounded-2xl mb-1 shadow-lg shadow-red-600/25">
            <svg className="w-8 h-8 text-white" viewBox="0 0 48 48" fill="none">
              <path
                d="M6 30C6 30 11 20 18 17C25 14 34 16 38 21C42 26 44 30 44 30M10 30H40M12 36C10.3431 36 9 34.6569 9 33C9 31.3431 10.3431 30 12 30C13.6569 30 15 31.3431 15 33C15 34.6569 13.6569 36 12 36ZM36 36C34.3431 36 33 34.6569 33 33C33 31.3431 34.3431 30 36 30C37.6569 30 39 31.3431 39 33C39 34.6569 37.6569 36 36 36Z"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path d="M19 22H29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            Sign in to access your garage, orders, and dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-[#220B0B] border border-red-500/40 rounded-2xl flex items-center gap-2.5 text-xs text-red-300 font-bold">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 text-sm mt-2"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Links & 1-Tap Admin Fill */}
        <div className="text-center text-xs text-gray-400 space-y-3 pt-4 border-t border-[#1C212B]">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-red-500 hover:text-red-400 hover:underline">
              Create an account
            </Link>
          </p>

          <div
            onClick={handleFillAdmin}
            className="p-3 bg-[#141822] hover:bg-[#1A202C] border border-[#222734] hover:border-red-500/40 text-gray-300 rounded-2xl text-[11px] flex items-center justify-between gap-2 cursor-pointer transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-gray-400">Admin Account:</p>
                <p className="font-bold text-white">admin@carparts.com</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
              <Zap size={11} /> Auto Fill
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}