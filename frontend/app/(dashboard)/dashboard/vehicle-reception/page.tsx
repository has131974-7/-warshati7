"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CalendarDays, Camera, QrCode, Save, ScanLine, Wrench } from "lucide-react";
import { vehicles } from "@/lib/mock-data";

type ReceptionRecord = {
  plateNumber: string;
  vin: string;
  customerName: string;
  mobileNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  year: string;
  odometer: string;
  fuelLevel: string;
  color: string;
  complaintDescription: string;
  inspectionNotes: string;
  estimatedDeliveryDate: string;
};

const initialRecord: ReceptionRecord = {
  plateNumber: "",
  vin: "",
  customerName: "",
  mobileNumber: "",
  vehicleMake: "",
  vehicleModel: "",
  year: "",
  odometer: "",
  fuelLevel: "",
  color: "",
  complaintDescription: "",
  inspectionNotes: "",
  estimatedDeliveryDate: "",
};

export default function VehicleReceptionPage() {
  const [record, setRecord] = useState<ReceptionRecord>(initialRecord);
  const [scanInput, setScanInput] = useState("");
  const [generatedQr, setGeneratedQr] = useState("");
  const [savedLogs, setSavedLogs] = useState<ReceptionRecord[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const qrPayload = useMemo(() => {
    if (!record.plateNumber && !record.vin) {
      return "";
    }

    return `W7|${record.plateNumber || "NO_PLATE"}|${record.vin || "NO_VIN"}|${record.customerName || "NO_CUSTOMER"}`;
  }, [record.plateNumber, record.vin, record.customerName]);

  const updateField = <K extends keyof ReceptionRecord>(key: K, value: ReceptionRecord[K]) => {
    setRecord((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateQr = () => {
    setGeneratedQr(qrPayload || "W7|EMPTY|EMPTY|EMPTY");
  };

  const handleScanQr = () => {
    const normalized = scanInput.trim();
    if (!normalized) {
      return;
    }

    const match = vehicles.find(
      (vehicle) =>
        normalized.includes(vehicle.plateNumber) ||
        normalized.includes(vehicle.vin) ||
        normalized === vehicle.plateNumber ||
        normalized === vehicle.vin,
    );

    if (!match) {
      return;
    }

    setRecord((prev) => ({
      ...prev,
      plateNumber: match.plateNumber,
      vin: match.vin,
      customerName: match.customerName,
      vehicleMake: match.make,
      vehicleModel: match.model,
      year: String(match.year),
      odometer: String(match.odometer),
      color: match.color,
    }));
  };

  const handlePhotoButton = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prev) => [...prev, ...previews]);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedLogs((prev) => [record, ...prev].slice(0, 5));
  };

  return (
    <section className="space-y-4">
      <header className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003B73]">استقبال مركبة</h2>
            <p className="mt-1 text-sm font-medium text-[#5F6F7D]">
              تسجيل بيانات السيارة والعميل عند الدخول إلى الورشة لإنشاء مسار صيانة منظم.
            </p>
          </div>

          <div className="rounded-2xl bg-[#003B73] px-3 py-2 text-white">
            <p className="text-xs text-[#D8E7F8]">حالة الاستقبال</p>
            <p className="text-sm font-extrabold">جاهز للتسجيل</p>
          </div>
        </div>
      </header>

      <form
        className="panel p-5"
        data-db-table="vehicle_receptions"
        data-api-endpoint="/api/vehicle-receptions"
        onSubmit={handleSave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoChange}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">رقم لوحة المركبة</span>
            <input
              name="plateNumber"
              type="text"
              placeholder="مثال: أ ب ج 1234"
              value={record.plateNumber}
              onChange={(event) => updateField("plateNumber", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">رقم الهيكل VIN</span>
            <input
              name="vin"
              type="text"
              placeholder="أدخل رقم الهيكل"
              value={record.vin}
              onChange={(event) => updateField("vin", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">اسم العميل</span>
            <input
              name="customerName"
              type="text"
              placeholder="الاسم الكامل"
              value={record.customerName}
              onChange={(event) => updateField("customerName", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">رقم الجوال</span>
            <input
              name="mobileNumber"
              type="tel"
              placeholder="05XXXXXXXX"
              value={record.mobileNumber}
              onChange={(event) => updateField("mobileNumber", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">ماركة المركبة</span>
            <input
              name="vehicleMake"
              type="text"
              placeholder="مثال: تويوتا"
              value={record.vehicleMake}
              onChange={(event) => updateField("vehicleMake", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">موديل المركبة</span>
            <input
              name="vehicleModel"
              type="text"
              placeholder="مثال: كامري"
              value={record.vehicleModel}
              onChange={(event) => updateField("vehicleModel", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">سنة الصنع</span>
            <input
              name="year"
              type="number"
              min="1980"
              max="2100"
              placeholder="2022"
              value={record.year}
              onChange={(event) => updateField("year", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">عداد الكيلومترات</span>
            <input
              name="odometer"
              type="number"
              min="0"
              placeholder="120000"
              value={record.odometer}
              onChange={(event) => updateField("odometer", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">مستوى الوقود</span>
            <select
              name="fuelLevel"
              value={record.fuelLevel}
              onChange={(event) => updateField("fuelLevel", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            >
              <option value="" disabled>
                اختر مستوى الوقود
              </option>
              <option value="full">ممتلئ</option>
              <option value="threeQuarter">ثلاثة أرباع</option>
              <option value="half">نصف</option>
              <option value="quarter">ربع</option>
              <option value="low">منخفض</option>
            </select>
          </label>

          <label className="block sm:col-span-2 xl:col-span-1">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">اللون</span>
            <input
              name="color"
              type="text"
              placeholder="أبيض، أسود، رمادي..."
              value={record.color}
              onChange={(event) => updateField("color", event.target.value)}
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block sm:col-span-2 xl:col-span-3">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">وصف الشكوى</span>
            <textarea
              name="complaintDescription"
              rows={4}
              placeholder="اكتب وصف المشكلة كما ورد من العميل"
              value={record.complaintDescription}
              onChange={(event) => updateField("complaintDescription", event.target.value)}
              className="w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 py-2.5 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
              required
            />
          </label>

          <label className="block sm:col-span-2 xl:col-span-2">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">ملاحظات الفحص</span>
            <textarea
              name="inspectionNotes"
              rows={4}
              placeholder="ملاحظات الاستقبال والفحص الأولي"
              value={record.inspectionNotes}
              onChange={(event) => updateField("inspectionNotes", event.target.value)}
              className="w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 py-2.5 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
            />
          </label>

          <label className="block sm:col-span-2 xl:col-span-1">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">تاريخ التسليم المتوقع</span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-[#5F6F7D]/25 bg-white px-3 ring-[#003B73]/25 transition focus-within:ring">
              <CalendarDays className="h-4 w-4 text-[#0057A8]" />
              <input
                name="estimatedDeliveryDate"
                type="date"
                value={record.estimatedDeliveryDate}
                onChange={(event) => updateField("estimatedDeliveryDate", event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                required
              />
            </div>
          </label>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          <button
            type="button"
            data-camera-action="capture-vehicle-photos"
            onClick={handlePhotoButton}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#003B73]/25 bg-white px-3 text-sm font-bold text-[#003B73] transition hover:bg-[#E8F1FB]"
          >
            <Camera className="h-4 w-4" />
            التقاط صور المركبة
          </button>

          <button
            type="button"
            data-camera-action="scan-vehicle-qr"
            onClick={handleScanQr}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#003B73]/25 bg-white px-3 text-sm font-bold text-[#003B73] transition hover:bg-[#E8F1FB]"
          >
            <ScanLine className="h-4 w-4" />
            مسح رمز QR
          </button>

          <button
            type="button"
            data-qr-action="generate-vehicle-qr"
            onClick={handleGenerateQr}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#003B73]/25 bg-white px-3 text-sm font-bold text-[#003B73] transition hover:bg-[#E8F1FB]"
          >
            <QrCode className="h-4 w-4" />
            إنشاء رمز QR
          </button>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#003B73] px-3 text-sm font-extrabold text-white transition hover:bg-[#004B92]"
          >
            <Save className="h-4 w-4 text-[#D8E7F8]" />
            حفظ
          </button>

          <button
            type="button"
            data-action="create-repair-order"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F28C28] px-3 text-sm font-extrabold text-white transition hover:bg-[#E6801E]"
          >
            <Wrench className="h-4 w-4 text-white" />
            إنشاء أمر إصلاح
          </button>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          <label className="block xl:col-span-2">
            <span className="mb-1.5 block text-sm font-bold text-[#2D4356]">قيمة QR الممسوحة</span>
            <input
              value={scanInput}
              onChange={(event) => setScanInput(event.target.value)}
              placeholder="ألصق قيمة QR هنا ثم اضغط مسح رمز QR"
              className="h-11 w-full rounded-xl border border-[#5F6F7D]/25 bg-white px-3 text-sm outline-none ring-[#003B73]/25 transition focus:ring"
            />
          </label>

          <div className="rounded-xl border border-[#5F6F7D]/20 bg-[#F8FAFC] p-3">
            <p className="text-xs font-bold text-[#5F6F7D]">معاينة QR</p>
            <p className="mt-2 line-clamp-4 break-words text-xs text-[#2D4356]">{generatedQr || "لم يتم إنشاء QR بعد"}</p>
          </div>
        </div>

        {photoPreviews.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-bold text-[#2D4356]">صور المركبة الملتقطة</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {photoPreviews.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt={`صورة مركبة ${index + 1}`}
                  width={240}
                  height={160}
                  unoptimized
                  className="h-24 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {savedLogs.length > 0 && (
          <div className="mt-4 rounded-xl border border-[#5F6F7D]/20 bg-[#F8FAFC] p-3">
            <p className="mb-2 text-sm font-bold text-[#2D4356]">آخر عمليات حفظ الاستقبال</p>
            <ul className="space-y-1 text-xs text-[#3B4E5D]">
              {savedLogs.map((log, index) => (
                <li key={`${log.plateNumber}-${index}`}>- {log.plateNumber || "بدون لوحة"} | {log.customerName || "بدون عميل"} | {log.vehicleMake} {log.vehicleModel}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 text-xs font-medium text-[#5F6F7D]">
          تم تجهيز هذه الصفحة للربط المستقبلي مع قاعدة البيانات والكاميرا من خلال معرفات الحقول وخصائص
          التكامل المضافة في النموذج والأزرار.
        </p>
      </form>
    </section>
  );
}
