/* بام‌نگار: demo behaviour
   Data first (plain array), then helpers, art, filters, favorites, dialog, calculator.
   Prices: `price` is in billion toman (for rentals it is the deposit), `rent` is monthly rent in million toman. */

const LISTINGS = [
  {
    id: "l-niavaran",
    deal: "buy",
    type: "villa",
    title: "ویلای دوبلکس با نمای تراورتن و استخر آینه‌ای",
    hood: "نیاوران",
    addr: "خیابان باغ‌فردوس، کوچه‌ی چهارم",
    price: 98,
    area: 620,
    rooms: 5,
    built: 1401,
    parking: 4,
    extra: [["مساحت زمین", "۹۰۰ متر"], ["سند", "تک‌برگ، شش‌دانگ"]],
    features: ["استخر آینه‌ای", "آسانسور خصوصی", "سیستم هوشمند ساختمان", "شومینه‌ی گازی", "حیاط با درختان کهن", "منظره‌ی برج میلاد و البرز"],
    sky: "dusk",
    photo: "../../demos/realestate-v2.webp",
    alt: "ویلای دوطبقه با نمای تراورتن و شیشه، استخر آینه‌ای و منظره‌ی برج میلاد در غروب"
  },
  {
    id: "l-zaferan",
    deal: "buy",
    type: "villa",
    title: "خانه‌ی سنگی با تراس شیشه‌ای و استخر بی‌انتها",
    hood: "زعفرانیه",
    addr: "بلوار مقدس اردبیلی، بن‌بست نیلوفر",
    price: 112,
    area: 740,
    rooms: 5,
    built: 1402,
    parking: 5,
    extra: [["مساحت زمین", "۱٬۱۰۰ متر"], ["سند", "تک‌برگ، شش‌دانگ"]],
    features: ["استخر بی‌انتها", "تراس شیشه‌ای رو به شهر", "سینمای خانگی", "سونا و جکوزی", "پارکینگ سرپوشیده", "نورپردازی باغ"],
    sky: "night",
    photo: "../../demos/realestate-v3.webp",
    alt: "خانه‌ی سنگی با تراس شیشه‌ای و استخر بی‌انتها که شب‌هنگام چراغ‌های شهر تهران را زیر پا دارد"
  },
  {
    id: "l-nowshahr",
    deal: "buy",
    type: "villa",
    title: "ویلای ساحلی سنگ و چوب با درختان زیتون",
    hood: "نوشهر",
    addr: "جاده‌ی ساحلی، کیلومتر ۴، شهرک ساحلی نیلگون",
    price: 46,
    area: 380,
    rooms: 4,
    built: 1400,
    parking: 2,
    extra: [["مساحت زمین", "۷۰۰ متر"], ["فاصله تا دریا", "۱۵۰ متر"]],
    features: ["استخر بی‌انتها رو به دریا", "نشیمن چوبی با سقف بلند", "باغچه‌ی زیتون", "آلاچیق و باربیکیو", "سند تک‌برگ"],
    sky: "night",
    photo: "../../demos/realestate-graphic.webp",
    alt: "ویلای سنگی و چوبی با درختان زیتون و استخر بی‌انتها رو به دریا در شب"
  },
  {
    id: "l-zaferan-apt",
    deal: "buy",
    type: "apartment",
    title: "آپارتمان ۱۸۰ متری در برج‌باغ، طبقه‌ی دهم",
    hood: "زعفرانیه",
    addr: "خیابان شهید دادمان، برج‌باغ سرو",
    price: 52,
    area: 180,
    rooms: 3,
    built: 1402,
    parking: 2,
    extra: [["طبقه", "دهم از ۱۴"], ["سند", "تک‌برگ"]],
    features: ["آسانسور اختصاصی", "لابی با نگهبان ۲۴ ساعته", "باشگاه و استخر مشترک", "انباری ۶ متری", "کابینت و کف‌پوش وارداتی"],
    sky: "dusk"
  },
  {
    id: "l-vanak-apt",
    deal: "buy",
    type: "apartment",
    title: "دو‌خوابه‌ی نوساز رو به پارک ملت",
    hood: "ونک",
    addr: "ونک‌پارک، خیابان ملاصدرا",
    price: 21,
    area: 95,
    rooms: 2,
    built: 1403,
    parking: 1,
    extra: [["طبقه", "ششم از ۸"], ["سند", "تک‌برگ"]],
    features: ["تراس ۱۰ متری", "آشپزخانه‌ی اپن", "پکیج و رادیاتور", "درب ضدسرقت", "نزدیک ایستگاه مترو"],
    sky: "day"
  },
  {
    id: "l-pasdaran-apt",
    deal: "buy",
    type: "apartment",
    title: "سه‌خوابه‌ی بازسازی‌شده، نور جنوبی",
    hood: "پاسداران",
    addr: "پاسداران، خیابان گلستان پنجم",
    price: 29.5,
    area: 140,
    rooms: 3,
    built: 1394,
    parking: 1,
    extra: [["طبقه", "سوم از ۵"], ["سند", "تک‌برگ"]],
    features: ["بازسازی کامل ۱۴۰۲", "کف سرامیک و کابینت ام‌دی‌اف", "نمای رومی", "انباری", "حیاط مشاعی"],
    sky: "day"
  },
  {
    id: "l-elahiyeh-pent",
    deal: "buy",
    type: "apartment",
    title: "پنت‌هاوس ۲۴۰ متری با تراس و جکوزی",
    hood: "الهیه",
    addr: "الهیه، خیابان دکتر شریعتی غربی",
    price: 86,
    area: 240,
    rooms: 4,
    built: 1401,
    parking: 3,
    extra: [["تراس", "۹۰ متر"], ["سند", "تک‌برگ"]],
    features: ["جکوزی روی تراس", "دو نشیمن مجزا", "آسانسور به واحد", "اتاق خواب مستر با کمد دیواری", "منظره‌ی کوه"],
    sky: "dawn"
  },
  {
    id: "l-lavasan-villa",
    deal: "buy",
    type: "villa",
    title: "باغ‌ویلای ۱٬۲۰۰ متری با چشمه‌ی دائمی",
    hood: "لواسان",
    addr: "لواسان بزرگ، جاده‌ی امامزاده‌ی هاشم",
    price: 64,
    area: 320,
    rooms: 4,
    built: 1398,
    parking: 3,
    extra: [["مساحت زمین", "۱٬۲۰۰ متر"], ["آب", "چشمه و چاه ثبت‌شده"]],
    features: ["درختان میوه‌ی بالغ", "استخر روباز", "شومینه‌ی هیزمی", "اتاق نگهبانی", "جاده‌ی آسفالت تا درب"],
    sky: "dawn"
  },
  {
    id: "l-vanak-office",
    deal: "buy",
    type: "office",
    title: "دفتر کار ۱۱۰ متری در برج اداری",
    hood: "ونک",
    addr: "میدان ونک، برج آسمان، طبقه‌ی نهم",
    price: 33,
    area: 110,
    rooms: 3,
    built: 1400,
    parking: 2,
    extra: [["کاربری", "اداری"], ["سند", "تک‌برگ"]],
    features: ["پارتیشن شیشه‌ای", "اتاق جلسات", "سیستم تهویه‌ی مرکزی", "لابی و پذیرش", "اینترنت فیبر نوری"],
    sky: "day"
  },
  {
    id: "l-lavasan-land",
    deal: "buy",
    type: "land",
    title: "زمین باغی ۸۰۰ متری با سند تک‌برگ",
    hood: "لواسان",
    addr: "لواسان کوچک، دامنه‌ی کوه",
    price: 38,
    area: 800,
    rooms: 0,
    built: null,
    parking: 0,
    extra: [["کاربری", "باغ مسکونی"], ["بر زمین", "۲۲ متر"]],
    features: ["انشعاب آب و برق", "دسترسی با جاده‌ی آسفالت", "امکان ساخت ۲۰۰ متر بنا", "شیب ملایم رو به جنوب"],
    sky: "dawn"
  },
  {
    id: "l-nowshahr-land",
    deal: "buy",
    type: "land",
    title: "زمین ۴۵۰ متری، فاز دو شهرک ساحلی",
    hood: "نوشهر",
    addr: "نوشهر، جاده‌ی کلارآباد",
    price: 17,
    area: 450,
    rooms: 0,
    built: null,
    parking: 0,
    extra: [["کاربری", "مسکونی"], ["فاصله تا دریا", "۴۰۰ متر"]],
    features: ["شهرک نگهبانی‌دار", "خیابان‌کشی و جدول‌گذاری", "گاز و برق", "پروانه‌ی ساخت صادرشده"],
    sky: "day"
  },
  {
    id: "l-pasdaran-office-rent",
    deal: "rent",
    type: "office",
    title: "دفتر کار ۸۵ متری، تمام‌شده و آماده‌ی استقرار",
    hood: "پاسداران",
    addr: "پاسداران، بالاتر از میدان صدف",
    price: 4,
    rent: 120,
    area: 85,
    rooms: 2,
    built: 1399,
    parking: 1,
    extra: [["کاربری", "اداری"], ["مدت قرارداد", "یک‌ساله"]],
    features: ["تأسیسات کامل", "اتاق مدیریت مجزا", "آبدارخانه", "نشانی ثبتی قابل استفاده"],
    sky: "day"
  },
  {
    id: "l-zaferan-rent",
    deal: "rent",
    type: "apartment",
    title: "آپارتمان لوکس ۱۳۰ متری با مبلمان",
    hood: "زعفرانیه",
    addr: "زعفرانیه، خیابان شهید بهشتی‌نیا",
    price: 8,
    rent: 150,
    area: 130,
    rooms: 2,
    built: 1401,
    parking: 2,
    extra: [["طبقه", "هفتم از ۹"], ["مدت قرارداد", "یک‌ساله"]],
    features: ["مبله‌ی کامل", "استخر و سونای مشترک", "نگهبان ۲۴ ساعته", "نورگیر شرقی و غربی"],
    sky: "dusk"
  },
  {
    id: "l-vanak-rent",
    deal: "rent",
    type: "apartment",
    title: "دو‌خوابه‌ی آفتاب‌گیر نزدیک مترو",
    hood: "ونک",
    addr: "ونک، خیابان شهید خدامی",
    price: 5,
    rent: 60,
    area: 95,
    rooms: 2,
    built: 1397,
    parking: 1,
    extra: [["طبقه", "چهارم از ۵"], ["مدت قرارداد", "یک‌ساله"]],
    features: ["آشپزخانه‌ی اپن", "کمد دیواری", "انباری", "نزدیک ایستگاه مترو"],
    sky: "night"
  },
  {
    id: "l-pasdaran-rent",
    deal: "rent",
    type: "apartment",
    title: "تک‌خوابه‌ی ۶۲ متری برای زوج جوان",
    hood: "پاسداران",
    addr: "پاسداران، خیابان بوستان نهم",
    price: 2.5,
    rent: 35,
    area: 62,
    rooms: 1,
    built: 1396,
    parking: 1,
    extra: [["طبقه", "دوم از ۴"], ["مدت قرارداد", "یک‌ساله"]],
    features: ["کف پارکت", "پکیج جدید", "درب ضدسرقت", "نزدیک پارک و کافه"],
    sky: "dawn"
  },
  {
    id: "l-lavasan-rent",
    deal: "rent",
    type: "villa",
    title: "ویلای چهارخوابه‌ی باغ‌دار برای اجاره‌ی بلندمدت",
    hood: "لواسان",
    addr: "لواسان بزرگ، کوچه‌ی بهار",
    price: 12,
    rent: 250,
    area: 350,
    rooms: 4,
    built: 1399,
    parking: 3,
    extra: [["مساحت زمین", "۶۰۰ متر"], ["مدت قرارداد", "یک‌ساله"]],
    features: ["حیاط و آلاچیق", "شومینه", "پارکینگ سرپوشیده", "گاز شهری"],
    sky: "dusk"
  }
];

const TYPE_LABEL = {
  apartment: "آپارتمان",
  villa: "ویلا و باغ",
  office: "دفتر کار",
  land: "زمین"
};

const DEAL_LABEL = { buy: "فروش", rent: "رهن و اجاره" };

/* hero dial: slide index to listing id */
const HERO_IDS = ["l-niavaran", "l-zaferan", "l-nowshahr"];

const STORE_KEY = "bamnegar:favs:v1";

/* ---------- helpers ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const nf0 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 });

const byId = (id) => LISTINGS.find((l) => l.id === id);

function toLatinDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[٬,،\s]/g, "")
    .replace(/٫/g, ".");
}

function billions(n) {
  return nf1.format(n) + " میلیارد تومان";
}

function millions(n) {
  return nf0.format(Math.round(n)) + " میلیون تومان";
}

/* money in million toman, shown in the friendliest unit */
function money(m) {
  if (m >= 1000) return nf2.format(m / 1000) + " میلیارد تومان";
  return nf1.format(m) + " میلیون تومان";
}

function priceParts(l) {
  if (l.deal === "rent") {
    return {
      label: "رهن",
      main: nf1.format(l.price),
      unit: "میلیارد تومان",
      sub: "اجاره‌ی ماهانه " + millions(l.rent)
    };
  }
  return {
    label: "قیمت کل",
    main: nf1.format(l.price),
    unit: "میلیارد تومان",
    sub: "متری " + millions((l.price * 1000) / l.area)
  };
}

function priceText(l) {
  const p = priceParts(l);
  return l.deal === "rent"
    ? "رهن " + billions(l.price) + "، اجاره‌ی ماهانه " + millions(l.rent)
    : billions(l.price) + " (" + p.sub + ")";
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- favorites (localStorage may be blocked) ---------- */

function loadFavs() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list.filter((id) => byId(id)) : []);
  } catch (err) {
    return new Set();
  }
}

function saveFavs() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(favs)));
  } catch (err) {
    /* private mode or blocked storage: favorites live for this visit only */
  }
}

const favs = loadFavs();

/* ---------- inline architectural illustrations ---------- */

const SKIES = {
  dusk: {
    top: "#44507a", bottom: "#f0a979", far: "#8a7490", near: "#5e5470", sun: "#ffd9a3",
    ground: "#4a4a5a", plot: "#66705c", wall: "#d7b99a", wall2: "#a98a73", glass: "#2c3556", lit: "#ffd596", litOn: true
  },
  day: {
    top: "#9cc0e4", bottom: "#f7efe0", far: "#b4c4d2", near: "#8fa4b8", sun: "#fff4d6",
    ground: "#b9ad94", plot: "#a9b78c", wall: "#e7dcc6", wall2: "#c7b89b", glass: "#3a5075", lit: "#bcd3ea", litOn: false
  },
  night: {
    top: "#10192e", bottom: "#3c4c7c", far: "#2a3760", near: "#1d2848", sun: "#e9edf9",
    ground: "#1b2338", plot: "#27363a", wall: "#7c829a", wall2: "#59607a", glass: "#16203a", lit: "#ffd596", litOn: true
  },
  dawn: {
    top: "#b7a6cf", bottom: "#f8d7b4", far: "#a898b5", near: "#8d7f9d", sun: "#fff0cc",
    ground: "#8b8394", plot: "#8e9a80", wall: "#d9c9c0", wall2: "#b4a4a2", glass: "#38466b", lit: "#ffe4b8", litOn: false
  }
};

function seeded(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function next() {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rect(x, y, w, h, fill, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
}

function windowFill(s, rnd, odds) {
  return s.litOn && rnd() < odds ? s.lit : s.glass;
}

function sceneApartment(s, rnd) {
  let out = "";
  out += rect(196, 48, 64, 114, s.wall2);
  for (let r = 0; r < 7; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      out += rect(204 + c * 17, 56 + r * 15, 10, 9, windowFill(s, rnd, 0.4));
    }
  }
  out += rect(98, 20, 86, 142, s.wall);
  out += rect(98, 20, 86, 5, s.wall2);
  for (let r = 0; r < 9; r += 1) {
    out += rect(94, 36 + r * 14, 94, 2, s.wall2);
    for (let c = 0; c < 4; c += 1) {
      out += rect(105 + c * 19, 40 + r * 14, 13, 8, windowFill(s, rnd, 0.5));
    }
  }
  out += rect(36, 116, 66, 46, s.wall2);
  out += rect(46, 128, 14, 34, s.glass);
  out += rect(66, 126, 28, 12, windowFill(s, rnd, 0.7));
  out += `<circle cx="276" cy="146" r="16" fill="${s.plot}"/><circle cx="24" cy="148" r="13" fill="${s.plot}"/>`;
  return out;
}

function sceneVilla(s, rnd, gid) {
  let out = "";
  out += rect(46, 108, 196, 54, s.wall);
  out += rect(92, 66, 156, 42, s.wall2);
  out += rect(86, 61, 170, 6, s.glass);
  out += rect(40, 103, 208, 6, s.glass);
  out += rect(106, 76, 116, 24, windowFill(s, rnd, 0.95), 'opacity=".95"');
  out += rect(62, 120, 128, 38, windowFill(s, rnd, 0.95), 'opacity=".95"');
  for (let i = 1; i < 5; i += 1) {
    out += rect(62 + i * 25.6, 120, 2, 38, s.wall2);
  }
  out += rect(206, 118, 28, 44, s.wall2);
  out += rect(0, 162, 320, 38, s.ground);
  out += rect(54, 170, 196, 22, `url(#${gid})`, 'rx="2"');
  out += rect(54, 168, 196, 3, s.wall);
  out += `<circle cx="276" cy="140" r="18" fill="${s.plot}"/><rect x="274" y="150" width="3" height="14" fill="${s.wall2}"/>`;
  out += `<circle cx="22" cy="146" r="14" fill="${s.plot}"/>`;
  return out;
}

function sceneOffice(s, rnd) {
  let out = "";
  out += rect(212, 40, 34, 122, s.wall2);
  out += rect(84, 22, 130, 140, s.glass);
  for (let r = 0; r < 11; r += 1) {
    out += rect(84, 28 + r * 12.4, 130, 1.6, s.wall);
    for (let c = 0; c < 5; c += 1) {
      if (s.litOn && rnd() < 0.45) {
        out += rect(90 + c * 25, 31 + r * 12.4, 20, 8, s.lit, 'opacity=".9"');
      }
    }
  }
  for (let c = 0; c < 6; c += 1) {
    out += rect(84 + c * 25.8, 22, 1.6, 140, s.wall);
  }
  out += rect(54, 138, 196, 24, s.wall);
  out += rect(70, 146, 164, 12, windowFill(s, rnd, 0.9));
  out += `<circle cx="274" cy="148" r="14" fill="${s.plot}"/>`;
  return out;
}

function sceneLand(s) {
  let out = "";
  out += `<path d="M28 196 L88 150 L258 150 L306 196 Z" fill="${s.plot}"/>`;
  out += `<path d="M28 196 L88 150 L258 150 L306 196 Z" fill="none" stroke="${s.wall}" stroke-width="2" stroke-dasharray="7 5"/>`;
  [[88, 150], [258, 150], [306, 196], [28, 196]].forEach(([x, y]) => {
    out += rect(x - 2, y - 9, 4, 11, s.wall);
  });
  out += `<circle cx="132" cy="140" r="12" fill="${s.near}"/><rect x="130" y="146" width="3" height="10" fill="${s.wall2}"/>`;
  out += `<circle cx="214" cy="136" r="15" fill="${s.near}"/><rect x="212" y="144" width="3" height="12" fill="${s.wall2}"/>`;
  out += rect(168, 164, 3, 22, s.wall2);
  out += rect(150, 156, 40, 16, s.wall);
  out += rect(155, 161, 30, 2, s.wall2);
  out += rect(155, 166, 20, 2, s.wall2);
  return out;
}

function art(l, ctx, label) {
  const s = SKIES[l.sky] || SKIES.day;
  const sky = `sky-${ctx}-${l.id}`;
  const rnd = seeded(l.id);
  const aria = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  let scene = "";
  if (l.type === "apartment") scene = sceneApartment(s, rnd);
  else if (l.type === "villa") scene = sceneVilla(s, rnd, sky + "-pool");
  else if (l.type === "office") scene = sceneOffice(s, rnd);
  else scene = sceneLand(s);

  const groundBase = l.type === "villa" ? "" : rect(0, 162, 320, 38, s.ground);
  const landBase = l.type === "land" ? rect(0, 150, 320, 50, s.ground) : "";
  return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" ${aria}>
    <defs>
      <linearGradient id="${sky}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${s.top}"/>
        <stop offset="1" stop-color="${s.bottom}"/>
      </linearGradient>
      <linearGradient id="${sky}-pool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${s.bottom}"/>
        <stop offset="1" stop-color="${s.top}"/>
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#${sky})"/>
    <circle cx="270" cy="38" r="14" fill="${s.sun}" opacity=".85"/>
    <path d="M0 128 L44 92 L84 112 L140 66 L196 108 L246 84 L320 120 V170 H0Z" fill="${s.far}"/>
    <path d="M0 146 L60 112 L120 134 L186 102 L250 130 L320 112 V170 H0Z" fill="${s.near}"/>
    ${groundBase}${landBase}${scene}
  </svg>`;
}

/* ---------- state and elements ---------- */

const form = $("#filters");
const ledger = $("#ledger");
const emptyBox = $("#empty");
const countEl = $("#result-count");
const favCountEl = $("#fav-count");
const priceInput = $("#f-price");
const priceOut = $("#f-price-out");
const priceLabel = $("#f-price-label");
const hoodSelect = $("#f-hood");
const favsOnlyBox = $("#f-favs");

const dialog = $("#detail");
const contactForm = $("#contact-form");
let lastOpener = null;
let skipFocusRestore = false;
let currentId = null;

const DEFAULT_EMPTY_TITLE = $("#empty-title").textContent;
const DEFAULT_EMPTY_TEXT = $("#empty-text").textContent;

/* ---------- filters ---------- */

function populateHoods() {
  const hoods = Array.from(new Set(LISTINGS.map((l) => l.hood))).sort((a, b) => a.localeCompare(b, "fa"));
  hoods.forEach((h) => {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h;
    hoodSelect.append(opt);
  });
}

function currentDeal() {
  const checked = form.querySelector('input[name="deal"]:checked');
  return checked ? checked.value : "buy";
}

function configureSlider() {
  if (currentDeal() === "rent") {
    priceInput.min = "1";
    priceInput.max = "40";
    priceLabel.textContent = "سقف رهن";
  } else {
    priceInput.min = "2";
    priceInput.max = "120";
    priceLabel.textContent = "سقف قیمت";
  }
  priceInput.value = priceInput.max;
}

function updatePriceOut() {
  const text = billions(Number(priceInput.value));
  priceOut.textContent = text;
  priceInput.setAttribute("aria-valuetext", text);
}

function readFilters() {
  return {
    deal: currentDeal(),
    type: $("#f-type").value,
    hood: hoodSelect.value,
    rooms: Number($("#f-rooms").value),
    maxPrice: Number(priceInput.value),
    favsOnly: favsOnlyBox.checked,
    sort: $("#f-sort").value
  };
}

function applyFilters() {
  const f = readFilters();
  const rows = LISTINGS.map((l, index) => ({ l, index })).filter(({ l }) => {
    if (l.deal !== f.deal) return false;
    if (f.type !== "all" && l.type !== f.type) return false;
    if (f.hood !== "all" && l.hood !== f.hood) return false;
    if (l.rooms < f.rooms) return false;
    if (l.price > f.maxPrice) return false;
    if (f.favsOnly && !favs.has(l.id)) return false;
    return true;
  });

  rows.sort((a, b) => {
    if (f.sort === "price-asc") return a.l.price - b.l.price || a.index - b.index;
    if (f.sort === "price-desc") return b.l.price - a.l.price || a.index - b.index;
    if (f.sort === "area-desc") return b.l.area - a.l.area || a.index - b.index;
    return a.index - b.index;
  });

  return { filters: f, items: rows.map((r) => r.l) };
}

const HEART_PATH = "M12 21s-7.5-4.6-9.5-9.2C1.1 8.5 3 5 6.4 5c2 0 3.6 1.1 5.6 3.3C14 6.1 15.6 5 17.6 5 21 5 22.9 8.5 21.5 11.8 19.5 16.4 12 21 12 21z";

function specLine(l) {
  const bits = [nf0.format(l.area) + " متر"];
  if (l.rooms > 0) bits.push(nf0.format(l.rooms) + (l.type === "office" ? " اتاق" : " خواب"));
  if (l.parking > 0) bits.push(nf0.format(l.parking) + " پارکینگ");
  if (l.built) bits.push("ساخت " + nf0.format(l.built).replace(/٬/g, ""));
  return bits;
}

function rowHtml(l) {
  const p = priceParts(l);
  const saved = favs.has(l.id);
  const thumb = l.photo
    ? `<img src="${l.photo}" alt="" width="640" height="480" loading="lazy">`
    : art(l, "card");
  const specs = specLine(l).map((b) => `<li>${esc(b)}</li>`).join("");
  return `<li class="item" data-id="${l.id}">
    <div class="item-thumb">
      ${thumb}
      <span class="tag">${DEAL_LABEL[l.deal]}</span>
    </div>
    <div class="item-info">
      <p class="item-kind">${TYPE_LABEL[l.type]} در ${esc(l.hood)}</p>
      <h3 class="item-title"><button type="button" class="item-open" data-open="${l.id}">${esc(l.title)}</button></h3>
      <p class="item-addr">${esc(l.addr)}</p>
      <ul class="item-specs num">${specs}</ul>
    </div>
    <div class="item-price">
      <p class="item-label">${p.label}</p>
      <p class="item-amount num">${p.main}<span> ${p.unit}</span></p>
      <p class="item-sub num">${esc(p.sub)}</p>
    </div>
    <button type="button" class="fav" data-fav="${l.id}" aria-pressed="${saved}" aria-label="ذخیره‌ی «${esc(l.title)}»">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART_PATH}"/></svg>
    </button>
  </li>`;
}

function updateFavCount() {
  favCountEl.textContent = "(" + nf0.format(favs.size) + ")";
}

function render() {
  const { filters, items } = applyFilters();
  ledger.innerHTML = items.map(rowHtml).join("");
  ledger.hidden = items.length === 0;
  emptyBox.hidden = items.length !== 0;

  const dealWord = filters.deal === "rent" ? "برای رهن و اجاره" : "برای خرید";
  countEl.textContent = items.length === 0
    ? "ملکی پیدا نشد"
    : nf0.format(items.length) + " ملک " + dealWord + " پیدا شد";

  if (items.length === 0) {
    const noSaved = filters.favsOnly && favs.size === 0;
    $("#empty-title").textContent = noSaved ? "هنوز ملکی ذخیره نکرده‌اید" : DEFAULT_EMPTY_TITLE;
    $("#empty-text").textContent = noSaved
      ? "با زدن قلب کنار هر ملک، آن را برای مقایسه‌ی بعدی اینجا نگه می‌داریم."
      : DEFAULT_EMPTY_TEXT;
  }
  updateFavCount();
}

function resetFilters() {
  form.reset();
  configureSlider();
  updatePriceOut();
  render();
  const first = form.querySelector('input[name="deal"]:checked');
  if (first) first.focus();
}

/* ---------- favorites toggling ---------- */

function setFavButtons(id) {
  const saved = favs.has(id);
  $$(`[data-fav="${id}"]`).forEach((btn) => btn.setAttribute("aria-pressed", String(saved)));
  if (currentId === id) syncDetailFav();
}

function toggleFav(id) {
  if (favs.has(id)) favs.delete(id);
  else favs.add(id);
  saveFavs();
  updateFavCount();
  setFavButtons(id);

  if (favsOnlyBox.checked) {
    render();
    const next = $(".fav", ledger);
    if (next) next.focus();
    else if (dialog.open) return;
    else favsOnlyBox.focus();
  }
}

function syncDetailFav() {
  const btn = $("#detail-fav");
  const saved = favs.has(currentId);
  btn.setAttribute("aria-pressed", String(saved));
  $("span", btn).textContent = saved ? "ذخیره‌شده" : "ذخیره";
}

/* ---------- detail dialog ---------- */

function openDetail(id, opener) {
  const l = byId(id);
  if (!l) return;
  currentId = id;
  lastOpener = opener || document.activeElement;

  const media = $("#detail-media");
  media.innerHTML = l.photo
    ? `<img src="${l.photo}" alt="${esc(l.alt || l.title)}" width="960" height="720">`
    : art(l, "detail", "نقاشی شماتیک " + TYPE_LABEL[l.type] + " در " + l.hood);

  $("#detail-kind").textContent = DEAL_LABEL[l.deal] + " · " + TYPE_LABEL[l.type];
  $("#detail-title").textContent = l.title;
  $("#detail-addr").textContent = l.hood + "، " + l.addr;
  $("#detail-price").textContent = priceText(l);

  const specs = [["متراژ", nf0.format(l.area) + " متر"]];
  if (l.rooms > 0) specs.push([l.type === "office" ? "تعداد اتاق" : "اتاق خواب", nf0.format(l.rooms)]);
  if (l.parking > 0) specs.push(["پارکینگ", nf0.format(l.parking)]);
  if (l.built) specs.push(["سال ساخت", nf0.format(l.built).replace(/٬/g, "")]);
  l.extra.forEach((pair) => specs.push(pair));
  $("#detail-specs").innerHTML = specs
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd class="num">${esc(v)}</dd></div>`)
    .join("");

  $("#detail-features").innerHTML = l.features.map((f) => `<li>${esc(f)}</li>`).join("");
  $("#detail-fav").dataset.fav = id;
  $("#detail-calc").hidden = l.deal === "rent";
  syncDetailFav();
  resetContact();

  document.documentElement.classList.add("modal-open");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  dialog.scrollTop = 0;
}

function closeDetail() {
  if (typeof dialog.close === "function") dialog.close();
  else {
    dialog.removeAttribute("open");
    handleClosed();
  }
}

function handleClosed() {
  document.documentElement.classList.remove("modal-open");
  if (!skipFocusRestore && lastOpener && document.contains(lastOpener)) {
    lastOpener.focus({ preventScroll: true });
  }
  skipFocusRestore = false;
  currentId = null;
}

/* ---------- contact form ---------- */

const contactFields = {
  name: { input: $("#k-name"), err: $("#k-name-err") },
  mobile: { input: $("#k-mobile"), err: $("#k-mobile-err") }
};

function validateName() {
  const value = contactFields.name.input.value.trim();
  if (!value) return "نام و نام خانوادگی را وارد کنید.";
  if (value.split(/\s+/).length < 2 || value.length < 5) return "نام و نام خانوادگی را کامل و با فاصله بنویسید.";
  return "";
}

function validateMobile() {
  const raw = contactFields.mobile.input.value.trim();
  if (!raw) return "شماره موبایل را وارد کنید.";
  if (!/^09\d{9}$/.test(toLatinDigits(raw))) {
    return "شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود، مثل ۰۹۱۲۳۴۵۶۷۸۹.";
  }
  return "";
}

const validators = { name: validateName, mobile: validateMobile };

function showFieldError(key, message) {
  const { input, err } = contactFields[key];
  err.textContent = message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function resetContact() {
  contactForm.reset();
  Object.keys(contactFields).forEach((key) => showFieldError(key, ""));
}

Object.keys(contactFields).forEach((key) => {
  const { input } = contactFields[key];
  input.addEventListener("blur", () => {
    if (input.value !== "" || input.hasAttribute("aria-invalid")) showFieldError(key, validators[key]());
  });
  input.addEventListener("input", () => {
    if (input.hasAttribute("aria-invalid")) showFieldError(key, validators[key]());
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstBad = null;
  Object.keys(contactFields).forEach((key) => {
    const message = validators[key]();
    showFieldError(key, message);
    if (message && !firstBad) firstBad = contactFields[key].input;
  });
  if (firstBad) {
    firstBad.focus();
    return;
  }
  const l = byId(currentId);
  const title = l ? l.title : "ملک";
  closeDetail();
  window.toast("درخواست بازدید برای «" + title + "» ثبت شد. مشاور به‌زودی تماس می‌گیرد.");
});

/* ---------- hero ---------- */

const heroImgs = $$("#hero-view [data-slide]");
const dialBtns = $$("#hero-view [data-dial]");
let heroIndex = 0;

function setHero(i) {
  heroIndex = i;
  heroImgs.forEach((img, n) => {
    const on = n === i;
    img.toggleAttribute("data-active", on);
    if (on) img.removeAttribute("aria-hidden");
    else img.setAttribute("aria-hidden", "true");
    if (on) img.loading = "eager";
  });
  dialBtns.forEach((btn, n) => btn.setAttribute("aria-pressed", String(n === i)));
  const l = byId(HERO_IDS[i]);
  $("#hero-title-text").textContent = l.title;
  $("#hero-price-text").textContent = " " + priceText(l);
}

dialBtns.forEach((btn) => {
  btn.addEventListener("click", () => setHero(Number(btn.dataset.dial)));
});

$("#hero-open").addEventListener("click", (e) => openDetail(HERO_IDS[heroIndex], e.currentTarget));

/* ---------- calculator ---------- */

const calcEls = {
  price: $("#c-price"),
  down: $("#c-down"),
  years: $("#c-years"),
  rate: $("#c-rate"),
  priceErr: $("#c-price-err"),
  downErr: $("#c-down-err"),
  rateErr: $("#c-rate-err"),
  yearsOut: $("#c-years-out"),
  monthly: $("#r-monthly"),
  loan: $("#r-loan"),
  total: $("#r-total"),
  interest: $("#r-interest"),
  bar: $("#r-bar")
};

function setCalcError(input, errEl, message) {
  errEl.textContent = message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function clearResults() {
  ["monthly", "loan", "total", "interest"].forEach((k) => {
    calcEls[k].textContent = "—";
  });
  calcEls.bar.style.width = "0%";
}

/* annuity: payment = L * r / (1 - (1 + r)^-n), r monthly rate, n months */
function annuity(loan, annualPercent, years) {
  const n = years * 12;
  const r = annualPercent / 100 / 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

function calculate() {
  const price = parseFloat(toLatinDigits(calcEls.price.value));
  const down = calcEls.down.value.trim() === "" ? 0 : parseFloat(toLatinDigits(calcEls.down.value));
  const rate = parseFloat(toLatinDigits(calcEls.rate.value));
  const years = Number(calcEls.years.value);
  calcEls.yearsOut.textContent = nf0.format(years) + " سال";

  const priceBad = !(price > 0);
  const downBad = Number.isNaN(down) || down < 0 || (!priceBad && down >= price);
  const rateBad = !(rate >= 0 && rate <= 100);

  setCalcError(calcEls.price, calcEls.priceErr, priceBad ? "قیمت ملک را به میلیون تومان و با عدد وارد کنید." : "");
  setCalcError(
    calcEls.down,
    calcEls.downErr,
    downBad ? "پیش‌پرداخت باید عددی کمتر از قیمت ملک باشد." : ""
  );
  setCalcError(calcEls.rate, calcEls.rateErr, rateBad ? "نرخ سود را بین ۰ تا ۱۰۰ درصد وارد کنید." : "");

  if (priceBad || downBad || rateBad) {
    clearResults();
    return;
  }

  const loan = price - down;
  const monthly = annuity(loan, rate, years);
  const total = monthly * years * 12;
  calcEls.monthly.textContent = money(monthly);
  calcEls.loan.textContent = money(loan);
  calcEls.total.textContent = money(total);
  calcEls.interest.textContent = money(total - loan);
  calcEls.bar.style.width = Math.max(0, Math.min(100, (loan / total) * 100)).toFixed(1) + "%";
}

function groupInput(input) {
  const n = parseFloat(toLatinDigits(input.value));
  if (n >= 0) input.value = nf2.format(n);
}

["price", "down", "years", "rate"].forEach((key) => calcEls[key].addEventListener("input", calculate));
calcEls.price.addEventListener("blur", () => groupInput(calcEls.price));
calcEls.down.addEventListener("blur", () => groupInput(calcEls.down));

/* ---------- wiring ---------- */

form.addEventListener("submit", (e) => e.preventDefault());

function onFilterChange(e) {
  if (e.target.name === "deal") configureSlider();
  updatePriceOut();
  render();
}

form.addEventListener("input", onFilterChange);
form.addEventListener("change", (e) => {
  if (e.target.type === "radio" || e.target.tagName === "SELECT" || e.target.type === "checkbox") onFilterChange(e);
});

$("#reset-filters").addEventListener("click", resetFilters);

ledger.addEventListener("click", (e) => {
  const heart = e.target.closest("[data-fav]");
  if (heart) {
    toggleFav(heart.dataset.fav);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) openDetail(open.dataset.open, open);
});

$("#detail-fav").addEventListener("click", () => toggleFav(currentId));
$("#detail-close").addEventListener("click", closeDetail);

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) closeDetail();
});
dialog.addEventListener("close", handleClosed);

$("#detail-calc").addEventListener("click", () => {
  const l = byId(currentId);
  if (!l) return;
  calcEls.price.value = nf0.format(l.price * 1000);
  calcEls.down.value = nf0.format(Math.round(l.price * 300));
  calculate();
  skipFocusRestore = true;
  closeDetail();
  $("#calc").scrollIntoView();
  window.toast("قیمت این ملک و پیش‌پرداخت ۳۰ درصدی در محاسبه‌گر گذاشته شد.");
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const toggle = $("[data-nav-toggle]");
  if (toggle && toggle.getAttribute("aria-expanded") === "true") {
    toggle.click();
    toggle.focus();
  }
});

populateHoods();
configureSlider();
updatePriceOut();
render();
setHero(0);
calculate();
