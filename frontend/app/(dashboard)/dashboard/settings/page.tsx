"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    workshopName: "W7 Workshop",
    defaultTax: "15",
    alertBeforeDeliveryHours: "12",
    enableQrWorkflow: true,
    enableSmsNotifications: true,
  });

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <h2 className="text-2xl font-extrabold text-[#003B73]">الإعدادات</h2>
        <p className="mt-1 text-sm font-medium text-[#5F6F7D]">إعدادات أولية للبروتوتايب قبل ربطها بخدمات النظام.</p>
      </header>

      <form className="panel p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">اسم الورشة</span>
            <input
              value={settings.workshopName}
              onChange={(event) => setSettings((prev) => ({ ...prev, workshopName: event.target.value }))}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 focus:ring"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">نسبة الضريبة الافتراضية</span>
            <input
              value={settings.defaultTax}
              onChange={(event) => setSettings((prev) => ({ ...prev, defaultTax: event.target.value }))}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 focus:ring"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">تنبيه قبل التسليم (بالساعات)</span>
            <input
              value={settings.alertBeforeDeliveryHours}
              onChange={(event) => setSettings((prev) => ({ ...prev, alertBeforeDeliveryHours: event.target.value }))}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 focus:ring"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
            <input
              type="checkbox"
              checked={settings.enableQrWorkflow}
              onChange={(event) => setSettings((prev) => ({ ...prev, enableQrWorkflow: event.target.checked }))}
            />
            تفعيل تدفق QR في الاستقبال
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#3B4E5D]">
            <input
              type="checkbox"
              checked={settings.enableSmsNotifications}
              onChange={(event) => setSettings((prev) => ({ ...prev, enableSmsNotifications: event.target.checked }))}
            />
            تفعيل إشعارات الرسائل القصيرة
          </label>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#003B73] px-4 text-sm font-extrabold text-white transition hover:bg-[#004B92]"
        >
          <Save className="h-4 w-4 text-[#D8E7F8]" />
          حفظ إعدادات البروتوتايب
        </button>
      </form>
    </section>
  );
}
