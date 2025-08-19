import AdminLoginForm from "@/components/admin/login-form"

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <AdminLoginForm />
      </div>
    </main>
  )
}
