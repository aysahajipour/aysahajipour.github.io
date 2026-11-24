/* Clinic Susan demo: services, doctors, booking, opening hours, FAQ.
   Everything is local; nothing is sent to a server. */
(function () {
  "use strict";

  const TZ = "Asia/Tehran";

  /* ---------- Data ---------- */

  // Persian week: index 0 = Saturday ... 6 = Friday
  const WEEK = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

  const HOURS = [
    { open: 8, close: 20 },
    { open: 8, close: 20 },
    { open: 8, close: 20 },
    { open: 8, close: 20 },
    { open: 8, close: 20 },
    { open: 8, close: 14 },
    null,
  ];

  const GROUP_LABEL = { internal: "داخلی", heart: "قلب", dental: "دندانپزشکی" };

  const SERVICES = [
    { id: "s-visit", group: "internal", name: "ویزیت پزشک داخلی", minutes: 30, price: 650000,
      desc: "بررسی علائم، سابقه‌ی بیماری و داروها با وقت کافی برای پرسش." },
    { id: "s-checkup", group: "internal", name: "چکاپ سالانه", minutes: 45, price: 1400000,
      desc: "معاینه‌ی کامل، درخواست آزمایش مناسب سن و جمع‌بندی مکتوب." },
    { id: "s-diabetes", group: "internal", name: "پیگیری دیابت و فشار خون", minutes: 30, price: 600000,
      desc: "مرور قندهای ثبت‌شده، تنظیم دارو و برنامه‌ی تغذیه." },
    { id: "s-cardio", group: "heart", name: "ویزیت متخصص قلب", minutes: 30, price: 950000,
      desc: "بررسی درد قفسه‌ی سینه، تپش قلب و ارزیابی ریسک." },
    { id: "s-ecg", group: "heart", name: "نوار قلب و ویزیت", minutes: 45, price: 1250000,
      desc: "نوار قلب در همان مراجعه خوانده و گزارش همان روز تحویل می‌شود." },
    { id: "s-echo", group: "heart", name: "اکوکاردیوگرافی", minutes: 40, price: 2100000,
      desc: "تصویر‌برداری از قلب با گزارش کتبی و توضیح روی صفحه." },
    { id: "s-scale", group: "dental", name: "جرم‌گیری و بهداشت", minutes: 40, price: 900000,
      desc: "جرم‌گیری، پولیش و آموزش مسواک و نخ دندان متناسب با دهان شما." },
    { id: "s-filling", group: "dental", name: "ترمیم و پرکردگی", minutes: 45, price: 1600000,
      desc: "ترمیم پوسیدگی با کامپوزیت هم‌رنگ دندان." },
    { id: "s-laminate", group: "dental", name: "مشاوره‌ی لمینت و زیبایی", minutes: 30, price: 500000,
      desc: "بررسی لبخند، طرح پیشنهادی و برآورد هزینه پیش از هر اقدام." },
  ];

  const DOCTORS = [
    { id: "d-rahimi", name: "دکتر مریم رحیمی", role: "پزشک داخلی",
      bio: "فارغ‌التحصیل پزشکی عمومی و دوره‌ی تخصصی داخلی؛ علاقه‌مند به پیگیری بیماری‌های مزمن.",
      services: ["s-visit", "s-checkup", "s-diabetes"], days: [0, 2, 4], start: 9, end: 17 },
    { id: "d-karimi", name: "دکتر آرش کریمی", role: "متخصص قلب و عروق",
      bio: "فلوشیپ اکوکاردیوگرافی؛ سال‌ها سابقه‌ی کار در بخش مراقبت‌های قلبی.",
      services: ["s-cardio", "s-ecg", "s-echo"], days: [1, 3, 5], start: 10, end: 18 },
    { id: "d-sadeghi", name: "دکتر نیلوفر صادقی", role: "دندانپزشک ترمیمی و زیبایی",
      bio: "تمرکز بر ترمیم‌های محافظه‌کارانه و لمینت با ظاهر طبیعی.",
      services: ["s-scale", "s-filling", "s-laminate"], days: [0, 1, 3], start: 9, end: 19 },
    { id: "d-moradi", name: "دکتر پویا مرادی", role: "دندانپزشک عمومی",
      bio: "جرم‌گیری، ترمیم و درمان‌های اورژانسی دندان با رویکرد بدون درد.",
      services: ["s-scale", "s-filling"], days: [2, 4, 5], start: 8, end: 14 },
  ];

  /* ---------- Helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = (n) => new Intl.NumberFormat("fa-IR").format(n);
  const toman = (n) => fmt(n) + " تومان";
  const pad = (n) => String(n).padStart(2, "0");
  const timeLabel = (h, m) => fmt(h).padStart(1, "۰") + ":" + (m === 0 ? "۰۰" : fmt(m));

  const serviceById = (id) => SERVICES.find((s) => s.id === id);
  const doctorById = (id) => DOCTORS.find((d) => d.id === id);

  // Current Tehran time as plain numbers, independent of the visitor's clock zone.
  function tehranNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", weekday: "short",
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    const jsDay = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get("weekday")];
    return {
      year: +get("year"), month: +get("month"), day: +get("day"),
      hour: +get("hour"), minute: +get("minute"),
      weekIndex: (jsDay + 1) % 7, // Saturday = 0
    };
  }

  // A date n days after today in Tehran, as a UTC-noon Date so formatting never shifts a day.
  function tehranDatePlus(n) {
    const t = tehranNow();
    return new Date(Date.UTC(t.year, t.month - 1, t.day + n, 12));
  }

  function weekIndexOf(date) {
    return (date.getUTCDay() + 1) % 7;
  }

  const persianFormat = (opts) => new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: "UTC", ...opts });
  const fmtWeekday = persianFormat({ weekday: "long" });
  const fmtDayNumber = persianFormat({ day: "numeric" });
  const fmtMonth = persianFormat({ month: "long" });
  const fmtFull = persianFormat({ weekday: "long", day: "numeric", month: "long" });

  // Stable pseudo-random so the same slot stays taken between re-renders.
  function isTaken(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return h % 100 < 28;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Opening hours ---------- */

  function renderHoursTable() {
    const body = $("#hours-body");
    if (!body) return;
    const today = tehranNow().weekIndex;
    body.replaceChildren();
    WEEK.forEach((name, i) => {
      const row = el("tr");
      if (i === today) row.className = "is-today";
      if (!HOURS[i]) row.classList.add("is-closed");
      const th = el("th", null, name);
      th.scope = "row";
      if (i === today) th.append(" ", el("span", "today-tag", "امروز"));
      const range = HOURS[i]
        ? `${fmt(HOURS[i].open)}:۰۰ تا ${fmt(HOURS[i].close)}:۰۰`
        : "تعطیل";
      row.append(th, el("td", "num", range));
      body.append(row);
    });
  }

  function updateOpenStatus() {
    const now = tehranNow();
    const today = HOURS[now.weekIndex];
    const minutes = now.hour * 60 + now.minute;
    let state = "closed";
    let text;

    if (today && minutes >= today.open * 60 && minutes < today.close * 60) {
      state = "open";
      text = `الان باز است؛ تا ساعت ${fmt(today.close)}:۰۰ پذیرش داریم`;
    } else {
      let next = null;
      for (let step = 0; step < 8 && !next; step++) {
        const idx = (now.weekIndex + step) % 7;
        const h = HOURS[idx];
        if (!h) continue;
        if (step === 0 && minutes >= h.open * 60) continue;
        next = { step, idx, h };
      }
      if (next) {
        const when = next.step === 0 ? "امروز" : next.step === 1 ? "فردا" : WEEK[next.idx];
        text = `الان بسته است؛ ${when} از ساعت ${fmt(next.h.open)}:۰۰ باز می‌شود`;
      } else {
        text = "الان بسته است";
      }
    }

    $$("[data-open-status]").forEach((n) => (n.textContent = text));
    $$("[data-open-dot]").forEach((n) => n.setAttribute("data-state", state));
  }

  /* ---------- Services ---------- */

  const state = { group: "all", query: "" };

  function renderServices() {
    const list = $("#service-list");
    const status = $("#service-status");
    const empty = $("#service-empty");
    const q = state.query.trim();

    const items = SERVICES.filter((s) => {
      const inGroup = state.group === "all" || s.group === state.group;
      const inQuery = !q || (s.name + " " + s.desc + " " + GROUP_LABEL[s.group]).includes(q);
      return inGroup && inQuery;
    });

    list.replaceChildren(...items.map(serviceCard));
    empty.hidden = items.length > 0;
    status.textContent = items.length ? `${fmt(items.length)} خدمت نمایش داده می‌شود` : "";
  }

  function serviceCard(s) {
    const card = el("li", "service-card");
    card.dataset.group = s.group;

    const top = el("div", "service-top");
    top.append(el("span", "service-tag", GROUP_LABEL[s.group]), el("span", "service-time", `${fmt(s.minutes)} دقیقه`));

    const foot = el("div", "service-foot");
    const price = el("p", "service-price");
    price.append("از ", el("strong", "num", toman(s.price)));
    const btn = el("button", "btn btn-ghost", "رزرو");
    btn.type = "button";
    btn.dataset.pickService = s.id;
    btn.setAttribute("aria-label", `رزرو ${s.name}`);
    foot.append(price, btn);

    card.append(top, el("h3", null, s.name), el("p", "service-desc", s.desc), foot);
    return card;
  }

  function bindServiceFilters() {
    $$(".chip[data-group]").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.group = chip.dataset.group;
        $$(".chip[data-group]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        renderServices();
      });
    });
    $("#service-search").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderServices();
    });
  }

  /* ---------- Doctors ---------- */

  function nextOpenDay(doctor) {
    for (let i = 0; i < 14; i++) {
      const date = tehranDatePlus(i);
      if (doctor.days.includes(weekIndexOf(date))) {
        const slots = slotsFor(doctor, date, i === 0);
        if (slots.some((s) => !s.taken)) return date;
      }
    }
    return null;
  }

  function renderDoctors() {
    const list = $("#doctor-list");
    list.replaceChildren(
      ...DOCTORS.map((d) => {
        const card = el("li", "doctor-card");
        const initials = d.name.replace("دکتر ", "").split(" ").map((w) => w[0]).join("‌");
        const avatar = el("span", "doctor-avatar", initials);
        avatar.setAttribute("aria-hidden", "true");

        const days = el("ul", "doctor-days");
        days.setAttribute("aria-label", "روزهای حضور");
        d.days.forEach((i) => days.append(el("li", null, WEEK[i])));

        const next = nextOpenDay(d);
        const nextLine = el("p", "doctor-next");
        if (next) nextLine.append("نزدیک‌ترین نوبت: ", el("strong", null, fmtFull.format(next)));
        else nextLine.textContent = "فعلاً نوبت خالی ندارد";

        const btn = el("button", "btn btn-ghost", "رزرو با این پزشک");
        btn.type = "button";
        btn.dataset.pickDoctor = d.id;
        btn.setAttribute("aria-label", `رزرو نوبت با ${d.name}`);

        card.append(avatar, el("h3", null, d.name), el("p", "doctor-role", d.role),
          el("p", "doctor-bio", d.bio), days, nextLine, btn);
        return card;
      })
    );
  }

  /* ---------- Booking ---------- */

  const booking = { service: null, doctor: null, day: null, time: null };

  const dom = {};

  function cacheBookingDom() {
    dom.form = $("#booking-form");
    dom.service = $("#service-select");
    dom.doctorStep = $("#doctor-step");
    dom.dayStep = $("#day-step");
    dom.timeStep = $("#time-step");
    dom.doctors = $("#doctor-choices");
    dom.days = $("#day-choices");
    dom.times = $("#time-choices");
    dom.name = $("#patient-name");
    dom.phone = $("#patient-phone");
    dom.nameError = $("#name-error");
    dom.phoneError = $("#phone-error");
    dom.formError = $("#form-error");
    dom.success = $("#booking-success");
    dom.summary = $$("[data-summary]");
  }

  function fillServiceSelect() {
    Object.keys(GROUP_LABEL).forEach((group) => {
      const og = document.createElement("optgroup");
      og.label = GROUP_LABEL[group];
      SERVICES.filter((s) => s.group === group).forEach((s) => {
        const o = el("option", null, `${s.name} (از ${toman(s.price)})`);
        o.value = s.id;
        og.append(o);
      });
      dom.service.append(og);
    });
  }

  function choice(type, name, value, className, labelNodes, disabled) {
    const label = el("label", `choice ${className}`);
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    input.disabled = !!disabled;
    const card = el("span", "choice-card");
    card.append(...labelNodes);
    label.append(input, card);
    return label;
  }

  function slotsFor(doctor, date, isToday) {
    const now = tehranNow();
    const out = [];
    const closeAt = Math.min(doctor.end, HOURS[weekIndexOf(date)] ? HOURS[weekIndexOf(date)].close : doctor.end);
    for (let h = doctor.start; h < closeAt; h++) {
      for (const m of [0, 30]) {
        const key = `${doctor.id}-${date.toISOString().slice(0, 10)}-${h}:${m}`;
        const past = isToday && (h * 60 + m <= now.hour * 60 + now.minute + 30);
        out.push({ h, m, value: `${pad(h)}:${pad(m)}`, taken: past || isTaken(key) });
      }
    }
    return out;
  }

  function renderDoctorChoices() {
    dom.doctors.replaceChildren();
    const service = serviceById(booking.service);
    dom.doctorStep.disabled = !service;
    if (!service) return;
    DOCTORS.filter((d) => d.services.includes(service.id)).forEach((d) => {
      const days = d.days.map((i) => WEEK[i]).join("، ");
      dom.doctors.append(
        choice("radio", "doctor", d.id, "choice-doctor",
          [el("strong", null, d.name), el("small", null, `${d.role} · ${days}`)])
      );
    });
  }

  function renderDayChoices() {
    dom.days.replaceChildren();
    const doctor = doctorById(booking.doctor);
    dom.dayStep.disabled = !doctor;
    if (!doctor) return;
    let shown = 0;
    for (let i = 0; i < 21 && shown < 7; i++) {
      const date = tehranDatePlus(i);
      if (!doctor.days.includes(weekIndexOf(date))) continue;
      const slots = slotsFor(doctor, date, i === 0);
      const free = slots.some((s) => !s.taken);
      const iso = date.toISOString().slice(0, 10);
      const nodes = [
        el("span", "day-wd", fmtWeekday.format(date)),
        el("span", "day-no", fmtDayNumber.format(date)),
        el("span", "day-mo", fmtMonth.format(date)),
      ];
      dom.days.append(choice("radio", "day", iso, "choice-day", nodes, !free));
      shown++;
    }
  }

  function renderTimeChoices() {
    dom.times.replaceChildren();
    const doctor = doctorById(booking.doctor);
    dom.timeStep.disabled = !(doctor && booking.day);
    if (!doctor || !booking.day) return;
    const date = new Date(booking.day + "T12:00:00Z");
    const today = tehranDatePlus(0).toISOString().slice(0, 10) === booking.day;
    slotsFor(doctor, date, today).forEach((s) => {
      dom.times.append(choice("radio", "time", s.value, "choice-time", [el("span", "num", timeLabel(s.h, s.m))], s.taken));
    });
  }

  function updateSummary() {
    const service = serviceById(booking.service);
    const doctor = doctorById(booking.doctor);
    const values = {
      service: service && service.name,
      doctor: doctor && doctor.name,
      day: booking.day && fmtFull.format(new Date(booking.day + "T12:00:00Z")),
      time: booking.time && timeLabel(+booking.time.slice(0, 2), +booking.time.slice(3)),
      price: service && "از " + toman(service.price),
    };
    const placeholders = {
      service: "انتخاب نشده", doctor: "انتخاب نشده", day: "انتخاب نشده",
      time: "انتخاب نشده", price: "پس از انتخاب خدمت",
    };
    dom.summary.forEach((dd) => {
      const key = dd.dataset.summary;
      const value = values[key];
      dd.textContent = value || placeholders[key];
      if (value) dd.removeAttribute("data-empty");
      else dd.setAttribute("data-empty", "");
    });
  }

  function setService(id) {
    booking.service = id || null;
    dom.service.value = booking.service || "";
    const service = serviceById(booking.service);
    if (booking.doctor && !(service && doctorById(booking.doctor).services.includes(service.id))) {
      booking.doctor = null;
      booking.day = null;
      booking.time = null;
    }
    renderDoctorChoices();
    if (booking.doctor) {
      const radio = $(`input[name="doctor"][value="${booking.doctor}"]`, dom.doctors);
      if (radio) radio.checked = true;
    }
    renderDayChoices();
    renderTimeChoices();
    updateSummary();
  }

  function setDoctor(id) {
    booking.doctor = id;
    booking.day = null;
    booking.time = null;
    renderDayChoices();
    renderTimeChoices();
    updateSummary();
  }

  function onChoiceChange(e) {
    const input = e.target;
    if (input.name === "doctor") setDoctor(input.value);
    else if (input.name === "day") {
      booking.day = input.value;
      booking.time = null;
      renderTimeChoices();
      updateSummary();
    } else if (input.name === "time") {
      booking.time = input.value;
      updateSummary();
    }
  }

  function scrollToBooking() {
    $("#booking").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  const PHONE_RE = /^09\d{9}$/;

  // Accept Persian and Arabic digits typed on a phone keyboard.
  function normalizeDigits(value) {
    return value
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
      .replace(/\s|-/g, "");
  }

  function setFieldError(input, node, message) {
    node.textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function validate() {
    let firstInvalid = null;
    const missing = [];

    if (!booking.service) missing.push("خدمت");
    else if (!booking.doctor) missing.push("پزشک");
    else if (!booking.day) missing.push("روز");
    else if (!booking.time) missing.push("ساعت");

    const nameValue = dom.name.value.trim();
    const nameOk = nameValue.split(/\s+/).filter(Boolean).length >= 2 && nameValue.length >= 5;
    setFieldError(dom.name, dom.nameError, nameOk ? "" : "نام و نام خانوادگی را کامل بنویسید.");
    if (!nameOk) firstInvalid = dom.name;

    const phoneValue = normalizeDigits(dom.phone.value);
    const phoneOk = PHONE_RE.test(phoneValue);
    setFieldError(dom.phone, dom.phoneError,
      phoneOk ? "" : "شماره‌ی موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.");
    if (!phoneOk && !firstInvalid) firstInvalid = dom.phone;

    dom.formError.textContent = missing.length ? `ابتدا ${missing[0]} را انتخاب کنید.` : "";
    if (missing.length) {
      const stepId = { "خدمت": "service-select", "پزشک": "doctor-step", "روز": "day-step", "ساعت": "time-step" }[missing[0]];
      const target = document.getElementById(stepId);
      firstInvalid = target.matches("fieldset") ? $("input", target) : target;
    }

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function trackingCode() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const digits = String(Math.floor(1000 + Math.random() * 9000));
    return "S" + letters[Math.floor(Math.random() * letters.length)] + "-" + digits;
  }

  function submitBooking(e) {
    e.preventDefault();
    if (!validate()) return;

    const service = serviceById(booking.service);
    const doctor = doctorById(booking.doctor);
    const when = fmtFull.format(new Date(booking.day + "T12:00:00Z"));
    const time = timeLabel(+booking.time.slice(0, 2), +booking.time.slice(3));

    $("#success-text").textContent =
      `${dom.name.value.trim()} عزیز، نوبت «${service.name}» با ${doctor.name} برای ${when} ساعت ${time} ثبت شد.`;
    $("#success-code").textContent = trackingCode();

    dom.form.hidden = true;
    $(".booking-summary").hidden = true;
    dom.success.hidden = false;
    $("#success-title").focus();
    if (window.toast) window.toast("نوبت نمایشی ثبت شد");
  }

  function resetBooking() {
    dom.form.reset();
    Object.assign(booking, { service: null, doctor: null, day: null, time: null });
    [dom.name, dom.phone].forEach((i) => i.removeAttribute("aria-invalid"));
    dom.nameError.textContent = "";
    dom.phoneError.textContent = "";
    dom.formError.textContent = "";
    renderDoctorChoices();
    renderDayChoices();
    renderTimeChoices();
    updateSummary();
    dom.success.hidden = true;
    dom.form.hidden = false;
    $(".booking-summary").hidden = false;
    dom.service.focus();
  }

  function bindBooking() {
    cacheBookingDom();
    fillServiceSelect();
    renderDoctorChoices();
    renderDayChoices();
    renderTimeChoices();
    updateSummary();

    dom.service.addEventListener("change", () => setService(dom.service.value));
    dom.form.addEventListener("change", onChoiceChange);
    dom.form.addEventListener("submit", submitBooking);
    $("#booking-reset").addEventListener("click", resetBooking);
    dom.name.addEventListener("input", () => setFieldError(dom.name, dom.nameError, ""));
    dom.phone.addEventListener("input", () => setFieldError(dom.phone, dom.phoneError, ""));

    document.addEventListener("click", (e) => {
      const serviceBtn = e.target.closest("[data-pick-service]");
      if (serviceBtn) {
        setService(serviceBtn.dataset.pickService);
        scrollToBooking();
        dom.service.focus({ preventScroll: true });
        return;
      }
      const doctorBtn = e.target.closest("[data-pick-doctor]");
      if (doctorBtn) {
        const doctor = doctorById(doctorBtn.dataset.pickDoctor);
        const current = serviceById(booking.service);
        if (!current || !doctor.services.includes(current.id)) setService(doctor.services[0]);
        const radio = $(`input[name="doctor"][value="${doctor.id}"]`, dom.doctors);
        if (radio) {
          radio.checked = true;
          setDoctor(doctor.id);
        }
        scrollToBooking();
      }
    });
  }

  /* ---------- FAQ ---------- */

  function bindFaq() {
    $$(".faq-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        document.getElementById(btn.getAttribute("aria-controls")).hidden = open;
      });
    });
  }

  /* ---------- Init ---------- */

  function init() {
    renderServices();
    bindServiceFilters();
    renderDoctors();
    bindBooking();
    bindFaq();
    renderHoursTable();
    updateOpenStatus();
    setInterval(updateOpenStatus, 60 * 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
