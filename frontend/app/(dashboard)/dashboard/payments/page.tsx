"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeDollarSign, Filter } from "lucide-react";
import { formatCurrency, payments } from "@/lib/mock-data";

const methods = ["الكل", "نقدي", "بطاقة", "تحويل"];

export default function PaymentsPage() {
  const [methodFilter, setMethodFilter] = useState("الكل");

  const filteredPayments = useMemo(() => {
    if (methodFilter === "الكل") {
      return payments;
    }
    return payments.filter((payment) => payment.method === methodFilter);
  }, [methodFilter]);

  const collectedAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">المدفوعات</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">إدارة سندات القبض ومراقبة طرق الدفع اليومية.</p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2">
            <Filter className="h-4 w-4 text-[#0057A8]" />
            <select
              value={methodFilter}
              onChange={(event) => setMethodFilter(event.target.value)}
              className="bg-transparent text-sm font-semibold text-[#2D4356] outline-none"
            >
              {methods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">عدد السندات</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{filteredPayments.length}</p>
        </article>
        <article className="panel p-4">
          <p className="text-xs font-bold text-[#5F6F7D]">إجمالي التحصيل</p>
          <p className="mt-1 text-2xl font-black text-[#003B73]">{formatCurrency(collectedAmount)}</p>
        </article>
      </div>

      <article className="panel overflow-hidden">
        <div className="space-y-2 p-3 md:hidden">
          {filteredPayments.map((payment) => (
            <Link
              key={payment.id}
              href={`/dashboard/payments/${payment.id}`}
              className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-extrabold text-[#003B73]">{payment.receiptNo}</p>
                <span className="rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[11px] font-bold text-[#0057A8]">{payment.method}</span>
              </div>
              <p className="mt-1 text-xs text-[#3B4E5D]">{payment.customerName}</p>
              <p className="mt-1 text-xs text-[#5F6F7D]">{formatCurrency(payment.amount)} • {payment.paidAt}</p>
            </Link>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
              <tr>
                <th className="px-4 py-3 font-bold">سند القبض</th>
                <th className="px-4 py-3 font-bold">الفاتورة</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">المبلغ</th>
                <th className="px-4 py-3 font-bold">الطريقة</th>
                <th className="px-4 py-3 font-bold">التاريخ</th>
                <th className="px-4 py-3 font-bold">المستلم</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                  <td className="px-4 py-3 font-semibold text-[#0057A8]">
                    <Link href={`/dashboard/payments/${payment.id}`} className="hover:underline">
                      {payment.receiptNo}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{payment.invoiceNo}</td>
                  <td className="px-4 py-3">{payment.customerName}</td>
                  <td className="px-4 py-3">{formatCurrency(payment.amount)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E8F1FB] px-2.5 py-1 text-xs font-bold text-[#0057A8]">{payment.method}</span>
                  </td>
                  <td className="px-4 py-3">{payment.paidAt}</td>
                  <td className="px-4 py-3">{payment.receivedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <BadgeDollarSign className="h-4 w-4 text-[#0057A8]" />
          تم إعداد الشاشة لاختبار دورة التحصيل قبل تفعيل الربط الأمني.
        </div>
      </article>
    </section>
  );
}