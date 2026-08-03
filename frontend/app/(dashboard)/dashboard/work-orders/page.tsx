"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, Filter, Wrench } from "lucide-react";
import { technicians, workOrders } from "@/lib/mock-data";

const statusOptions = ["الكل", "بانتظار الفحص", "بانتظار موافقة العميل", "بانتظار القطع", "تحت الإصلاح", "جاهزة للتسليم"];

export default function WorkOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("الكل");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "الكل") {
      return workOrders;
    }
    return workOrders.filter((order) => order.status === statusFilter);
  }, [statusFilter]);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">أوامر الإصلاح</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">إدارة دورة الإصلاح من التشخيص حتى التسليم.</p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2">
            <Filter className="h-4 w-4 text-[#0057A8]" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="bg-transparent text-sm font-semibold text-[#2D4356] outline-none"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="panel overflow-hidden lg:col-span-2">
          <div className="space-y-2 p-3 md:hidden">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/work-orders/${order.id}`}
                className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-extrabold text-[#003B73]">{order.orderNo}</p>
                  <span className="rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[11px] font-bold text-[#0057A8]">{order.status}</span>
                </div>
                <p className="mt-1 text-xs text-[#3B4E5D]">{order.customerName} - {order.vehiclePlate}</p>
                <p className="mt-1 text-xs text-[#5F6F7D]">الفني: {order.technician}</p>
              </Link>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-sm">
              <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
                <tr>
                  <th className="px-4 py-3 font-bold">رقم الأمر</th>
                  <th className="px-4 py-3 font-bold">المركبة</th>
                  <th className="px-4 py-3 font-bold">العميل</th>
                  <th className="px-4 py-3 font-bold">الفني</th>
                  <th className="px-4 py-3 font-bold">الحالة</th>
                  <th className="px-4 py-3 font-bold">التسليم المتوقع</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                    <td className="px-4 py-3 font-semibold text-[#0057A8]">
                      <Link href={`/dashboard/work-orders/${order.id}`} className="hover:underline">
                        {order.orderNo}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{order.vehiclePlate}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.technician}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[#E8F1FB] px-2.5 py-1 text-xs font-bold text-[#0057A8]">{order.status}</span>
                    </td>
                    <td className="px-4 py-3">{order.estimatedDelivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel p-5">
          <h3 className="text-base font-extrabold text-[#003B73]">حمولة الفنيين</h3>
          <div className="mt-3 space-y-2">
            {technicians.map((technician) => (
              <div key={technician.id} className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
                <p className="text-sm font-bold text-[#2D4356]">{technician.name}</p>
                <p className="text-xs text-[#5F6F7D]">{technician.specialty}</p>
                <p className="mt-1 text-xs font-semibold text-[#0057A8]">أوامر نشطة: {technician.activeOrders}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-[#5F6F7D]/20 bg-[#F8FAFC] p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
              <Wrench className="h-4 w-4 text-[#0057A8]" />
              إجمالي الأوامر المعروضة: {filteredOrders.length}
            </div>
            <p className="mt-1 text-xs text-[#5F6F7D]">هذه البيانات تجريبية ضمن البروتوتايب وقابلة للربط المباشر مع API لاحقا.</p>
          </div>
        </article>
      </div>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <ClipboardList className="h-4 w-4 text-[#0057A8]" />
          يمكنك استخدام هذه الشاشة كنواة لإدارة سير أمر الإصلاح وتحديث الحالة لحظيا.
        </div>
      </article>
    </section>
  );
}
