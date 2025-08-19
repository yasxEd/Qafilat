import dynamic from "next/dynamic"
import LoginContainer from "@/components/auth/login-container"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Main content - reduced top margin on desktop */}
      <div className="flex-grow flex items-center justify-center pt-24 md:pt-28 pb-16 px-4 min-h-screen md:min-h-[calc(100vh-80px)]">
        <div className="w-full md:mt-4 md:mb-8">
          <LoginContainer />
        </div>
      </div>

      <Footer />
    </main>
  )
}
