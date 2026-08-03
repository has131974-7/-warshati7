# W7 Workshop Management System (MVP)

واجهة MVP قابلة للنقر لنظام إدارة ورشة W7 مبنية على Next.js App Router مع بيانات تجريبية Mock Data.

## التقنيات

- Next.js 16
- TypeScript
- Tailwind CSS v4
- Prisma (مجهز للبنية فقط، بدون ربط فعلي في نسخة الـMVP)

## تشغيل المشروع محليا

1. تثبيت الاعتمادات:

```bash
npm install
```

2. نسخ ملف البيئة:

```bash
cp .env.example .env
```

3. تشغيل السيرفر:

```bash
npm run dev
```

4. فتح التطبيق:

```text
http://localhost:3000
```

## التحقق قبل النشر

```bash
npm run lint
npm run build
```

## مسارات الـMVP الرئيسية

- /login
- /dashboard
- /dashboard/vehicle-reception
- /dashboard/vehicles
- /dashboard/work-orders
- /dashboard/inventory
- /dashboard/customers
- /dashboard/suppliers
- /dashboard/invoices
- /dashboard/payments
- /dashboard/reports
- /dashboard/settings

## النشر على Vercel

1. Import للمستودع داخل Vercel.
2. اضبط Root Directory إلى:

```text
frontend
```

3. Build Command:

```text
npm run build
```

4. Output (تلقائي لـ Next.js):

```text
.next
```

5. Environment Variables:

- أضف `DATABASE_URL` (يمكن تركها مثل `.env.example` في وضع التطوير التجريبي).

## ملاحظات

- النسخة الحالية Demo فقط ببيانات Mock.
- المصادقة والأمن المتقدم والربط الخلفي الحقيقي مؤجلان لمرحلة لاحقة.
