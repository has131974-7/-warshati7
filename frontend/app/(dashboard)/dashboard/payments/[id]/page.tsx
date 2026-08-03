import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency, payments } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const payment = payments.find((entry) => entry.id === id);

  if (!payment) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">تفاصيل سند قبض</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{payment.receiptNo}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">العميل</p><p className="font-bold text-[#2D4356]">{payment.customerName}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الفاتورة</p><p className="font-bold text-[#2D4356]">{payment.invoiceNo}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">المبلغ</p><p className="font-bold text-[#2D4356]">{formatCurrency(payment.amount)}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">طريقة الدفع</p><p className="font-bold text-[#2D4356]">{payment.method}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">التاريخ</p><p className="font-bold text-[#2D4356]">{payment.paidAt}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">المستلم</p><p className="font-bold text-[#2D4356]">{payment.receivedBy}</p></div>
        </div>
      </article>

      <Link href="/dashboard/payments" className="inline-flex rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للمدفوعات</Link>
    </section>
  );
}
