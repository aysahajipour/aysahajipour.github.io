export const site = {
  name: "آیسا حاجی‌پور",
  shortName: "AYSA / DEV",
  tagline: "طراحی سایت و توسعه نرم‌افزار برای ایده‌های جدی",
  description:
    "طراحی سایت اختصاصی و وب‌اپلیکیشن با React و Next.js؛ توسعه API، اتصال هوش مصنوعی، بهینه‌سازی سرعت و سئوی فنی توسط آیسا حاجی‌پور.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  email: process.env.CONTACT_EMAIL || "aysahajipour2002@gmail.com",
  phone: "09352505353",
  github: "https://github.com/aysahajipour",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/989352505353",
};
