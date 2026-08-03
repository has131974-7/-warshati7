"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Search } from "lucide-react";
import { formatCurrency, invoices } from "@/lib/mock-data";

export default function InvoicesPage() {
  const [query, setQuery] = useState("");

  const filteredInvoices = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) {
      return invoices;
    }

    return invoices.filter(
      (invoice) =>
        invoice.invoiceNo.includes(normalized) ||
        invoice.customerName.includes(normalized) ||
        invoice.repairOrderNo.includes(normalized),
    );
  }, [query]);

  const totalInvoiced = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const totalPaid = filteredInvoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const totalDue = totalInvoiced - totalPaid;

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">الفواتير</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">متابعة إصدار الفواتير والتحصيل المتبقي لكل أمر إصلاح.</p>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3">
            <Search className="h-4 w-4 text-[#0057A8]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث برقم الفاتورة أو العميل"
              className="bg-transparent text-sm text-[#2D4356] outline-none"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">إجمالي الفواتير</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{formatCurrency(totalInvoiced)}</p>
        </article>
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">إجمالي المحصل</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{formatCurrency(totalPaid)}</p>
        </article>
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">المتبقي للتحصيل</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{formatCurrency(totalDue)}</p>
        </article>
      </div>

      <article className="panel overflow-hidden">
        <div className="space-y-2 p-3 md:hidden">
          {filteredInvoices.map((invoice) => (
            <Link
              key={invoice.id}
              href={`/dashboard/invoices/${invoice.id}`}
              className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-extrabold text-[#003B73]">{invoice.invoiceNo}</p>
                <span className="rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[11px] font-bold text-[#0057A8]">{invoice.status}</span>
              </div>
              <p className="mt-1 text-xs text-[#3B4E5D]">{invoice.customerName}</p>
              <p className="mt-1 text-xs text-[#5F6F7D]">{formatCurrency(invoice.paid)} / {formatCurrency(invoice.total)}</p>
            </Link>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
              <tr>
                <th className="px-4 py-3 font-bold">رقم الفاتورة</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">أمر الإصلاح</th>
                <th className="px-4 py-3 font-bold">الإصدار</th>
                <th className="px-4 py-3 font-bold">الاستحقاق</th>
                <th className="px-4 py-3 font-bold">الإجمالي</th>
                <th className="px-4 py-3 font-bold">المدفوع</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                  <td className="px-4 py-3 font-semibold text-[#0057A8]">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="hover:underline">
                      {invoice.invoiceNo}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{invoice.customerName}</td>
                  <td className="px-4 py-3">{invoice.repairOrderNo}</td>
                  <td className="px-4 py-3">{invoice.issueDate}</td>
                  <td className="px-4 py-3">{invoice.dueDate}</td>
                  <td className="px-4 py-3">{formatCurrency(invoice.total)}</td>
                  <td className="px-4 py-3">{formatCurrency(invoice.paid)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E8F1FB] px-2.5 py-1 text-xs font-bold text-[#0057A8]">{invoice.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <FileText className="h-4 w-4 text-[#0057A8]" />
          عدد الفواتير المعروضة: {filteredInvoices.length}
        </div>
      </article>
    </section>
  );
}