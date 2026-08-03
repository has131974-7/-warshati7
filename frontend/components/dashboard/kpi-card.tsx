import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
  statusColor: "blue" | "gray";
  href?: string;
};

export function KpiCard({ title, value, note, icon: Icon, statusColor, href }: KpiCardProps) {
  const tone =
    statusColor === "blue"
      ? {
          badge: "bg-[#D8E7F8] text-[#0057A8]",
          icon: "text-[#0057A8]",
          border: "border-[#0057A8]/18",
        }
      : {
          badge: "bg-[#E9EEF3] text-[#5F6F7D]",
          icon: "text-[#5F6F7D]",
          border: "border-[#5F6F7D]/20",
        };

  const cardContent = (
    <article
      className={`panel ${tone.border} p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#213547]/10`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#5F6F7D]">{title}</p>
        <span className={`rounded-xl p-2 ${tone.badge}`}>
          <Icon className={`h-4 w-4 ${tone.icon}`} />
        </span>
      </div>

      <p className="mt-3 text-3xl font-extrabold text-[#003B73]">{value}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${tone.badge}`}>
          <ArrowUpRight className="h-3.5 w-3.5" />
          نشط
        </span>
        <span className="text-xs font-medium text-slate-500">{note}</span>
      </div>
    </article>
  );

  if (!href) {
    return cardContent;
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}
