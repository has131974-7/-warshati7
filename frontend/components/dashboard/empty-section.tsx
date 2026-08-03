import { Construction } from "lucide-react";

type EmptySectionProps = {
  title: string;
  description: string;
};

export function EmptySection({ title, description }: EmptySectionProps) {
  return (
    <section className="panel flex min-h-[340px] flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-2xl bg-[#D7E9FF]/70 p-3 text-[#0F2747]">
        <Construction className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-[#0F2747]">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">{description}</p>
    </section>
  );
}
