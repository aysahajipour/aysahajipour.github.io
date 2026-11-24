/* Bádgir demo: stay bar, rooms, room dialog, guest form, gallery, hero sky.
   No network. Everything is computed from the dates in the page. */
(function () {
  "use strict";

  const DAY = 24 * 60 * 60 * 1000;
  const MAX_NIGHTS = 14;
  const MAX_AHEAD_DAYS = 365;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 6;

  const num = (n) => (window.fa ? window.fa.num(n) : String(n));
  const toman = (n) => (window.fa ? window.fa.toman(n) : n + " تومان");
  const say = (msg) => {
    if (typeof window.toast === "function") window.toast(msg);
  };

  const $ = (id) => document.getElementById(id);

  /* Rooms: 5 kinds, 11 rooms in total. Prices are tomans per night. */
  const ROOMS = [
    {
      id: "hojre",
      n: 1,
      name: "حجرهٔ کاهگلی",
      tagline: "کوچک، خنک و آرام؛ مناسب دو نفر",
      desc: "اتاقی با سقف گنبدی و دیوارهای کاهگل که تابستان هم خنک می‌ماند. پنجره‌اش رو به حیاط باز می‌شود و صبح‌ها صدای آب استخر می‌آید.",
      price: 3800000,
      units: 3,
      capacity: 2,
      size: 28,
      bed: "یک تخت دونفره",
      view: "حیاط",
      amenities: ["صبحانهٔ سنتی", "کولر گازی بی‌صدا", "حمام با آب گرم", "پتوی پشمی بافت محلی", "چای‌ساز و سماور", "اینترنت پرسرعت"],
      img: "../../demos/hotel-v3.webp",
      pos: "6% 80%",
    },
    {
      id: "arsi",
      n: 2,
      name: "اتاق ارسی",
      tagline: "درهای چوبی رنگی و نور بعدازظهر",
      desc: "پنجره‌های ارسی نور را رنگی می‌کنند و روی فرش پهن می‌اندازند. اتاق یک نشیمن کوچک دارد و ایوانش رو به باغچهٔ شمشادهاست.",
      price: 4900000,
      units: 3,
      capacity: 3,
      size: 34,
      bed: "یک تخت دونفره و یک تخت تک‌نفره",
      view: "ایوان و باغچه",
      amenities: ["صبحانهٔ سنتی", "کولر گازی بی‌صدا", "نشیمن کوچک", "ایوان خصوصی", "حمام با آب گرم", "اینترنت پرسرعت"],
      img: "../../demos/hotel-v2.webp",
      pos: "92% 50%",
    },
    {
      id: "badgir",
      n: 3,
      name: "سوئیت بادگیر",
      tagline: "زیر برج باد، با هوای زنده تا صبح",
      desc: "سوئیتی درست زیر بادگیر اصلی. هوای شب از برج پایین می‌آید و بدون برق هم اتاق را خنک نگه می‌دارد. تخت رو به آسمان‌خانه است.",
      price: 6400000,
      units: 2,
      capacity: 3,
      size: 46,
      bed: "یک تخت کینگ و یک نیمکت‌تخت‌شو",
      view: "برج باد و کوه",
      amenities: ["صبحانهٔ سنتی", "تهویهٔ بادگیر", "کولر گازی بی‌صدا", "وان سنگی", "فانوس و پشتی برای ایوان", "اینترنت پرسرعت"],
      img: "../../demos/hotel-graphic.webp",
      pos: "33% 50%",
    },
    {
      id: "hayat",
      n: 4,
      name: "سوئیت حیاط",
      tagline: "یک قدم تا استخر",
      desc: "درِ این سوئیت مستقیم به حاشیهٔ استخر باز می‌شود. دو اتاق خواب جدا دارد و برای دو زوج دوست یا یک خانوادهٔ کوچک مناسب است.",
      price: 7900000,
      units: 2,
      capacity: 4,
      size: 58,
      bed: "یک تخت دونفره و دو تخت تک‌نفره",
      view: "استخر",
      amenities: ["صبحانهٔ سنتی", "دسترسی مستقیم به استخر", "دو اتاق خواب", "کولر گازی بی‌صدا", "نشیمن با فرش دست‌باف", "اینترنت پرسرعت"],
      img: "../../demos/hotel-v3.webp",
      pos: "50% 95%",
    },
    {
      id: "eyvan",
      n: 5,
      name: "خانهٔ ایوان",
      tagline: "کل یک ضلع حیاط، با ایوان خصوصی",
      desc: "بزرگ‌ترین اتاق بادگیر؛ دو طبقه، با ایوان رو به کوه و آشپزخانهٔ کوچک. برای گروه یا خانواده که می‌خواهند یک ضلع حیاط را داشته باشند.",
      price: 11500000,
      units: 1,
      capacity: 6,
      size: 92,
      bed: "سه تخت دونفره",
      view: "کوه و غروب",
      amenities: ["صبحانهٔ سنتی", "ایوان خصوصی", "آشپزخانهٔ کوچک", "سه حمام", "کولر گازی بی‌صدا", "اینترنت پرسرعت"],
      img: "../../demos/hotel-graphic.webp",
      pos: "90% 70%",
    },
  ];

  const state = {
    guests: 2,
    nights: 2,
    stay: null, // { start: Date, end: Date, nights: number } when the dates are valid
    selectedId: null,
    dialogId: null,
    booking: null,
  };

  /* ---------- Dates ---------- */

  function startOfToday() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function addDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  function toISO(date) {
    const p = (n) => String(n).padStart(2, "0");
    return date.getFullYear() + "-" + p(date.getMonth() + 1) + "-" + p(date.getDate());
  }

  function parseISO(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    if (!m) return null;
    const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (date.getMonth() !== Number(m[2]) - 1) return null;
    return date;
  }

  function nightsBetween(a, b) {
    return Math.round((b.getTime() - a.getTime()) / DAY);
  }

  let dateFormat;
  try {
    dateFormat = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    dateFormat = null;
  }

  function formatDate(date) {
    return dateFormat ? dateFormat.format(date) : date.toLocaleDateString("fa-IR");
  }

  /* Thursday and Friday nights cost 20% more. */
  function isWeekendNight(date) {
    const day = date.getDay();
    return day === 4 || day === 5;
  }

  function nightPrice(room, date) {
    return isWeekendNight(date) ? Math.round(room.price * 1.2) : room.price;
  }

  /* A stable, made-up occupancy so the same dates always show the same result. */
  function bookedOn(room, date) {
    const seed = date.getFullYear() * 400 + (date.getMonth() + 1) * 32 + date.getDate();
    const hash = Math.imul(seed ^ (room.n * 7919), 2654435761) >>> 0;
    const v = ((hash >>> 8) % 100) + (isWeekendNight(date) ? 12 : 0);
    if (v < 40) return 0;
    if (v < 70) return 1;
    if (v < 90) return 2;
    return room.units;
  }

  function evaluate(room) {
    const result = { available: false, reason: "dates", remaining: 0, total: 0, average: 0, weekendNights: 0 };
    if (!state.stay) return result;

    let remaining = room.units;
    let total = 0;
    let weekendNights = 0;
    for (let i = 0; i < state.stay.nights; i += 1) {
      const night = addDays(state.stay.start, i);
      remaining = Math.min(remaining, Math.max(0, room.units - bookedOn(room, night)));
      total += nightPrice(room, night);
      if (isWeekendNight(night)) weekendNights += 1;
    }

    result.total = total;
    result.average = Math.round(total / state.stay.nights);
    result.remaining = remaining;
    result.weekendNights = weekendNights;

    if (state.guests > room.capacity) {
      result.reason = "capacity";
    } else if (remaining <= 0) {
      result.reason = "busy";
    } else {
      result.reason = "ok";
      result.available = true;
    }
    return result;
  }

  function statusText(room, info) {
    if (info.reason === "dates") return "برای دیدن موجودی، تاریخ را انتخاب کنید";
    if (info.reason === "capacity") return "ظرفیت این اتاق " + num(room.capacity) + " نفر است";
    if (info.reason === "busy") return "برای این تاریخ‌ها پر است";
    if (info.remaining <= 2 && room.units > 1) return "فقط " + num(info.remaining) + " اتاق مانده";
    if (room.units === 1) return "آخرین اتاق خالی";
    return num(info.remaining) + " اتاق خالی";
  }

  /* ---------- DOM helper ---------- */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function listRow(dt, dd, className) {
    const row = el("div", className);
    row.append(el("dt", "", dt), el("dd", "", dd));
    return row;
  }

  /* ---------- Hero: time-of-day switch ---------- */

  const SKY_CAPTIONS = {
    dusk: "غروب: ایوان رو به کوه و آب ساکن استخر",
    blue: "گرگ‌ومیش: طاق‌های ایوان با فانوس و بادگیر",
    night: "شب: حیاط مرکزی و استخر فیروزه‌ای زیر فانوس‌ها",
  };

  function initSky() {
    const radios = document.querySelectorAll('input[name="sky"]');
    const images = document.querySelectorAll(".hero-img");
    const caption = $("sky-caption");
    const hero = document.querySelector(".hero");

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (!radio.checked) return;
        images.forEach((img) => {
          img.toggleAttribute("data-active", img.dataset.sky === radio.value);
        });
        if (hero) hero.dataset.sky = radio.value;
        if (caption) caption.textContent = SKY_CAPTIONS[radio.value] || "";
      });
    });
  }

  /* ---------- Mobile menu: base.js toggles it, here Esc closes it ---------- */

  function initNavEscape() {
    const toggle = document.querySelector("[data-nav-toggle]");
    if (!toggle) return;
    const nav = $(toggle.getAttribute("aria-controls"));
    if (!nav) return;

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return;
      toggle.setAttribute("aria-expanded", "false");
      nav.removeAttribute("data-open");
      toggle.focus();
    });
  }

  /* ---------- Stay bar ---------- */

  const checkIn = $("check-in");
  const checkOut = $("check-out");
  const stayForm = $("stay-form");
  const stayMessage = $("stay-message");
  const guestsValue = $("guests-value");
  const guestsMinus = $("guests-minus");
  const guestsPlus = $("guests-plus");

  function setMessage(text, isError) {
    stayMessage.textContent = text;
    stayMessage.toggleAttribute("data-error", Boolean(isError));
  }

  function clearInvalid() {
    checkIn.removeAttribute("aria-invalid");
    checkOut.removeAttribute("aria-invalid");
  }

  function applyDateLimits() {
    const today = startOfToday();
    const start = parseISO(checkIn.value);

    checkIn.min = toISO(today);
    checkIn.max = toISO(addDays(today, MAX_AHEAD_DAYS));

    if (start) {
      checkOut.min = toISO(addDays(start, 1));
      checkOut.max = toISO(addDays(start, MAX_NIGHTS));
    } else {
      checkOut.min = toISO(addDays(today, 1));
      checkOut.max = toISO(addDays(today, MAX_AHEAD_DAYS + MAX_NIGHTS));
    }
  }

  /* Returns { ok, message, field } and fills state.stay when the dates are fine. */
  function readStay() {
    const start = parseISO(checkIn.value);
    const end = parseISO(checkOut.value);
    const today = startOfToday();
    const last = addDays(today, MAX_AHEAD_DAYS);

    if (!start) return { ok: false, field: checkIn, message: "تاریخ ورود را انتخاب کنید." };
    if (start < today) return { ok: false, field: checkIn, message: "تاریخ ورود نمی‌تواند در گذشته باشد." };
    if (start > last) return { ok: false, field: checkIn, message: "رزرو تا یک سال آینده امکان‌پذیر است." };
    if (!end) return { ok: false, field: checkOut, message: "تاریخ خروج را انتخاب کنید." };

    const nights = nightsBetween(start, end);
    if (nights < 1) return { ok: false, field: checkOut, message: "خروج باید دست‌کم یک شب بعد از ورود باشد." };
    if (nights > MAX_NIGHTS) {
      return { ok: false, field: checkOut, message: "حداکثر " + num(MAX_NIGHTS) + " شب پشت‌سرهم می‌توانید رزرو کنید." };
    }

    return { ok: true, start, end, nights };
  }

  function refresh() {
    applyDateLimits();
    clearInvalid();
    const result = readStay();

    if (result.ok) {
      state.stay = { start: result.start, end: result.end, nights: result.nights };
      state.nights = result.nights;
      setMessage(
        "از " + formatDate(result.start) + " تا " + formatDate(result.end) + "، " + num(result.nights) + " شب و " + num(state.guests) + " مهمان.",
        false
      );
    } else {
      state.stay = null;
      result.field.setAttribute("aria-invalid", "true");
      setMessage(result.message, true);
    }

    renderRooms();
    renderTicket();
    return result;
  }

  function setGuests(value) {
    state.guests = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, value));
    guestsValue.textContent = num(state.guests);
    guestsMinus.disabled = state.guests <= MIN_GUESTS;
    guestsPlus.disabled = state.guests >= MAX_GUESTS;
  }

  function initStayBar() {
    const today = startOfToday();
    checkIn.value = toISO(addDays(today, 14));
    checkOut.value = toISO(addDays(today, 14 + state.nights));
    setGuests(state.guests);
    applyDateLimits();

    checkIn.addEventListener("change", () => {
      const start = parseISO(checkIn.value);
      const end = parseISO(checkOut.value);
      if (start) {
        const gap = end ? nightsBetween(start, end) : 0;
        if (!end || gap < 1 || gap > MAX_NIGHTS) {
          checkOut.value = toISO(addDays(start, Math.min(MAX_NIGHTS, Math.max(1, state.nights))));
        }
      }
      refresh();
    });

    checkOut.addEventListener("change", refresh);

    guestsMinus.addEventListener("click", () => {
      setGuests(state.guests - 1);
      refresh();
    });

    guestsPlus.addEventListener("click", () => {
      setGuests(state.guests + 1);
      refresh();
    });

    stayForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const result = refresh();
      if (!result.ok) {
        result.field.focus();
        return;
      }
      $("rooms").scrollIntoView();
    });
  }

  /* ---------- Rooms list ---------- */

  const roomList = $("room-list");
  const roomsCount = $("rooms-count");

  function renderRooms() {
    roomList.textContent = "";
    let freeKinds = 0;

    ROOMS.forEach((room) => {
      const info = evaluate(room);
      if (info.available) freeKinds += 1;

      const item = el("li", "room");
      item.dataset.room = room.id;
      item.dataset.available = String(info.available);

      const thumb = el("img", "room-thumb");
      thumb.src = room.img;
      thumb.alt = "";
      thumb.width = 300;
      thumb.height = 400;
      thumb.loading = "lazy";
      thumb.style.objectPosition = room.pos;

      const body = el("div", "room-body");
      const name = el("h3", "room-name", room.name);
      const meta = el(
        "p",
        "room-meta",
        num(room.size) + " متر · تا " + num(room.capacity) + " نفر · " + room.bed
      );
      const status = el("span", "room-status", statusText(room, info));
      status.dataset.state = info.reason === "ok" ? "free" : info.reason === "dates" ? "unknown" : "busy";
      body.append(name, meta, status);

      const price = el("div", "room-price num");
      if (state.stay) {
        price.append(el("span", "room-total", toman(info.total)));
        let note = num(state.stay.nights) + " شب · میانگین هر شب " + toman(info.average);
        if (info.weekendNights > 0) note += " · شامل " + num(info.weekendNights) + " شب آخر هفته";
        price.append(el("span", "room-per-night", note));
      } else {
        price.append(el("span", "room-total", "از " + toman(room.price)));
        price.append(el("span", "room-per-night", "برای هر شب"));
      }

      const actions = el("div", "room-actions");
      const details = el("button", "btn btn-quiet", "جزئیات");
      details.type = "button";
      details.dataset.details = room.id;
      const select = el("button", "btn btn-primary", "انتخاب");
      select.type = "button";
      select.dataset.select = room.id;
      select.disabled = !info.available;
      actions.append(details, select);

      item.append(thumb, body, price, actions);
      roomList.append(item);
    });

    if (!state.stay) {
      roomsCount.textContent = "تاریخ اقامت را درست وارد کنید تا قیمت و موجودی را ببینید.";
    } else if (freeKinds === 0) {
      roomsCount.textContent = "برای این تاریخ‌ها و این تعداد مهمان اتاقی خالی نیست؛ تاریخ دیگری را امتحان کنید.";
    } else {
      roomsCount.textContent =
        num(freeKinds) + " گونه اتاق از " + num(ROOMS.length) + " گونه برای " + num(state.stay.nights) + " شب و " + num(state.guests) + " مهمان خالی است.";
    }
  }

  function findRoom(id) {
    return ROOMS.find((room) => room.id === id) || null;
  }

  roomList.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest("[data-details]");
    if (detailsBtn) {
      openRoomDialog(detailsBtn.dataset.details);
      return;
    }
    const selectBtn = e.target.closest("[data-select]");
    if (selectBtn && !selectBtn.disabled) selectRoom(selectBtn.dataset.select);
  });

  /* ---------- Room dialog ---------- */

  const roomDialog = $("room-dialog");
  const dialogSelect = $("dialog-select");

  function openRoomDialog(id) {
    const room = findRoom(id);
    if (!room) return;
    state.dialogId = id;
    const info = evaluate(room);

    const img = $("dialog-img");
    img.src = room.img;
    img.alt = "";
    img.style.objectPosition = room.pos;

    $("dialog-title").textContent = room.name;
    $("dialog-tagline").textContent = room.tagline;
    $("dialog-desc").textContent = room.desc;

    const facts = $("dialog-facts");
    facts.textContent = "";
    [
      ["مساحت", num(room.size) + " متر"],
      ["ظرفیت", "تا " + num(room.capacity) + " نفر"],
      ["تخت", room.bed],
      ["چشم‌انداز", room.view],
    ].forEach((pair) => {
      const box = el("div");
      box.append(el("dt", "", pair[0]), el("dd", "", pair[1]));
      facts.append(box);
    });

    const amenities = $("dialog-amenities");
    amenities.textContent = "";
    room.amenities.forEach((text) => amenities.append(el("li", "", text)));

    const quote = $("dialog-quote");
    if (!state.stay) {
      quote.textContent = "از " + toman(room.price) + " برای هر شب. برای قیمت دقیق، تاریخ را انتخاب کنید.";
      quote.dataset.state = "unknown";
    } else if (info.reason === "capacity") {
      quote.textContent = "ظرفیت این اتاق " + num(room.capacity) + " نفر است و شما " + num(state.guests) + " مهمان انتخاب کرده‌اید.";
      quote.dataset.state = "busy";
    } else if (info.reason === "busy") {
      quote.textContent = "این اتاق برای " + num(state.stay.nights) + " شب انتخابی شما پر است.";
      quote.dataset.state = "busy";
    } else {
      quote.textContent = num(state.stay.nights) + " شب، جمع " + toman(info.total);
      quote.dataset.state = "free";
    }

    dialogSelect.disabled = !info.available;
    if (typeof roomDialog.showModal === "function") {
      if (!roomDialog.open) roomDialog.showModal();
    } else {
      roomDialog.setAttribute("open", "");
    }
  }

  function closeRoomDialog() {
    if (roomDialog.open) roomDialog.close();
  }

  function initRoomDialog() {
    $("dialog-close").addEventListener("click", closeRoomDialog);

    dialogSelect.addEventListener("click", () => {
      const id = state.dialogId;
      closeRoomDialog();
      if (id) selectRoom(id);
    });

    roomDialog.addEventListener("click", (e) => {
      if (e.target === roomDialog) closeRoomDialog();
    });

    roomDialog.addEventListener("close", () => {
      const id = state.dialogId;
      const opener = id ? roomList.querySelector('[data-details="' + id + '"]') : null;
      if (opener && !state.justSelected) opener.focus();
      state.justSelected = false;
    });
  }

  /* ---------- Selected room: ticket and guest form ---------- */

  const ticket = $("ticket");
  const guestForm = $("guest-form");
  const success = $("success");
  const submitBtn = guestForm.querySelector('button[type="submit"]');

  function currentSelection() {
    const room = findRoom(state.selectedId);
    if (!room) return null;
    return { room, info: evaluate(room) };
  }

  function renderTicket() {
    const selection = currentSelection();
    ticket.textContent = "";

    if (!selection) {
      ticket.append(
        el("p", "ticket-empty", "هنوز اتاقی انتخاب نشده. از فهرست بالا اتاق را باز کنید و «انتخاب این اتاق» را بزنید.")
      );
      return;
    }

    const room = selection.room;
    const info = selection.info;

    ticket.append(el("h3", "ticket-room", room.name));

    const list = el("dl", "ticket-list");
    if (state.stay) {
      list.append(
        listRow("ورود", formatDate(state.stay.start)),
        listRow("خروج", formatDate(state.stay.end)),
        listRow("مدت و مهمان", num(state.stay.nights) + " شب · " + num(state.guests) + " مهمان")
      );
      list.append(listRow("جمع کل", toman(info.total), "ticket-total num"));
    } else {
      list.append(listRow("تاریخ", "انتخاب نشده"));
    }
    ticket.append(list);

    let warning = "";
    if (info.reason === "dates") warning = "تاریخ اقامت معتبر نیست. آن را در بالای صفحه اصلاح کنید.";
    if (info.reason === "capacity") warning = "این اتاق برای " + num(state.guests) + " مهمان جا ندارد. اتاق دیگری انتخاب کنید یا تعداد مهمان را کم کنید.";
    if (info.reason === "busy") warning = "این اتاق برای تاریخ‌های تازه پر است. تاریخ یا اتاق را عوض کنید.";
    if (warning) {
      const note = el("p", "ticket-warning", warning);
      note.setAttribute("role", "alert");
      ticket.append(note);
    }

    submitBtn.disabled = !info.available;
  }

  function selectRoom(id) {
    const room = findRoom(id);
    if (!room) return;
    const info = evaluate(room);
    if (!info.available) {
      say("این اتاق برای تاریخ‌های انتخابی در دسترس نیست.");
      return;
    }

    state.selectedId = id;
    state.justSelected = true;
    state.booking = null;
    success.hidden = true;
    guestForm.hidden = false;
    renderTicket();
    say("«" + room.name + "» انتخاب شد.");

    const heading = $("reserve-title");
    $("reserve").scrollIntoView();
    heading.focus({ preventScroll: true });
  }

  /* ---------- Guest form validation ---------- */

  const fields = {
    name: { input: $("guest-name"), error: $("guest-name-error") },
    phone: { input: $("guest-phone"), error: $("guest-phone-error") },
    email: { input: $("guest-email"), error: $("guest-email-error") },
    arrival: { input: $("guest-arrival"), error: $("guest-arrival-error") },
    terms: { input: $("guest-terms"), error: $("guest-terms-error") },
  };

  function normalizeDigits(text) {
    return text
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
  }

  function validators() {
    return {
      name(value) {
        const clean = value.replace(/\s+/g, " ").trim();
        if (!clean) return "نام و نام خانوادگی را بنویسید.";
        if (!/^[\p{L}‌.'\-\s]+$/u.test(clean)) return "نام فقط باید شامل حروف باشد.";
        const parts = clean.split(" ").filter((part) => part.length >= 2);
        if (parts.length < 2) return "نام و نام خانوادگی را کامل بنویسید.";
        return "";
      },
      phone(value) {
        const clean = normalizeDigits(value).replace(/[\s\-()]/g, "").replace(/^(\+98|0098)/, "0");
        if (!clean) return "شمارهٔ موبایل را بنویسید.";
        if (!/^09\d{9}$/.test(clean)) return "شمارهٔ موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ بنویسید.";
        return "";
      },
      email(value) {
        const clean = value.trim();
        if (!clean) return "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) return "نشانی ایمیل درست نیست.";
        return "";
      },
      arrival(value) {
        return value ? "" : "زمان تقریبی رسیدن را انتخاب کنید.";
      },
      terms(_, input) {
        return input.checked ? "" : "برای ثبت رزرو باید قوانین لغو را بپذیرید.";
      },
    };
  }

  const rules = validators();

  function setFieldError(key, message) {
    const field = fields[key];
    field.error.textContent = message;
    if (message) field.input.setAttribute("aria-invalid", "true");
    else field.input.removeAttribute("aria-invalid");
  }

  function checkField(key) {
    const message = rules[key](fields[key].input.value, fields[key].input);
    setFieldError(key, message);
    return message === "";
  }

  function initGuestForm() {
    Object.keys(fields).forEach((key) => {
      const input = fields[key].input;
      const evt = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "blur";
      input.addEventListener(evt, () => checkField(key));
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") checkField(key);
      });
    });

    guestForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let firstInvalid = null;
      Object.keys(fields).forEach((key) => {
        if (!checkField(key) && !firstInvalid) firstInvalid = fields[key].input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        say("چند خانه نیاز به اصلاح دارد.");
        return;
      }

      const selection = currentSelection();
      if (!selection || !selection.info.available || !state.stay) {
        renderTicket();
        say("اتاق یا تاریخ انتخابی دیگر معتبر نیست.");
        return;
      }

      completeBooking(selection);
    });

    $("new-booking").addEventListener("click", resetBooking);
  }

  function completeBooking(selection) {
    const room = selection.room;
    const code = "BD-" + String(Math.floor(100000 + Math.random() * 900000));
    const name = fields.name.input.value.replace(/\s+/g, " ").trim();

    state.booking = { code, roomId: room.id };

    const codeEl = $("success-code");
    codeEl.textContent = code;
    codeEl.setAttribute("dir", "ltr");
    $("success-guest").textContent = name;
    $("success-room").textContent = room.name;
    $("success-in").textContent = formatDate(state.stay.start);
    $("success-out").textContent = formatDate(state.stay.end);
    $("success-meta").textContent = num(state.stay.nights) + " شب · " + num(state.guests) + " مهمان";
    $("success-total").textContent = toman(selection.info.total);

    guestForm.hidden = true;
    success.hidden = false;
    success.focus();
    say("رزرو نمایشی ثبت شد. کد پیگیری: " + code);
  }

  function resetBooking() {
    guestForm.reset();
    Object.keys(fields).forEach((key) => setFieldError(key, ""));
    state.selectedId = null;
    state.booking = null;
    success.hidden = true;
    guestForm.hidden = true;
    submitBtn.disabled = false;
    renderTicket();
    $("rooms").scrollIntoView();
  }

  /* ---------- Gallery and lightbox ---------- */

  const lightbox = $("lightbox");
  const lightboxImg = $("lightbox-img");
  let lightboxIndex = 0;

  function visibleGalleryButtons() {
    return Array.from(document.querySelectorAll("#gallery-grid .gallery-item:not([hidden]) .gallery-open"));
  }

  function showLightbox(index) {
    const buttons = visibleGalleryButtons();
    if (!buttons.length) return;
    lightboxIndex = (index + buttons.length) % buttons.length;
    const btn = buttons[lightboxIndex];
    const thumb = btn.querySelector("img");

    lightboxImg.src = btn.dataset.full;
    lightboxImg.width = Number(btn.dataset.w) || 1600;
    lightboxImg.height = Number(btn.dataset.h) || 900;
    lightboxImg.alt = thumb ? thumb.alt : "";
    $("lightbox-text").textContent = btn.dataset.caption || "";
    $("lightbox-count").textContent = num(lightboxIndex + 1) + " از " + num(buttons.length);
  }

  function openLightbox(btn) {
    const index = visibleGalleryButtons().indexOf(btn);
    showLightbox(index < 0 ? 0 : index);
    if (typeof lightbox.showModal === "function") {
      if (!lightbox.open) lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "");
    }
    $("lightbox-close").focus();
  }

  function initGallery() {
    const grid = $("gallery-grid");
    const filters = document.querySelectorAll(".filter[data-filter]");

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const wanted = button.dataset.filter;
        filters.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
        grid.querySelectorAll(".gallery-item").forEach((item) => {
          const tags = (item.dataset.tags || "").split(/\s+/);
          item.hidden = wanted !== "all" && !tags.includes(wanted);
        });
      });
    });

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-open");
      if (btn) openLightbox(btn);
    });

    $("lightbox-prev").addEventListener("click", () => showLightbox(lightboxIndex - 1));
    $("lightbox-next").addEventListener("click", () => showLightbox(lightboxIndex + 1));
    $("lightbox-close").addEventListener("click", () => lightbox.close());

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.close();
    });

    /* The page is right-to-left: "previous" sits on the right, so ArrowRight goes back. */
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showLightbox(lightboxIndex - 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showLightbox(lightboxIndex + 1);
      }
    });

    lightbox.addEventListener("close", () => {
      const buttons = visibleGalleryButtons();
      const opener = buttons[lightboxIndex];
      if (opener) opener.focus();
      lightboxImg.removeAttribute("src");
    });
  }

  /* ---------- Start ---------- */

  function init() {
    initSky();
    initNavEscape();
    initStayBar();
    initRoomDialog();
    initGuestForm();
    initGallery();
    refresh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
