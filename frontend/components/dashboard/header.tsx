import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";

export function DashboardHeader() {
  const today = new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="surface-glass sticky top-0 z-10 rounded-2xl border border-[#5F6F7D]/20 px-4 py-4 shadow-lg shadow-[#213547]/5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-[#003B73]">لوحة إدارة الورشة</h1>
          <p className="mt-1 text-sm font-semibold text-[#5F6F7D]">متابعة مركبات العملاء وحالات الإصلاح اليومية</p>
          <p className="mt-1 text-xs text-slate-500">{today}</p>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3 sm:w-72 sm:flex-none">
            <Search className="h-4 w-4 text-[#0057A8]" />
            <input
              aria-label="بحث"
              placeholder="ابحث برقم اللوحة أو أمر العمل"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#5F6F7D]/25 bg-white text-[#003B73] transition hover:-translate-y-0.5 hover:shadow-sm"
            aria-label="الإشعارات"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#0057A8]" />
          </button>

          <Link
            href="/dashboard/work-orders"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#003B73] px-3 text-sm font-bold text-white transition hover:bg-[#004B92]"
          >
            <Sparkles className="h-4 w-4 text-[#D8E7F8]" />
            إنشاء أمر عمل
          </Link>
        </div>
      </div>
    </header>
  );
}
