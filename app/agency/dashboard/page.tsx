import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import AgencyDashboardOverview from "@/components/agency/dashboard/overview"

export default function AgencyDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AgencyDashboardLayout>
        <AgencyDashboardOverview />
      </AgencyDashboardLayout>
    </main>
  )
}
