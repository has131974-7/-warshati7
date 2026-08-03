"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { customers, formatCurrency } from "@/lib/mock-data";

export default function CustomersPage() {
  const [query, setQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) {
      return customers;
    }

    return customers.filter(
      (customer) =>
        customer.name.includes(normalized) || customer.mobile.includes(normalized) || customer.city.includes(normalized),
    );
  }, [query]);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">العملاء</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">عرض بيانات العملاء وأرصدة الحسابات وسجل المركبات.</p>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3">
            <Search className="h-4 w-4 text-[#0057A8]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث باسم العميل أو الجوال"
              className="bg-transparent text-sm text-[#2D4356] outline-none"
            />
          </div>
        </div>
      </header>

      <article className="panel overflow-hidden">
        <div className="space-y-2 p-3 md:hidden">
          {filteredCustomers.map((customer) => (
            <Link
              key={customer.id}
              href={`/dashboard/customers/${customer.id}`}
              className="block rounded-xl border border-[#5F6F7D]/20 bg-white p-3"
            >
              <p className="text-sm font-extrabold text-[#003B73]">{customer.name}</p>
              <p className="mt-1 text-xs text-[#3B4E5D]">{customer.mobile}</p>
              <p className="mt-1 text-xs text-[#5F6F7D]">{customer.city} • {customer.vehiclesCount} مركبة</p>
            </Link>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#EEF4FB] text-right text-[#2D4356]">
              <tr>
                <th className="px-4 py-3 font-bold">الاسم</th>
                <th className="px-4 py-3 font-bold">الجوال</th>
                <th className="px-4 py-3 font-bold">المدينة</th>
                <th className="px-4 py-3 font-bold">عدد المركبات</th>
                <th className="px-4 py-3 font-bold">الرصيد</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-[#5F6F7D]/15 text-[#3B4E5D]">
                  <td className="px-4 py-3 font-semibold">
                    <Link href={`/dashboard/customers/${customer.id}`} className="text-[#0057A8] hover:underline">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{customer.mobile}</td>
                  <td className="px-4 py-3">{customer.city}</td>
                  <td className="px-4 py-3">{customer.vehiclesCount}</td>
                  <td className="px-4 py-3">{formatCurrency(customer.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="panel p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
          <Users className="h-4 w-4 text-[#0057A8]" />
          عدد العملاء المعروضين: {filteredCustomers.length}
        </div>
      </article>
    </section>
  );
}
