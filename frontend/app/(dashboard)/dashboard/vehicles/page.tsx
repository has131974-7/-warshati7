import Link from "next/link";
import { CarFront, Eye, Plus } from "lucide-react";
import { vehicles } from "@/lib/mock-data";

export default function VehiclesPage() {
  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">المركبات</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">
              متابعة سجل المركبات المسجلة وحالة كل مركبة داخل الورشة.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/dashboard/vehicle-reception"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#003B73] px-3 text-sm font-bold text-white transition hover:bg-[#004B92]"
            >
              <Plus className="h-4 w-4 text-[#D8E7F8]" />
              استقبال مركبة
            </Link>
            <Link
              href="/dashboard/work-orders"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#003B73]/25 bg-white px-3 text-sm font-bold text-[#003B73] transition hover:bg-[#E8F1FB]"
            >
              <Eye className="h-4 w-4" />
              أوامر الإصلاح
            </Link>
          </div>
        </div>
      </header>

      <article className="panel overflow-hidden">
        <div className="md:hidden space-y-2 p-3">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/dashboard/vehicles/${vehicle.id}`}
              className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-extrabold text-[#003B73]">{vehicle.plateNumber}</p>
                <span className="rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[11px] font-bold text-[#0057A8]">{vehicle.status}</span>
              </div>
              <p className="mt-1 text-xs text-[#3B4E5D]">{vehicle.customerName}</p>
              <p className="mt-1 text-xs text-[#5F6F7D]">{vehicle.make} {vehicle.model} {vehicle.year}</p>
            </Link>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
              <tr>
                <th className="px-4 py-3 font-bold">رقم اللوحة</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">المركبة</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">أمر الإصلاح</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                  <td className="px-4 py-3 font-semibold">
                    <Link href={`/dashboard/vehicles/${vehicle.id}`} className="text-[#0057A8] hover:underline">
                      {vehicle.plateNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{vehicle.customerName}</td>
                  <td className="px-4 py-3">{vehicle.make} {vehicle.model} {vehicle.year}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E8F1FB] px-2.5 py-1 text-xs font-bold text-[#0057A8]">
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#0057A8]">{vehicle.repairOrderNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#5F6F7D]/15 bg-[#FAFCFF] px-4 py-3 text-xs font-medium text-[#5F6F7D]">
          هذه الشاشة مهيأة للربط مع قاعدة البيانات لعرض المركبات الفعلية بدلا من البيانات الحالية.
        </div>
      </article>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <CarFront className="h-4 w-4 text-[#0057A8]" />
          تدفق التنقل: استقبال مركبة ← إنشاء أمر إصلاح ← متابعة الحالة في سجل المركبات.
        </div>
      </article>
    </section>
  );
}
