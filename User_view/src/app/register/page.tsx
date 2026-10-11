"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!phone || phone.trim().length === 0) {
      setError("Phone number is required.");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, phone, password });
    } catch (err: any) {
      const backendMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        (err.response?.data && typeof err.response.data === 'string' ? err.response.data : null);

      setError(backendMessage || "Registration failed. Please check all fields.");
    } finally {
      setIsLoading(false);
    }
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
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            Join DriveZone to save your garage, track orders, and accessories
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-[#220B0B] border border-red-500/40 rounded-2xl flex items-center gap-2.5 text-xs text-red-300 font-bold">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
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
            Create Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-gray-400 pt-4 border-t border-[#1C212B]">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-red-500 hover:text-red-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}