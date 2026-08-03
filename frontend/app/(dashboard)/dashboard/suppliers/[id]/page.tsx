import Link from "next/link";
import { notFound } from "next/navigation";
import { suppliers } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SupplierDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const supplier = suppliers.find((item) => item.id === id);

  if (!supplier) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">ملف المورد</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{supplier.name}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">المسؤول</p><p className="font-bold text-[#2D4356]">{supplier.contactName}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الجوال</p><p className="font-bold text-[#2D4356]">{supplier.mobile}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">متوسط التوريد</p><p className="font-bold text-[#2D4356]">{supplier.leadDays} أيام</p></div>
          <div><p className="text-xs text-[#5F6F7D]">طلبات معلقة</p><p className="font-bold text-[#2D4356]">{supplier.pendingPOs}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">التقييم</p><p className="font-bold text-[#2D4356]">{supplier.rating}/5</p></div>
        </div>
      </article>

      <Link href="/dashboard/suppliers" className="inline-flex rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للموردين</Link>
    </section>
  );
}
