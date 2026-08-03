import Link from "next/link";
import { notFound } from "next/navigation";
import { customers, formatCurrency, vehicles } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const customer = customers.find((item) => item.id === id);

  if (!customer) {
    notFound();
  }

  const customerVehicles = vehicles.filter((vehicle) => vehicle.customerName === customer.name);

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <p className="text-xs font-bold text-[#5F6F7D]">ملف العميل</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#003B73]">{customer.name}</h2>
      </header>

      <article className="panel p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><p className="text-xs text-[#5F6F7D]">الجوال</p><p className="font-bold text-[#2D4356]">{customer.mobile}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">المدينة</p><p className="font-bold text-[#2D4356]">{customer.city}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">عدد المركبات</p><p className="font-bold text-[#2D4356]">{customer.vehiclesCount}</p></div>
          <div><p className="text-xs text-[#5F6F7D]">الرصيد</p><p className="font-bold text-[#2D4356]">{formatCurrency(customer.balance)}</p></div>
        </div>
      </article>

      <article className="panel p-5">
        <h3 className="text-base font-extrabold text-[#003B73]">مركبات العميل</h3>
        <div className="mt-3 grid gap-2">
          {customerVehicles.length > 0 ? customerVehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/dashboard/vehicles/${vehicle.id}`} className="rounded-xl border border-[#5F6F7D]/20 bg-white px-3 py-2 text-sm font-semibold text-[#2D4356]">
              {vehicle.plateNumber} - {vehicle.make} {vehicle.model}
            </Link>
          )) : <p className="text-sm text-[#5F6F7D]">لا توجد مركبات مرتبطة.</p>}
        </div>
      </article>

      <Link href="/dashboard/customers" className="inline-flex rounded-xl border border-[#5F6F7D]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D4356]">العودة للعملاء</Link>
    </section>
  );
}
