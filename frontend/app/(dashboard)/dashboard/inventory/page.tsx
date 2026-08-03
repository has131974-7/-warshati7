"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Boxes, Search } from "lucide-react";
import { formatCurrency, inventoryItems } from "@/lib/mock-data";

export default function InventoryPage() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) {
      return inventoryItems;
    }

    return inventoryItems.filter(
      (item) =>
        item.name.includes(normalized) ||
        item.sku.includes(normalized) ||
        item.category.includes(normalized) ||
        item.supplier.includes(normalized),
    );
  }, [query]);

  const lowStockCount = filteredItems.filter((item) => item.quantity <= item.reorderLevel).length;

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">إدارة المخزون</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">متابعة كميات القطع، وحدود إعادة الطلب، وتكلفة الوحدات.</p>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3">
            <Search className="h-4 w-4 text-[#0057A8]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث بالاسم أو SKU"
              className="bg-transparent text-sm text-[#2D4356] outline-none"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">العناصر المعروضة</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{filteredItems.length}</p>
        </article>
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">عناصر منخفضة</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{lowStockCount}</p>
        </article>
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">قيمة المخزون التقديرية</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">
            {formatCurrency(filteredItems.reduce((sum, item) => sum + item.quantity * item.unitCost, 0))}
          </p>
        </article>
      </div>

      <article className="panel overflow-hidden">
        <div className="space-y-2 p-3 md:hidden">
          {filteredItems.map((item) => {
            const isLow = item.quantity <= item.reorderLevel;

            return (
              <Link
                key={item.id}
                href={`/dashboard/inventory/${item.id}`}
                className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-extrabold text-[#003B73]">{item.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${isLow ? "bg-[#FFE7D6] text-[#B95D00]" : "bg-[#E8F1FB] text-[#0057A8]"}`}>
                    {item.quantity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#3B4E5D]">{item.sku} • {item.category}</p>
                <p className="mt-1 text-xs text-[#5F6F7D]">{item.supplier}</p>
              </Link>
            );
          })}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
              <tr>
                <th className="px-4 py-3 font-bold">SKU</th>
                <th className="px-4 py-3 font-bold">الصنف</th>
                <th className="px-4 py-3 font-bold">الفئة</th>
                <th className="px-4 py-3 font-bold">الكمية</th>
                <th className="px-4 py-3 font-bold">حد إعادة الطلب</th>
                <th className="px-4 py-3 font-bold">التكلفة</th>
                <th className="px-4 py-3 font-bold">المورد</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const isLow = item.quantity <= item.reorderLevel;

                return (
                  <tr key={item.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                    <td className="px-4 py-3 font-semibold text-[#0057A8]">
                      <Link href={`/dashboard/inventory/${item.id}`} className="hover:underline">
                        {item.sku}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/inventory/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isLow ? "bg-[#FFE7D6] text-[#B95D00]" : "bg-[#E8F1FB] text-[#0057A8]"}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.reorderLevel}</td>
                    <td className="px-4 py-3">{formatCurrency(item.unitCost)}</td>
                    <td className="px-4 py-3">{item.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <Boxes className="h-4 w-4 text-[#0057A8]" />
          هذا النموذج يتيح اختبار تنبيهات النقص وإدارة المخزون قبل الربط مع قاعدة البيانات.
        </div>
      </article>
    </section>
  );
}
