import {
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  PackageSearch,
  ReceiptText,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { invoices, vehicles, workOrders } from "@/lib/mock-data";

const statusCount = (status: string) => workOrders.filter((order) => order.status === status).length;

const totalWorkshopVehicles = vehicles.length;
const waitingInspection = statusCount("بانتظار الفحص");
const waitingApproval = statusCount("بانتظار موافقة العميل");
const waitingParts = statusCount("بانتظار القطع");
const inRepair = statusCount("تحت الإصلاح");
const readyForDelivery = statusCount("جاهزة للتسليم");

const kpis = [
  {
    title: "السيارات داخل الورشة",
    value: totalWorkshopVehicles.toString(),
    note: "إجمالي اليوم",
    icon: CarFront,
    statusColor: "blue" as const,
    href: "/dashboard/vehicles",
  },
  {
    title: "بانتظار الفحص",
    value: waitingInspection.toString(),
    note: "تحتاج تقييم فني",
    icon: ClipboardCheck,
    statusColor: "gray" as const,
    href: "/dashboard/vehicle-reception",
  },
  {
    title: "بانتظار موافقة العميل",
    value: waitingApproval.toString(),
    note: "عروض أسعار مرسلة",
    icon: ShieldCheck,
    statusColor: "gray" as const,
    href: "/dashboard/work-orders",
  },
  {
    title: "بانتظار القطع",
    value: waitingParts.toString(),
    note: "طلبات توريد مفتوحة",
    icon: PackageSearch,
    statusColor: "gray" as const,
    href: "/dashboard/inventory",
  },
  {
    title: "تحت الإصلاح",
    value: inRepair.toString(),
    note: "قيد التنفيذ الآن",
    icon: Wrench,
    statusColor: "blue" as const,
    href: "/dashboard/work-orders",
  },
  {
    title: "جاهزة للتسليم",
    value: readyForDelivery.toString(),
    note: "بانتظار الاستلام",
    icon: CheckCircle2,
    statusColor: "blue" as const,
    href: "/dashboard/reports",
  },
];

export default function DashboardPage() {
  const totalInvoiceAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const totalPaidAmount = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="panel p-5 lg:col-span-2">
          <h2 className="text-base font-extrabold text-[#003B73]">توزيع حالات السيارات</h2>
          <p className="mt-2 text-sm text-[#5F6F7D]">متابعة لحظية للحالات التشغيلية داخل الورشة.</p>

          <div className="mt-5 space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-bold text-[#4F6272]">
                <span>تحت الإصلاح</span>
                <span>31%</span>
              </div>
              <div className="h-2 rounded-full bg-[#D7E0E9]">
                <div className="h-2 w-[31%] rounded-full bg-[#0057A8]" />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-bold text-[#4F6272]">
                <span>بانتظار القطع</span>
                <span>26%</span>
              </div>
              <div className="h-2 rounded-full bg-[#D7E0E9]">
                <div className="h-2 w-[26%] rounded-full bg-[#6D7E8D]" />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-bold text-[#4F6272]">
                <span>بانتظار الفحص</span>
                <span>19%</span>
              </div>
              <div className="h-2 rounded-full bg-[#D7E0E9]">
                <div className="h-2 w-[19%] rounded-full bg-[#8A98A6]" />
              </div>
            </div>
          </div>
        </article>

        <article className="panel p-5">
          <h2 className="text-base font-extrabold text-[#003B73]">تنبيهات اليوم</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-[#5F6F7D]/20 bg-[#F6F8FB] p-3 text-[#3C5060]">
              {waitingInspection} سيارات تجاوزت مدة الانتظار قبل الفحص.
            </li>
            <li className="rounded-xl border border-[#5F6F7D]/20 bg-[#F6F8FB] p-3 text-[#3C5060]">
              {waitingApproval} أوامر عمل بانتظار موافقة العملاء.
            </li>
            <li className="rounded-xl border border-[#5F6F7D]/20 bg-[#F6F8FB] p-3 text-[#3C5060]">
              {readyForDelivery} سيارات جاهزة للتسليم اليوم.
            </li>
          </ul>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="panel p-5">
          <h2 className="text-base font-extrabold text-[#003B73]">ملخص الفوترة والتحصيل</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
              <div className="mb-1 flex items-center gap-2 text-[#0057A8]">
                <ReceiptText className="h-4 w-4" />
                <p className="text-xs font-bold">إجمالي الفواتير</p>
              </div>
              <p className="text-xl font-black text-[#003B73]">{totalInvoiceAmount.toLocaleString("ar-SA")} ر.س</p>
            </div>
            <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
              <div className="mb-1 flex items-center gap-2 text-[#0057A8]">
                <CreditCard className="h-4 w-4" />
                <p className="text-xs font-bold">إجمالي المدفوع</p>
              </div>
              <p className="text-xl font-black text-[#003B73]">{totalPaidAmount.toLocaleString("ar-SA")} ر.س</p>
            </div>
          </div>
        </article>

        <article className="panel p-5">
          <h2 className="text-base font-extrabold text-[#003B73]">وصول سريع للوحدات</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Link href="/dashboard/vehicle-reception" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">استقبال المركبة</Link>
            <Link href="/dashboard/work-orders" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">أوامر الإصلاح</Link>
            <Link href="/dashboard/inventory" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">المخزون</Link>
            <Link href="/dashboard/customers" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">العملاء</Link>
            <Link href="/dashboard/suppliers" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">الموردون</Link>
            <Link href="/dashboard/invoices" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">الفواتير</Link>
            <Link href="/dashboard/payments" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">المدفوعات</Link>
            <Link href="/dashboard/reports" className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356] hover:bg-[#EEF4FB]">التقارير</Link>
          </div>
        </article>
      </div>

      <article className="panel p-5">
        <h2 className="text-base font-extrabold text-[#003B73]">مؤشرات الخدمة السريعة</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
            <p className="text-xs font-bold text-[#5F6F7D]">متوسط زمن الفحص</p>
            <p className="mt-1 text-2xl font-black text-[#003B73]">22 دقيقة</p>
          </div>
          <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
            <p className="text-xs font-bold text-[#5F6F7D]">متوسط زمن الإصلاح</p>
            <p className="mt-1 text-2xl font-black text-[#003B73]">1.8 يوم</p>
          </div>
          <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
            <p className="text-xs font-bold text-[#5F6F7D]">نسبة الإنجاز اليومية</p>
            <p className="mt-1 text-2xl font-black text-[#003B73]">87%</p>
          </div>
          <div className="rounded-xl border border-[#5F6F7D]/20 bg-white p-3">
            <p className="text-xs font-bold text-[#5F6F7D]">مواعيد التسليم الملتزمة</p>
            <p className="mt-1 text-2xl font-black text-[#003B73]">93%</p>
          </div>
        </div>
      </article>
    </section>
  );
}
