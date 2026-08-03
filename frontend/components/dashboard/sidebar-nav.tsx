"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartColumnBig,
  ClipboardPenLine,
  Cog,
  LayoutDashboard,
  ReceiptText,
  Package,
  Wallet,
  ShoppingBag,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/dashboard/vehicle-reception", label: "استقبال المركبة", icon: ClipboardPenLine },
  { href: "/dashboard/vehicles", label: "المركبات", icon: Truck },
  { href: "/dashboard/work-orders", label: "أوامر الإصلاح", icon: Wrench },
  { href: "/dashboard/inventory", label: "المخزون", icon: Package },
  { href: "/dashboard/suppliers", label: "الموردون", icon: ShoppingBag },
  { href: "/dashboard/customers", label: "العملاء", icon: Users },
  { href: "/dashboard/invoices", label: "الفواتير", icon: ReceiptText },
  { href: "/dashboard/payments", label: "المدفوعات", icon: Wallet },
  { href: "/dashboard/reports", label: "التقارير", icon: ChartColumnBig },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Cog },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="surface-glass mb-3 overflow-x-auto rounded-2xl border border-[#5F6F7D]/20 p-2 md:hidden">
        <nav className="flex w-max items-center gap-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  isActive ? "bg-[#003B73] text-white" : "bg-white text-[#2D4356]"
                }`}
              >
                <item.icon className={`h-3.5 w-3.5 ${isActive ? "text-[#D8E7F8]" : "text-[#0057A8]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="surface-glass hidden min-h-screen w-72 border-l border-[#5F6F7D]/25 px-4 py-6 md:block">
        <div className="mb-8 rounded-2xl bg-[#003B73] px-4 py-5 text-white shadow-lg shadow-[#213547]/20">
          <p className="text-lg font-extrabold tracking-tight">ورشتي 7</p>
          <p className="mt-1 text-sm text-[#D8E7F8]">لوحة إدارة عمليات الورشة</p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#003B73] text-white shadow-md shadow-[#213547]/20"
                    : "text-[#2D4356] hover:bg-[#D8E7F8]/80"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-[#D8E7F8]" : "text-[#0057A8] group-hover:text-[#003B73]"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
