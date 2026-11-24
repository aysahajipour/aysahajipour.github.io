/* ترنج: menu tabs, live open status, reservation form. No network calls. */
(function () {
  "use strict";

  const TIMEZONE = "Asia/Tehran";
  const MAX_GUESTS = 12;
  const MIN_GUESTS = 1;
  const BOOKING_WINDOW_DAYS = 60;
  const LAST_SEATING_BEFORE_CLOSE = 60; // minutes
  const SLOT_LEAD_TIME = 30; // minutes from now, for same-day bookings

  const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

  /* ---------- Content ---------- */

  const MENU = [
    {
      id: "starters",
      title: "پیش‌غذا",
      dishes: [
        { name: "کشک بادمجان", desc: "بادمجان کبابی، کشک محلی، پیازداغ، نعنادagh و گردو.", price: 285000 },
        { name: "ماست موسیر با انار", desc: "ماست آبکشی‌شده، موسیر ترشی‌شده، دانه‌ی انار و نان تافتون.", price: 185000 },
        { name: "میرزاقاسمی", desc: "بادمجان دودی، گوجه، سیر و تخم‌مرغ محلی؛ سرو با نان سنگک.", price: 245000 },
        { name: "سالاد شیرازی خرد", desc: "خیار و گوجه‌ی ریز، پیاز سفید، آب‌غوره و نعنای خشک.", price: 165000 }
      ]
    },
    {
      id: "mains",
      title: "خوراک اصلی",
      dishes: [
        { name: "ماهیچه‌ی بره با زرشک‌پلو", desc: "شش ساعت در دیگ دم‌کشیده، با ته‌دیگ زعفرانی و پسته.", price: 890000, tag: "پیشنهاد سرآشپز" },
        { name: "کوبیده‌ی گوسفندی", desc: "دو سیخ روی زغال بلوط، برنج زعفرانی، گوجه‌ی کبابی و پیاز سماق‌زده.", price: 485000 },
        { name: "شیرین‌پلوی ترنج", desc: "رشته‌های برنج زعفرانی، مروارید انار، زرشک، پسته و شیشه‌ی شکر.", price: 380000 },
        { name: "فسنجان گیلانی", desc: "مرغ در سس گردوی تفت‌داده و رب انار، کنار برنج کته.", price: 520000 },
        { name: "ته‌چین مرغ", desc: "مرغ زعفرانی، ماست و برنج، پخته در فر هیزمی تا طلایی.", price: 460000 }
      ]
    },
    {
      id: "desserts",
      title: "دسر",
      dishes: [
        { name: "فالوده‌ی شیرازی", desc: "رشته‌های نازک فالوده، یخ‌خرد، شربت گل‌سرخ و لیموی تازه.", price: 175000 },
        { name: "بستنی زعفرانی", desc: "با شیر محلی و زعفران قائنات، سرو با خامه و پسته.", price: 195000 },
        { name: "حلوای هویج و هل", desc: "گرم سرو می‌شود، با گلاب و تکه‌های بادام.", price: 165000 }
      ]
    },
    {
      id: "drinks",
      title: "نوشیدنی",
      dishes: [
        { name: "دوغ محلی", desc: "با نعنای تازه و گل‌محمدی؛ بدون گاز.", price: 75000 },
        { name: "شربت سکنجبین", desc: "سرکه، عسل و نعنا، سرد و با یخ.", price: 95000 },
        { name: "چای ذغالی", desc: "دمنوش در سماور مسی، با نبات زعفرانی.", price: 85000 },
        { name: "قهوه‌ی ترک", desc: "با هل، همراه یک تکه‌ راحت‌الحلقوم.", price: 110000 }
      ]
    }
  ];

  // Week starts on Saturday. Times are minutes from midnight; 1440 means midnight.
  const HOURS = [
    { day: "شنبه", shifts: [[720, 960], [1110, 1380]] },
    { day: "یکشنبه", shifts: [[720, 960], [1110, 1380]] },
    { day: "دوشنبه", shifts: [[720, 960], [1110, 1380]] },
    { day: "سه‌شنبه", shifts: [[720, 960], [1110, 1380]] },
    { day: "چهارشنبه", shifts: [[720, 960], [1110, 1380]] },
    { day: "پنجشنبه", shifts: [[720, 960], [1110, 1440]] },
    { day: "جمعه", shifts: [[750, 1440]] }
  ];

  const SLOT_GROUPS = [
    { name: "ناهار", times: ["12:30", "13:30", "14:30"] },
    { name: "شام", times: ["19:00", "20:00", "21:00", "22:00"] }
  ];

  const WEEKDAY_INDEX = { Sat: 0, Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6 };

  /* ---------- Helpers ---------- */

  function toFaDigits(text) {
    return String(text).replace(/\d/g, (d) => FA_DIGITS[d]);
  }

  function toLatinDigits(text) {
    return String(text)
      .replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d))
      .replace(/[٠-٩]/g, (d) => AR_DIGITS.indexOf(d));
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatMinutes(total) {
    return toFaDigits(pad(Math.floor(total / 60)) + ":" + pad(total % 60));
  }

  function timeToMinutes(value) {
    const [h, m] = value.split(":").map(Number);
    return h * 60 + m;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Current wall-clock time in Tehran, independent of the visitor's time zone.
  function getTehranNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return {
      dateKey: get("year") + "-" + get("month") + "-" + get("day"),
      weekday: WEEKDAY_INDEX[get("weekday")],
      minutes: Number(get("hour")) * 60 + Number(get("minute"))
    };
  }

  // "2026-11-22" -> Date at UTC midnight, so no time zone can shift the day.
  function parseDateKey(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }

  function formatDateKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function addDays(key, days) {
    const date = parseDateKey(key);
    date.setUTCDate(date.getUTCDate() + days);
    return formatDateKey(date);
  }

  // Saturday-first weekday index for a date key.
  function weekdayOfKey(key) {
    return (parseDateKey(key).getUTCDay() + 1) % 7;
  }

  function formatLongDate(key) {
    return new Intl.DateTimeFormat("fa-IR", {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(parseDateKey(key));
  }

  /* ---------- Menu tabs ---------- */

  function renderDish(dish) {
    const item = el("li", "dish");
    const head = el("div", "dish__head");
    head.append(el("h3", "dish__name", dish.name));
    if (dish.tag) head.append(el("span", "dish__tag", dish.tag));
    head.append(el("span", "dish__leader"));
    head.append(el("span", "dish__price num", window.fa.toman(dish.price)));
    item.append(head, el("p", "dish__desc", dish.desc));
    item.querySelector(".dish__leader").setAttribute("aria-hidden", "true");
    return item;
  }

  function renderMenu(tablist, panels) {
    MENU.forEach((category, index) => {
      const selected = index === 0;

      const tab = el("button", "tabs__tab", category.title);
      tab.type = "button";
      tab.id = "tab-" + category.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "panel-" + category.id);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tablist.append(tab);

      const panel = el("div", "tabs__panel");
      panel.id = "panel-" + category.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = !selected;
      const list = el("ul", "dishes");
      category.dishes.forEach((dish) => list.append(renderDish(dish)));
      panel.append(list);
      panels.append(panel);
    });
  }

  function initTabs() {
    const tablist = document.querySelector("[data-tablist]");
    const panels = document.querySelector("[data-panels]");
    if (!tablist || !panels) return;
    renderMenu(tablist, panels);

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
      });
      tab.focus();
    }

    tablist.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (tab) select(tab);
    });

    tablist.addEventListener("keydown", (event) => {
      const current = tabs.indexOf(document.activeElement);
      if (current === -1) return;
      // In RTL the visual "next" tab is to the left.
      const rtl = getComputedStyle(tablist).direction === "rtl";
      const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
      const prevKey = rtl ? "ArrowRight" : "ArrowLeft";
      let target = null;
      if (event.key === nextKey) target = tabs[(current + 1) % tabs.length];
      else if (event.key === prevKey) target = tabs[(current - 1 + tabs.length) % tabs.length];
      else if (event.key === "Home") target = tabs[0];
      else if (event.key === "End") target = tabs[tabs.length - 1];
      if (!target) return;
      event.preventDefault();
      select(target);
    });
  }

  /* ---------- Opening hours and live status ---------- */

  function formatShifts(shifts) {
    return shifts
      .map(([open, close]) => formatMinutes(open) + " تا " + formatMinutes(close))
      .join(" و ");
  }

  function renderHours() {
    const body = document.querySelector("[data-hours]");
    if (!body) return;
    HOURS.forEach((entry, index) => {
      const row = el("tr");
      row.dataset.day = String(index);
      row.append(el("th", "", entry.day));
      row.lastChild.scope = "row";
      row.append(el("td", "num", formatShifts(entry.shifts)));
      body.append(row);
    });
  }

  function markToday(weekday) {
    document.querySelectorAll("[data-hours] tr").forEach((row) => {
      const isToday = Number(row.dataset.day) === weekday;
      row.classList.toggle("hours__row--today", isToday);
      const badge = row.querySelector(".hours__today");
      if (isToday && !badge) {
        const mark = el("span", "hours__today", "امروز");
        row.firstChild.append(mark);
      } else if (!isToday && badge) {
        badge.remove();
      }
    });
  }

  function describeStatus(now) {
    const today = HOURS[now.weekday].shifts;
    const openShift = today.find(([open, close]) => now.minutes >= open && now.minutes < close);
    if (openShift) {
      return { state: "open", label: "اکنون باز است", detail: "تا ساعت " + formatMinutes(openShift[1]) };
    }

    const laterToday = today.find(([open]) => open > now.minutes);
    if (laterToday) {
      return { state: "closed", label: "اکنون بسته است", detail: "امروز ساعت " + formatMinutes(laterToday[0]) + " باز می‌شود" };
    }

    for (let offset = 1; offset <= 7; offset += 1) {
      const next = HOURS[(now.weekday + offset) % 7];
      const when = offset === 1 ? "فردا" : next.day;
      return { state: "closed", label: "اکنون بسته است", detail: when + " ساعت " + formatMinutes(next.shifts[0][0]) + " باز می‌شود" };
    }
    return { state: "closed", label: "اکنون بسته است", detail: "" };
  }

  function updateStatus() {
    const now = getTehranNow();
    const status = describeStatus(now);
    document.querySelectorAll("[data-status]").forEach((node) => {
      node.dataset.state = status.state;
      node.querySelector("[data-status-label]").textContent = status.label;
      node.querySelector("[data-status-detail]").textContent = status.detail;
    });
    markToday(now.weekday);
  }

  function initHours() {
    renderHours();
    updateStatus();
    setInterval(updateStatus, 30000);
  }

  /* ---------- Reservation ---------- */

  function initBooking() {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const dateInput = form.elements.date;
    const nameInput = form.elements.name;
    const phoneInput = form.elements.phone;
    const guestsOutput = form.querySelector("[data-guests]");
    const stepButtons = form.querySelectorAll("[data-step]");
    const slotsHost = form.querySelector("[data-slots]");
    const dateHint = form.querySelector("[data-date-hint]");
    const done = document.querySelector("[data-done]");
    let guests = 2;

    /* Guests stepper */

    function renderGuests() {
      guestsOutput.textContent = toFaDigits(guests) + " نفر";
      stepButtons.forEach((btn) => {
        const step = Number(btn.dataset.step);
        const blocked = (step < 0 && guests <= MIN_GUESTS) || (step > 0 && guests >= MAX_GUESTS);
        btn.setAttribute("aria-disabled", String(blocked));
      });
    }

    stepButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-disabled") === "true") return;
        guests += Number(btn.dataset.step);
        renderGuests();
      });
    });

    /* Time slots */

    function renderSlots() {
      SLOT_GROUPS.forEach((group) => {
        const row = el("div", "slots__row");
        row.append(el("span", "slots__name", group.name));
        group.times.forEach((time) => {
          const label = el("label", "slot");
          const input = el("input", "slot__input");
          input.type = "radio";
          input.name = "time";
          input.value = time;
          label.append(input, el("span", "slot__text num", toFaDigits(time)));
          row.append(label);
        });
        slotsHost.append(row);
      });
    }

    function isSlotAvailable(time, dateKey, now) {
      const start = timeToMinutes(time);
      const shifts = HOURS[weekdayOfKey(dateKey)].shifts;
      const insideShift = shifts.some(
        ([open, close]) => start >= open && start <= close - LAST_SEATING_BEFORE_CLOSE
      );
      if (!insideShift) return false;
      return dateKey !== now.dateKey || start >= now.minutes + SLOT_LEAD_TIME;
    }

    function refreshSlots() {
      const now = getTehranNow();
      const dateKey = dateInput.value;
      slotsHost.querySelectorAll(".slot__input").forEach((input) => {
        const available = !dateKey || isSlotAvailable(input.value, dateKey, now);
        input.disabled = !available;
        if (!available) input.checked = false;
      });
    }

    function refreshDateHint() {
      dateHint.textContent = dateInput.value ? formatLongDate(dateInput.value) : "";
    }

    function setDateLimits() {
      const today = getTehranNow().dateKey;
      dateInput.min = today;
      dateInput.max = addDays(today, BOOKING_WINDOW_DAYS);
    }

    // Default to today if a slot is still bookable, otherwise tomorrow.
    function setDefaultDate() {
      const now = getTehranNow();
      const todayHasSlot = SLOT_GROUPS.some((group) =>
        group.times.some((time) => isSlotAvailable(time, now.dateKey, now))
      );
      dateInput.value = todayHasSlot ? now.dateKey : addDays(now.dateKey, 1);
    }

    dateInput.addEventListener("change", () => {
      refreshDateHint();
      refreshSlots();
    });

    /* Validation */

    function normalizePhone(value) {
      return toLatinDigits(value).replace(/[\s\-()]/g, "");
    }

    const validators = {
      date() {
        const value = dateInput.value;
        if (!value) return "تاریخ رزرو را انتخاب کنید.";
        if (value < dateInput.min) return "تاریخ گذشته قابل رزرو نیست.";
        if (value > dateInput.max) return "رزرو تا " + toFaDigits(BOOKING_WINDOW_DAYS) + " روز آینده امکان‌پذیر است.";
        return "";
      },
      time() {
        return form.querySelector('input[name="time"]:checked') ? "" : "یکی از ساعت‌ها را انتخاب کنید.";
      },
      name() {
        return nameInput.value.trim().length >= 2 ? "" : "نام خود را وارد کنید.";
      },
      phone() {
        const value = normalizePhone(phoneInput.value);
        if (!value) return "شماره‌ی موبایل را وارد کنید.";
        return /^(\+98|0098|98|0)?9\d{9}$/.test(value)
          ? ""
          : "شماره‌ی موبایل معتبر نیست؛ مثال: ۰۹۱۲۳۴۵۶۷۸۹";
      }
    };

    const fields = {
      date: dateInput,
      time: slotsHost.closest("fieldset"),
      name: nameInput,
      phone: phoneInput
    };

    function showError(key, message) {
      const box = form.querySelector('[data-error="' + key + '"]');
      box.textContent = message;
      box.hidden = !message;
      const field = fields[key];
      if (key === "time") return;
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }

    function validateAll() {
      let firstInvalid = null;
      Object.keys(validators).forEach((key) => {
        const message = validators[key]();
        showError(key, message);
        if (message && !firstInvalid) {
          firstInvalid = key === "time" ? form.querySelector('input[name="time"]:not(:disabled)') : fields[key];
        }
      });
      return firstInvalid;
    }

    // Clear an error as soon as the user fixes the field.
    form.addEventListener("input", (event) => {
      const key = event.target.name;
      if (validators[key] && !form.querySelector('[data-error="' + key + '"]').hidden) {
        showError(key, validators[key]());
      }
    });

    /* Submit and success state */

    function fillSummary(data) {
      const summary = done.querySelector("[data-done-summary]");
      summary.textContent = "";
      const rows = [
        ["تاریخ", formatLongDate(data.date)],
        ["ساعت", toFaDigits(data.time)],
        ["تعداد نفرات", toFaDigits(data.guests) + " نفر"],
        ["کد پیگیری", toFaDigits(Math.floor(10000 + Math.random() * 90000))]
      ];
      rows.forEach(([term, value]) => {
        const row = el("div");
        row.append(el("dt", "", term), el("dd", "num", value));
        summary.append(row);
      });
    }

    function showSuccess(data) {
      fillSummary(data);
      done.querySelector("[data-done-text]").textContent =
        data.name.trim() + " عزیز، این فقط پیش‌نمایش روند رزرو است؛ میزی رزرو نشده و اطلاعاتی ارسال نمی‌شود.";
      form.hidden = true;
      done.hidden = false;
      done.querySelector("[data-done-title]").focus();
      window.toast("رزرو نمایشی ثبت شد");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const firstInvalid = validateAll();
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      showSuccess({
        date: dateInput.value,
        time: form.querySelector('input[name="time"]:checked').value,
        guests,
        name: nameInput.value
      });
    });

    done.querySelector("[data-reset]").addEventListener("click", () => {
      form.reset();
      guests = 2;
      setDateLimits();
      setDefaultDate();
      renderGuests();
      refreshDateHint();
      refreshSlots();
      done.hidden = true;
      form.hidden = false;
      dateInput.focus();
    });

    renderSlots();
    setDateLimits();
    setDefaultDate();
    renderGuests();
    refreshDateHint();
    refreshSlots();
  }

  /* ---------- Mobile nav: Escape closes it (toggle logic lives in base.js) ---------- */

  function initNavEscape() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.hasAttribute("data-open")) {
        toggle.click();
        toggle.focus();
      }
    });
  }

  /* ---------- Start ---------- */

  initTabs();
  initHours();
  initBooking();
  initNavEscape();
})();
