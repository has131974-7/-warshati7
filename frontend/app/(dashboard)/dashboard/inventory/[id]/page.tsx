import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency, inventoryItems } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InventoryItemDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const item = inventoryItems.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">تفاصيل صنف مخزون</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{item.name}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">SKU</p><p className="font-bold text-[#2D4356]">{item.sku}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الفئة</p><p className="font-bold text-[#2D4356]">{item.category}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الكمية</p><p className="font-bold text-[#2D4356]">{item.quantity}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">حد إعادة الطلب</p><p className="font-bold text-[#2D4356]">{item.reorderLevel}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">التكلفة</p><p className="font-bold text-[#2D4356]">{formatCurrency(item.unitCost)}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">المورد</p><p className="font-bold text-[#2D4356]">{item.supplier}</p></div>
        </div>
      </article>

      <Link href="/dashboard/inventory" className="inline-flex rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للمخزون</Link>
    </section>
  );
}
