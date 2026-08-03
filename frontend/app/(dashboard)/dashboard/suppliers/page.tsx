import Link from "next/link";
import { Building2, Clock3 } from "lucide-react";
import { suppliers } from "@/lib/mock-data";

export default function SuppliersPage() {
  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <h2 className="text-2xl font-extrabold text-[#003B73]">الموردون</h2>
        <p className="mt-1 text-sm font-medium text-[#5F6F7D]">إدارة شبكة الموردين ومتابعة طلبات الشراء المفتوحة.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => (
          <Link key={supplier.id} href={`/dashboard/suppliers/${supplier.id}`} className="panel block p-5 transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#2D4356]">{supplier.name}</h3>
              <Building2 className="h-4 w-4 text-[#0057A8]" />
            </div>
            <p className="mt-2 text-xs text-[#5F6F7D]">المسؤول: {supplier.contactName}</p>
            <p className="mt-1 text-xs text-[#5F6F7D]">الجوال: {supplier.mobile}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-[#EEF4FB] p-2 text-[#2D4356]">
                <p className="font-bold">طلبات معلقة</p>
                <p className="mt-1 text-sm font-extrabold text-[#003B73]">{supplier.pendingPOs}</p>
              </div>
              <div className="rounded-lg bg-[#EEF4FB] p-2 text-[#2D4356]">
                <p className="font-bold">التقييم</p>
                <p className="mt-1 text-sm font-extrabold text-[#003B73]">{supplier.rating}/5</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#5F6F7D]">
              <Clock3 className="h-3.5 w-3.5 text-[#0057A8]" />
              متوسط التوريد: {supplier.leadDays} أيام
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
