"use client";

import AdminDashboardLayout from "@/components/admin/dashboard/layout";
import AdminDashboardOverview from "@/components/admin/dashboard/overview";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <AdminDashboardLayout>
        <AdminDashboardOverview />
      </AdminDashboardLayout>
    </main>
  )
}
