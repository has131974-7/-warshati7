import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency, workOrders } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkOrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const order = workOrders.find((item) => item.id === id);

  if (!order) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">تفاصيل أمر إصلاح</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{order.orderNo}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">المركبة</p><p className="font-bold text-[#2D4356]">{order.vehiclePlate}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">العميل</p><p className="font-bold text-[#2D4356]">{order.customerName}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الفني</p><p className="font-bold text-[#2D4356]">{order.technician}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الأولوية</p><p className="font-bold text-[#2D4356]">{order.priority}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الحالة</p><p className="font-bold text-[#2D4356]">{order.status}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">التسليم المتوقع</p><p className="font-bold text-[#2D4356]">{order.estimatedDelivery}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">التكلفة التقديرية</p><p className="font-bold text-[#2D4356]">{formatCurrency(order.totalEstimate)}</p></div>
        </div>
      </article>

      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/work-orders" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للأوامر</Link>
        <Link href="/dashboard/vehicle-reception" className="rounded-xl bg-[#003B73] px-4 py-2 text-sm font-bold text-white">استقبال مركبة جديدة</Link>
      </div>
    </section>
  );
}
