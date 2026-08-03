import Link from "next/link";
import { KeyRound, ShieldCheck, UserRound, Wrench } from "lucide-react";

const roleOptions = ["مدير الورشة", "مشرف العمليات", "فني"] as const;

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(242,140,40,0.22),transparent_24%),radial-gradient(circle_at_85%_82%,rgba(0,59,115,0.24),transparent_26%)]" />

      <div className="surface-glass relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#003B73]/20 shadow-2xl shadow-[#213547]/20 md:grid-cols-2">
        <section className="hidden bg-[#003B73] p-8 text-white md:block lg:p-10">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-[#F28C28]/20 p-2 text-[#F28C28]">
              <Wrench className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xl font-extrabold">W7 Workshop</p>
              <p className="text-sm text-[#D8E7F8]">نظام إدارة الورش الذكي</p>
            </div>
          </div>

          <h1 className="mt-12 text-4xl font-black leading-tight">
            دخول آمن
            <br />
            لإدارة أعمال الورشة
          </h1>

          <ul className="mt-10 space-y-4 text-sm text-[#D8E7F8]">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F28C28]" />
              مراقبة حالات المركبات لحظة بلحظة
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F28C28]" />
              تنظيم أوامر العمل بدقة وسرعة
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F28C28]" />
              تحسين جودة الخدمة وتجربة العميل
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-[#D8E7F8]/30 bg-[#D8E7F8]/10 p-4">
            <p className="text-xs font-bold text-[#D8E7F8]">تجهيز تسجيل الدخول حسب الصلاحيات</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[#D8E7F8]/35 bg-[#D8E7F8]/10 px-2.5 py-1 text-xs font-semibold text-[#E8F2FD]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 sm:p-8 md:p-10">
          <div className="mb-7 text-center md:text-right">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003B73] text-white md:mx-0">
              <div className="flex items-center gap-1 text-base font-black">
                <span>W7</span>
                <Wrench className="h-4 w-4 text-[#F28C28]" />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-[#003B73]">تسجيل الدخول</h2>
            <p className="mt-2 text-sm text-slate-500">أدخل بياناتك للوصول إلى لوحة إدارة ورشة W7.</p>
          </div>

          <form className="space-y-4" action="/dashboard">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">اسم المستخدم</span>
              <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3 ring-[#003B73]/25 transition focus-within:ring">
                <UserRound className="h-4 w-4 text-[#0057A8]" />
                <input
                  type="text"
                  name="username"
                  placeholder="أدخل اسم المستخدم"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">كلمة المرور</span>
              <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3 ring-[#003B73]/25 transition focus-within:ring">
                <KeyRound className="h-4 w-4 text-[#0057A8]" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  required
                />
              </div>
            </label>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-[#4F6272]">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-[#5F6F7D]/40 text-[#003B73] focus:ring-[#003B73]/30"
                />
                <span className="font-semibold">تذكرني</span>
              </label>

              <span className="text-xs font-semibold text-[#5F6F7D]">دعم الصلاحيات قريبًا: مدير، مشرف، فني</span>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#003B73] px-4 text-sm font-extrabold text-white transition hover:bg-[#004B92]"
            >
              <KeyRound className="h-4 w-4 text-[#F28C28]" />
              تسجيل الدخول
            </button>
          </form>

          <Link
            href="/dashboard"
            className="mt-4 block text-center text-sm font-semibold text-[#0057A8] underline-offset-4 hover:underline"
          >
            الدخول إلى لوحة الورشة
          </Link>
        </section>
      </div>
    </main>
  );
}
