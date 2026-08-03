import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VehicleDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);

  if (!vehicle) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">سجل مركبة</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{vehicle.plateNumber}</h2>
        <p className="mt-1 text-sm text-[#5F6F7D]">{vehicle.make} {vehicle.model} {vehicle.year}</p>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">العميل</p><p className="font-bold text-[#2D4356]">{vehicle.customerName}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">رقم الهيكل</p><p className="font-bold text-[#2D4356]">{vehicle.vin}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">اللون</p><p className="font-bold text-[#2D4356]">{vehicle.color}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">العداد</p><p className="font-bold text-[#2D4356]">{vehicle.odometer.toLocaleString("ar-SA")} كم</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الحالة</p><p className="font-bold text-[#2D4356]">{vehicle.status}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">أمر الإصلاح</p><p className="font-bold text-[#2D4356]">{vehicle.repairOrderNo}</p></div>
        </div>
      </article>

      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/vehicles" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للمركبات</Link>
        <Link href="/dashboard/work-orders" className="rounded-xl bg-[#003B73] px-4 py-2 text-sm font-bold text-white">متابعة أمر الإصلاح</Link>
      </div>
    </section>
  );
}
