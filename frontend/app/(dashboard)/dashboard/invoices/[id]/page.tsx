import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency, invoices, payments } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InvoiceDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const invoice = invoices.find((entry) => entry.id === id);

  if (!invoice) {
    notFound();
  }

  const relatedPayments = payments.filter((payment) => payment.invoiceNo === invoice.invoiceNo);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">تفاصيل الفاتورة</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{invoice.invoiceNo}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">العميل</p><p className="font-bold text-[#2D4356]">{invoice.customerName}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">أمر الإصلاح</p><p className="font-bold text-[#2D4356]">{invoice.repairOrderNo}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الإجمالي</p><p className="font-bold text-[#2D4356]">{formatCurrency(invoice.total)}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">المدفوع</p><p className="font-bold text-[#2D4356]">{formatCurrency(invoice.paid)}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الحالة</p><p className="font-bold text-[#2D4356]">{invoice.status}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الاستحقاق</p><p className="font-bold text-[#2D4356]">{invoice.dueDate}</p></div>
        </div>
      </article>

      <article className="panel p-5">
        <h3 className="text-base font-extrabold text-[#003B73]">سندات مرتبطة</h3>
        <div className="mt-3 grid gap-2">
          {relatedPayments.length > 0 ? relatedPayments.map((payment) => (
            <Link key={payment.id} href={`/dashboard/payments/${payment.id}`} className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356]">
              {payment.receiptNo} - {formatCurrency(payment.amount)}
            </Link>
          )) : <p className="text-sm text-[#5F6F7D]">لا توجد مدفوعات مرتبطة.</p>}
        </div>
      </article>

      <Link href="/dashboard/invoices" className="inline-flex rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للفواتير</Link>
    </section>
  );
}
