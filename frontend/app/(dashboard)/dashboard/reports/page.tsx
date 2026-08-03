import Link from "next/link";
import { ChartColumnBig, CircleDollarSign, Timer } from "lucide-react";
import { invoices, payments, workOrders } from "@/lib/mock-data";

export default function ReportsPage() {
  const totalInvoices = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completionRate = Math.round((workOrders.filter((o) => o.status === "جاهزة للتسليم").length / workOrders.length) * 100);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <h2 className="text-2xl font-extrabold text-[#003B73]">التقارير</h2>
        <p className="mt-1 text-sm font-medium text-[#5F6F7D]">مؤشرات تشغيلية ومالية يومية لقياس أداء الورشة.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/dashboard/work-orders" className="panel block p-4 transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#0057A8]"><ChartColumnBig className="h-4 w-4" /><p className="text-xs font-bold">أوامر الإصلاح</p></div>
          <p className="mt-2 text-2xl font-black text-[#003B73]">{workOrders.length}</p>
        </Link>
        <Link href="/dashboard/invoices" className="panel block p-4 transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#0057A8]"><CircleDollarSign className="h-4 w-4" /><p className="text-xs font-bold">إجمالي الفواتير</p></div>
          <p className="mt-2 text-2xl font-black text-[#003B73]">{totalInvoices.toLocaleString("ar-SA")} ر.س</p>
        </Link>
        <Link href="/dashboard/payments" className="panel block p-4 transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#0057A8]"><CircleDollarSign className="h-4 w-4" /><p className="text-xs font-bold">إجمالي التحصيل</p></div>
          <p className="mt-2 text-2xl font-black text-[#003B73]">{totalPayments.toLocaleString("ar-SA")} ر.س</p>
        </Link>
        <Link href="/dashboard/work-orders" className="panel block p-4 transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#0057A8]"><Timer className="h-4 w-4" /><p className="text-xs font-bold">نسبة الإكمال</p></div>
          <p className="mt-2 text-2xl font-black text-[#003B73]">{completionRate}%</p>
        </Link>
      </div>

      <article className="panel p-5">
        <h3 className="text-base font-extrabold text-[#003B73]">توزيع الحالات الحالية</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {["بانتظار الفحص", "بانتظار موافقة العميل", "بانتظار القطع", "تحت الإصلاح", "جاهزة للتسليم"].map((status) => {
            const count = workOrders.filter((order) => order.status === status).length;
            return (
              <Link key={status} href="/dashboard/work-orders" className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3 transition hover:-translate-y-0.5">
                <p className="text-xs font-bold text-[#5F6F7D]">{status}</p>
                <p className="mt-1 text-xl font-black text-[#003B73]">{count}</p>
              </Link>
            );
          })}
        </div>
      </article>
    </section>
  );
}
