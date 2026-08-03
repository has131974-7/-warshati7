export type WorkOrderStatus =
  | "بانتظار الفحص"
  | "بانتظار موافقة العميل"
  | "بانتظار القطع"
  | "تحت الإصلاح"
  | "جاهزة للتسليم";

export type InvoiceStatus = "مسودة" | "مصدرة" | "مدفوعة جزئيا" | "مدفوعة";

export type PaymentMethod = "نقدي" | "بطاقة" | "تحويل";

export type Customer = {
  id: string;
  name: string;
  mobile: string;
  city: string;
  vehiclesCount: number;
  balance: number;
};

export type Vehicle = {
  id: string;
  plateNumber: string;
  vin: string;
  customerName: string;
  make: string;
  model: string;
  year: number;
  color: string;
  odometer: number;
  status: WorkOrderStatus;
  repairOrderNo: string;
};

export type Technician = {
  id: string;
  name: string;
  specialty: string;
  activeOrders: number;
};

export type WorkOrder = {
  id: string;
  orderNo: string;
  vehiclePlate: string;
  customerName: string;
  technician: string;
  status: WorkOrderStatus;
  priority: "عادية" | "عالية" | "طارئة";
  estimatedDelivery: string;
  totalEstimate: number;
};

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  unitCost: number;
  supplier: string;
};

export type Supplier = {
  id: string;
  name: string;
  contactName: string;
  mobile: string;
  leadDays: number;
  pendingPOs: number;
  rating: number;
};

export type Invoice = {
  id: string;
  invoiceNo: string;
  customerName: string;
  repairOrderNo: string;
  issueDate: string;
  dueDate: string;
  total: number;
  paid: number;
  status: InvoiceStatus;
};

export type Payment = {
  id: string;
  receiptNo: string;
  invoiceNo: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  paidAt: string;
  receivedBy: string;
};

export const customers: Customer[] = [
  { id: "C-001", name: "محمد القحطاني", mobile: "0551234567", city: "الرياض", vehiclesCount: 2, balance: 850 },
  { id: "C-002", name: "سارة العتيبي", mobile: "0548899776", city: "الرياض", vehiclesCount: 1, balance: 0 },
  { id: "C-003", name: "عبدالله الشهري", mobile: "0503344556", city: "الخرج", vehiclesCount: 3, balance: 1240 },
  { id: "C-004", name: "نوف العمري", mobile: "0531002288", city: "الرياض", vehiclesCount: 1, balance: 420 },
];

export const vehicles: Vehicle[] = [
  {
    id: "V-001",
    plateNumber: "ج ب د 4821",
    vin: "JT2BG22K8V0123456",
    customerName: "محمد القحطاني",
    make: "تويوتا",
    model: "كامري",
    year: 2022,
    color: "أبيض",
    odometer: 120340,
    status: "تحت الإصلاح",
    repairOrderNo: "RO-1024",
  },
  {
    id: "V-002",
    plateNumber: "هـ و ز 7713",
    vin: "KMHD841DPDU765432",
    customerName: "سارة العتيبي",
    make: "هيونداي",
    model: "إلنترا",
    year: 2021,
    color: "رمادي",
    odometer: 87410,
    status: "بانتظار موافقة العميل",
    repairOrderNo: "RO-1025",
  },
  {
    id: "V-003",
    plateNumber: "ر س ن 3310",
    vin: "WBA3A5C55DF901122",
    customerName: "عبدالله الشهري",
    make: "بي ام دبليو",
    model: "320i",
    year: 2019,
    color: "أسود",
    odometer: 164000,
    status: "بانتظار القطع",
    repairOrderNo: "RO-1026",
  },
  {
    id: "V-004",
    plateNumber: "ل م ع 9082",
    vin: "1HGCM82633A456789",
    customerName: "نوف العمري",
    make: "هوندا",
    model: "أكورد",
    year: 2020,
    color: "أزرق",
    odometer: 101210,
    status: "جاهزة للتسليم",
    repairOrderNo: "RO-1027",
  },
];

export const technicians: Technician[] = [
  { id: "T-01", name: "فهد الغامدي", specialty: "ميكانيكا", activeOrders: 4 },
  { id: "T-02", name: "أحمد اليامي", specialty: "كهرباء سيارات", activeOrders: 3 },
  { id: "T-03", name: "راشد الحربي", specialty: "سمكرة ودهان", activeOrders: 2 },
];

export const workOrders: WorkOrder[] = [
  {
    id: "WO-01",
    orderNo: "RO-1024",
    vehiclePlate: "ج ب د 4821",
    customerName: "محمد القحطاني",
    technician: "فهد الغامدي",
    status: "تحت الإصلاح",
    priority: "عالية",
    estimatedDelivery: "2026-08-05",
    totalEstimate: 1800,
  },
  {
    id: "WO-02",
    orderNo: "RO-1025",
    vehiclePlate: "هـ و ز 7713",
    customerName: "سارة العتيبي",
    technician: "أحمد اليامي",
    status: "بانتظار موافقة العميل",
    priority: "عادية",
    estimatedDelivery: "2026-08-06",
    totalEstimate: 950,
  },
  {
    id: "WO-03",
    orderNo: "RO-1026",
    vehiclePlate: "ر س ن 3310",
    customerName: "عبدالله الشهري",
    technician: "فهد الغامدي",
    status: "بانتظار القطع",
    priority: "طارئة",
    estimatedDelivery: "2026-08-08",
    totalEstimate: 3200,
  },
  {
    id: "WO-04",
    orderNo: "RO-1027",
    vehiclePlate: "ل م ع 9082",
    customerName: "نوف العمري",
    technician: "راشد الحربي",
    status: "جاهزة للتسليم",
    priority: "عادية",
    estimatedDelivery: "2026-08-03",
    totalEstimate: 760,
  },
];

export const inventoryItems: InventoryItem[] = [
  { id: "I-001", sku: "BRK-100", name: "فحمات فرامل أمامية", category: "فرامل", quantity: 9, reorderLevel: 12, unitCost: 120, supplier: "مؤسسة قطع الغيار المتقدمة" },
  { id: "I-002", sku: "OIL-5W30", name: "زيت محرك 5W30", category: "زيوت", quantity: 44, reorderLevel: 20, unitCost: 32, supplier: "شركة زيوت الأداء" },
  { id: "I-003", sku: "FLT-220", name: "فلتر هواء", category: "فلاتر", quantity: 15, reorderLevel: 10, unitCost: 45, supplier: "مؤسسة قطع الغيار المتقدمة" },
  { id: "I-004", sku: "BAT-70", name: "بطارية 70 أمبير", category: "كهرباء", quantity: 5, reorderLevel: 8, unitCost: 280, supplier: "شركة الطاقة للبطاريات" },
];

export const suppliers: Supplier[] = [
  { id: "S-001", name: "مؤسسة قطع الغيار المتقدمة", contactName: "خالد المطيري", mobile: "0559090901", leadDays: 2, pendingPOs: 1, rating: 4.7 },
  { id: "S-002", name: "شركة زيوت الأداء", contactName: "مازن الشريف", mobile: "0507070702", leadDays: 1, pendingPOs: 0, rating: 4.9 },
  { id: "S-003", name: "شركة الطاقة للبطاريات", contactName: "وليد السبيعي", mobile: "0538080803", leadDays: 3, pendingPOs: 2, rating: 4.4 },
];

export const invoices: Invoice[] = [
  {
    id: "INV-01",
    invoiceNo: "INV-2026-001",
    customerName: "محمد القحطاني",
    repairOrderNo: "RO-1024",
    issueDate: "2026-08-03",
    dueDate: "2026-08-10",
    total: 1800,
    paid: 900,
    status: "مدفوعة جزئيا",
  },
  {
    id: "INV-02",
    invoiceNo: "INV-2026-002",
    customerName: "سارة العتيبي",
    repairOrderNo: "RO-1025",
    issueDate: "2026-08-02",
    dueDate: "2026-08-09",
    total: 950,
    paid: 0,
    status: "مصدرة",
  },
  {
    id: "INV-03",
    invoiceNo: "INV-2026-003",
    customerName: "نوف العمري",
    repairOrderNo: "RO-1027",
    issueDate: "2026-08-01",
    dueDate: "2026-08-05",
    total: 760,
    paid: 760,
    status: "مدفوعة",
  },
];

export const payments: Payment[] = [
  {
    id: "PAY-01",
    receiptNo: "RCPT-1001",
    invoiceNo: "INV-2026-001",
    customerName: "محمد القحطاني",
    amount: 900,
    method: "بطاقة",
    paidAt: "2026-08-03 10:20",
    receivedBy: "مشرف الصندوق",
  },
  {
    id: "PAY-02",
    receiptNo: "RCPT-1002",
    invoiceNo: "INV-2026-003",
    customerName: "نوف العمري",
    amount: 760,
    method: "تحويل",
    paidAt: "2026-08-01 14:12",
    receivedBy: "مشرف الصندوق",
  },
  {
    id: "PAY-03",
    receiptNo: "RCPT-1003",
    invoiceNo: "INV-2026-002",
    customerName: "سارة العتيبي",
    amount: 300,
    method: "نقدي",
    paidAt: "2026-08-03 16:05",
    receivedBy: "موظف الاستقبال",
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}
