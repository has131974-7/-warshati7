import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen md:flex">
      <SidebarNav />

      <div className="flex-1 px-3 py-3 sm:px-6 sm:py-6">
        <DashboardHeader />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
