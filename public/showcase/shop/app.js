/* Absang demo shop: catalogue, quick view, cart drawer, checkout.
   Products are drawn as inline SVG so the grid needs no extra photos.
   Nothing is sent to a server. */
(function () {
  "use strict";

  /* ---------- Data ---------- */

  const FREE_SHIPPING_FROM = 1500000;
  const SHIPPING_FEE = 90000;
  const STORAGE_KEY = "absang-cart-v1";

  const CATEGORY_LABEL = { serum: "سرم", cream: "کرم و بالم", cleanser: "شوینده", mist: "میست و تونر" };

  const COLORS = {
    amber: { name: "کهربایی", glass: "#b9741f", glassDark: "#7f4a10" },
    smoke: { name: "دودی", glass: "#6d6a66", glassDark: "#403e3b" },
    water: { name: "آبی چشمه", glass: "#4f8f96", glassDark: "#2f5f66" },
    clear: { name: "شفاف", glass: "#d9e6e6", glassDark: "#9db6b8" },
  };

  const SIZES = [
    { ml: 30, factor: 1 },
    { ml: 50, factor: 1.55 },
    { ml: 100, factor: 2.6 },
  ];

  // shape: dropper | pump | jar | tube | spray
  const PRODUCTS = [
    { id: "p01", name: "سرم نیاسینامید ۱۰٪", cat: "serum", shape: "dropper", price: 890000, order: 12,
      blurb: "منافذ را یکدست‌تر و پوست را روشن‌تر نشان می‌دهد؛ بافتی آبکی که زود جذب می‌شود.",
      inci: "آب چشمه، نیاسینامید، زینک، عصاره‌ی بومادران", colors: ["amber", "smoke"] },
    { id: "p02", name: "سرم هیالورونیک سه‌وزنه", cat: "serum", shape: "dropper", price: 760000, order: 11,
      blurb: "سه وزن مولکولی هیالورونیک برای آبرسانی سطحی و عمیق در یک قطره.",
      inci: "آب چشمه، هیالورونیک اسید، گلیسرین، عصاره‌ی آلوئه", colors: ["water", "clear"] },
    { id: "p03", name: "سرم ویتامین C پایدار", cat: "serum", shape: "dropper", price: 1150000, order: 9,
      blurb: "شکل پایدار ویتامین C در شیشه‌ی تیره تا اثرش تا آخرین قطره حفظ شود.",
      inci: "آب چشمه، اسید اسکوربیک، فرولیک اسید، ویتامین E", colors: ["amber", "smoke"] },
    { id: "p04", name: "سرم گلیکولیک ملایم", cat: "serum", shape: "dropper", price: 980000, order: 5,
      blurb: "لایه‌بردار شبانه برای بافت صاف‌تر. دو تا سه شب در هفته کافی است.",
      inci: "آب چشمه، گلیکولیک اسید، پانتنول، عصاره‌ی بابونه", colors: ["amber", "water"] },
    { id: "p05", name: "کرم سد دفاعی سرامید", cat: "cream", shape: "jar", price: 1180000, order: 10,
      blurb: "کرم غنی برای پوست خشک و حساس؛ سرامید و کره‌ی شیا لایه‌ی محافظ را تقویت می‌کند.",
      inci: "سرامید، کره‌ی شیا، اسکوالان، روغن زیتون", colors: ["clear", "smoke"] },
    { id: "p06", name: "کرم سبک روز SPF ۳۰", cat: "cream", shape: "pump", price: 1290000, order: 8,
      blurb: "کرم روزانه با فیلتر ضدآفتاب که زیر آرایش هم سنگین نمی‌شود.",
      inci: "آب چشمه، فیلتر معدنی، نیاسینامید، عصاره‌ی چای سبز", colors: ["clear", "amber"] },
    { id: "p07", name: "بالم لب و دست", cat: "cream", shape: "tube", price: 340000, order: 7,
      blurb: "یک بالم کوچک برای کیف دستی؛ لب و دست‌های خشک را در سرما نرم نگه می‌دارد.",
      inci: "موم زنبور، کره‌ی کاکائو، روغن بادام، ویتامین E", colors: ["amber", "water"] },
    { id: "p08", name: "ماسک شبانه‌ی ترمیمی", cat: "cream", shape: "jar", price: 1420000, order: 6,
      blurb: "لایه‌ی ضخیم‌تر قبل از خواب؛ صبح پوست نرم و آرام‌تر است.",
      inci: "پپتید، پانتنول، اسکوالان، عصاره‌ی گل ختمی", colors: ["smoke", "water"] },
    { id: "p09", name: "ژل شست‌وشوی ملایم", cat: "cleanser", shape: "pump", price: 520000, order: 4,
      blurb: "کف سبک بدون خشکی بعد از شست‌وشو؛ مناسب صبح و شب.",
      inci: "آب چشمه، بتائین، گلیسرین، عصاره‌ی گشنیز", colors: ["clear", "water"] },
    { id: "p10", name: "پاک‌کننده‌ی شیری آرایش", cat: "cleanser", shape: "pump", price: 640000, order: 3,
      blurb: "آرایش و ضدآفتاب را بدون مالش زیاد برمی‌دارد؛ حس شیری و نرم.",
      inci: "آب چشمه، روغن جوجوبا، لسیتین، عصاره‌ی بابونه", colors: ["clear", "amber"] },
    { id: "p11", name: "میست گلاب و آلوئه", cat: "mist", shape: "spray", price: 450000, order: 2,
      blurb: "مه‌ی خنک برای میانه‌ی روز یا قبل از سرم؛ بوی ملایم گلاب کاشان.",
      inci: "گلاب، آلوئه‌ورا، گلیسرین، عصاره‌ی خیار", colors: ["water", "clear"] },
    { id: "p12", name: "تونر آرام‌بخش زینک", cat: "mist", shape: "spray", price: 580000, order: 1,
      blurb: "تونر آبکی برای پوست مستعد جوش؛ بدون الکل و بدون سوزش.",
      inci: "آب چشمه، زینک، پانتنول، عصاره‌ی بومادران", colors: ["smoke", "water"] },
  ];

  /* ---------- Helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const nf = new Intl.NumberFormat("fa-IR");
  const fmt = (n) => nf.format(n);
  const toman = (n) => fmt(n) + " تومان";
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const sizeByMl = (ml) => SIZES.find((s) => s.ml === ml);

  function priceFor(product, ml) {
    return Math.round((product.price * sizeByMl(ml).factor) / 1000) * 1000;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function normalizeDigits(value) {
    return value
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
      .replace(/[\s-]/g, "");
  }

  function reducedMotion() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------- Product illustration ---------- */

  const TILE_BACKGROUNDS = ["#d9c2a0", "#c9d6d2", "#e0d4c2", "#bfcfc9", "#d6c7b3", "#cfd9d3"];

  function bodyShape(shape, c) {
    const glass = `fill="${c.glass}"`;
    const dark = `fill="${c.glassDark}"`;
    const cap = 'fill="#1d130c"';
    switch (shape) {
      case "dropper":
        return `
          <rect x="68" y="30" width="24" height="26" rx="12" ${cap}/>
          <rect x="72" y="52" width="16" height="12" ${cap}/>
          <rect x="52" y="64" width="56" height="86" rx="10" ${glass}/>
          <rect x="52" y="64" width="12" height="86" rx="6" fill="#fff" fill-opacity=".22"/>
          <rect x="52" y="104" width="56" height="30" ${dark} fill-opacity=".25"/>`;
      case "pump":
        return `
          <rect x="74" y="20" width="12" height="14" ${cap}/>
          <path d="M60 22h36v8H60z" ${cap}/>
          <rect x="77" y="34" width="6" height="22" ${cap}/>
          <rect x="52" y="56" width="56" height="94" rx="12" ${glass}/>
          <rect x="52" y="56" width="12" height="94" rx="6" fill="#fff" fill-opacity=".22"/>
          <rect x="52" y="96" width="56" height="34" ${dark} fill-opacity=".25"/>`;
      case "jar":
        return `
          <rect x="38" y="76" width="84" height="26" rx="6" ${cap}/>
          <rect x="42" y="102" width="76" height="48" rx="12" ${glass}/>
          <rect x="42" y="102" width="12" height="48" rx="6" fill="#fff" fill-opacity=".22"/>`;
      case "tube":
        return `
          <path d="M56 40h48l-6 100H62z" ${glass}/>
          <rect x="52" y="30" width="56" height="14" rx="3" ${cap}/>
          <path d="M60 140h40v8H60z" ${dark}/>`;
      default: // spray
        return `
          <rect x="70" y="22" width="20" height="12" rx="3" ${cap}/>
          <rect x="62" y="34" width="36" height="18" rx="4" ${cap}/>
          <rect x="54" y="52" width="52" height="98" rx="14" ${glass}/>
          <rect x="54" y="52" width="12" height="98" rx="6" fill="#fff" fill-opacity=".22"/>
          <rect x="54" y="98" width="52" height="30" ${dark} fill-opacity=".25"/>`;
    }
  }

  function productSvg(product, colorKey, label) {
    const c = COLORS[colorKey];
    const n = Number(product.id.slice(1));
    const bg = TILE_BACKGROUNDS[n % TILE_BACKGROUNDS.length];
    const aria = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
    return `<svg viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice" ${aria}>
      <rect width="160" height="200" fill="${bg}"/>
      <rect width="160" height="200" fill="url(#pores)"/>
      <ellipse cx="80" cy="156" rx="46" ry="7" fill="#000" fill-opacity=".18"/>
      <rect y="150" width="160" height="50" fill="#000" fill-opacity=".07"/>
      ${bodyShape(product.shape, c)}
      <rect x="62" y="${product.shape === "jar" ? 112 : 108}" width="36" height="22" rx="2" fill="#f7f2e8" fill-opacity=".92"/>
      <rect x="67" y="${product.shape === "jar" ? 118 : 114}" width="26" height="2.5" fill="#2a1a10"/>
      <rect x="67" y="${product.shape === "jar" ? 124 : 120}" width="18" height="2" fill="#2a1a10" fill-opacity=".5"/>
    </svg>`;
  }

  /* ---------- Catalogue ---------- */

  const state = { cat: "all", query: "", sort: "new" };
  const dom = {};

  function visibleProducts() {
    const q = state.query.trim();
    const items = PRODUCTS.filter((p) => {
      const inCat = state.cat === "all" || p.cat === state.cat;
      const inQuery = !q || (p.name + " " + p.blurb + " " + p.inci + " " + CATEGORY_LABEL[p.cat]).includes(q);
      return inCat && inQuery;
    });
    const sorters = {
      new: (a, b) => b.order - a.order,
      asc: (a, b) => a.price - b.price,
      desc: (a, b) => b.price - a.price,
    };
    return items.sort(sorters[state.sort]);
  }

  function renderGrid() {
    const items = visibleProducts();
    dom.grid.replaceChildren(...items.map(productCard));
    dom.noResults.hidden = items.length > 0;
    dom.count.textContent = items.length ? `${fmt(items.length)} محصول` : "";
  }

  function productCard(p) {
    const li = el("li", "product");
    li.dataset.cat = p.cat;

    const open = el("button", "product__open");
    open.type = "button";
    open.dataset.open = p.id;
    open.setAttribute("aria-label", `نگاه سریع: ${p.name}`);

    const art = el("span", "product__art");
    art.innerHTML = productSvg(p, p.colors[0]);

    const info = el("span", "product__info");
    info.append(el("span", "product__cat", CATEGORY_LABEL[p.cat]), el("span", "product__name", p.name));
    const price = el("span", "product__price num");
    price.append("از ", el("strong", null, toman(priceFor(p, SIZES[0].ml))));
    info.append(price);

    open.append(art, info);
    li.append(open);
    return li;
  }

  function bindCatalogue() {
    dom.grid = $("#grid");
    dom.count = $("#result-count");
    dom.noResults = $("#no-results");

    $$("#chips .chip").forEach((chip) => {
      chip.addEventListener("click", () => setCategory(chip.dataset.cat));
    });
    $("#q").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderGrid();
    });
    $("#sort").addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderGrid();
    });
    $("#reset-filters").addEventListener("click", () => {
      state.query = "";
      state.sort = "new";
      $("#q").value = "";
      $("#sort").value = "new";
      setCategory("all");
      $("#q").focus();
    });
    dom.grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open]");
      if (btn) openQuickView(btn.dataset.open, btn);
    });
    $$("[data-jump]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setCategory(btn.dataset.jump);
        $("#shelf").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
      });
    });
  }

  function setCategory(cat) {
    state.cat = cat;
    $$("#chips .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === cat)));
    renderGrid();
  }

  /* ---------- Dialog helpers ---------- */

  const openers = new WeakMap();

  function showDialog(dialog, opener) {
    openers.set(dialog, opener || document.activeElement);
    document.documentElement.classList.add("modal-open");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function bindDialog(dialog) {
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("modal-open");
      const opener = openers.get(dialog);
      if (opener && document.contains(opener)) opener.focus();
    });
    // Click on the backdrop (the dialog element itself) closes it.
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeDialog(dialog);
    });
    $$("[data-close]", dialog).forEach((b) => b.addEventListener("click", () => closeDialog(dialog)));
  }

  /* ---------- Quick view ---------- */

  const qv = { product: null, color: null, ml: SIZES[0].ml };

  function openQuickView(id, opener) {
    const p = productById(id);
    if (!p) return;
    qv.product = p;
    qv.color = p.colors[0];
    qv.ml = SIZES[0].ml;

    $("#qv-cat").textContent = CATEGORY_LABEL[p.cat];
    $("#qv-title").textContent = p.name;
    $("#qv-blurb").textContent = p.blurb;
    $("#qv-inci").textContent = p.inci;

    const colors = $("#qv-colors");
    colors.replaceChildren(
      ...p.colors.map((key, i) => {
        const label = el("label", "swatch");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "color";
        input.value = key;
        input.checked = i === 0;
        const dot = el("span", "swatch__dot");
        dot.style.setProperty("--swatch", COLORS[key].glass);
        dot.setAttribute("title", COLORS[key].name);
        label.append(input, dot, el("span", "sr-only", COLORS[key].name));
        return label;
      })
    );

    const sizes = $("#qv-sizes");
    sizes.replaceChildren(
      ...SIZES.map((s, i) => {
        const label = el("label", "size");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "size";
        input.value = String(s.ml);
        input.checked = i === 0;
        label.append(input, el("span", "size__text num", `${fmt(s.ml)} میلی‌لیتر`));
        return label;
      })
    );

    updateQuickView();
    showDialog($("#qv"), opener);
  }

  function updateQuickView() {
    const p = qv.product;
    $("#qv-art").innerHTML = productSvg(p, qv.color, `${p.name}، بطری ${COLORS[qv.color].name}`);
    $("#qv-color-name").textContent = COLORS[qv.color].name;
    $("#qv-price").textContent = toman(priceFor(p, qv.ml));
  }

  function bindQuickView() {
    const dialog = $("#qv");
    bindDialog(dialog);
    $("#qv-form").addEventListener("change", (e) => {
      if (e.target.name === "color") qv.color = e.target.value;
      if (e.target.name === "size") qv.ml = Number(e.target.value);
      updateQuickView();
    });
    $("#qv-form").addEventListener("submit", (e) => {
      e.preventDefault();
      addToCart(qv.product.id, qv.color, qv.ml);
      closeDialog(dialog);
      if (window.toast) window.toast(`«${qv.product.name}» به سبد اضافه شد`);
    });
  }

  /* ---------- Cart ---------- */

  let cart = loadCart();

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(raw)
        ? raw.filter((l) => productById(l.id) && COLORS[l.color] && sizeByMl(l.ml) && l.qty > 0)
        : [];
    } catch (err) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      /* storage unavailable: the cart still works for this visit */
    }
  }

  const lineKey = (l) => `${l.id}|${l.color}|${l.ml}`;
  const lineTotal = (l) => priceFor(productById(l.id), l.ml) * l.qty;
  const subtotal = () => cart.reduce((sum, l) => sum + lineTotal(l), 0);
  const itemCount = () => cart.reduce((sum, l) => sum + l.qty, 0);
  const shippingFee = () => (cart.length === 0 || subtotal() >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE);

  function addToCart(id, color, ml) {
    const existing = cart.find((l) => lineKey(l) === `${id}|${color}|${ml}`);
    if (existing) existing.qty = Math.min(existing.qty + 1, 9);
    else cart.push({ id, color, ml, qty: 1 });
    cartChanged();
  }

  function changeQty(key, delta) {
    const line = cart.find((l) => lineKey(l) === key);
    if (!line) return;
    line.qty = Math.min(9, line.qty + delta);
    if (line.qty <= 0) cart = cart.filter((l) => l !== line);
    cartChanged();
  }

  function removeLine(key) {
    cart = cart.filter((l) => lineKey(l) !== key);
    cartChanged();
  }

  function cartChanged() {
    saveCart();
    renderCart();
  }

  function renderCart() {
    const count = itemCount();
    $("#cart-count").textContent = fmt(count);
    $("#cart-count").hidden = count === 0;
    $("#cart-live").textContent = count ? `${fmt(count)} کالا در سبد` : "سبد خالی است";

    const empty = cart.length === 0;
    $("#cart-empty").hidden = !empty;
    $("#cart-foot").hidden = empty;
    $("#ship").hidden = empty;
    $("#cart-list").replaceChildren(...cart.map(cartLine));

    const sub = subtotal();
    const missing = FREE_SHIPPING_FROM - sub;
    $("#ship-text").textContent = missing > 0
      ? `${toman(missing)} دیگر تا ارسال رایگان`
      : "ارسال سفارش شما رایگان است";
    $("#ship-bar").style.width = Math.min(100, (sub / FREE_SHIPPING_FROM) * 100) + "%";
    $("#subtotal").textContent = toman(sub);
    $("#shipping-fee").textContent = shippingFee() === 0 ? "رایگان" : toman(shippingFee());
    $("#pay-total").textContent = toman(sub + shippingFee());
  }

  function cartLine(l) {
    const p = productById(l.id);
    const key = lineKey(l);
    const li = el("li", "line");

    const art = el("span", "line__art");
    art.innerHTML = productSvg(p, l.color);

    const info = el("div", "line__info");
    info.append(
      el("p", "line__name", p.name),
      el("p", "line__meta num", `${COLORS[l.color].name}، ${fmt(l.ml)} میلی‌لیتر`)
    );

    const qty = el("div", "qty");
    qty.setAttribute("role", "group");
    qty.setAttribute("aria-label", `تعداد ${p.name}`);
    const minus = el("button", "qty__btn", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", "کم کردن یک عدد");
    minus.addEventListener("click", () => changeQty(key, -1));
    const value = el("span", "qty__value num", fmt(l.qty));
    const plus = el("button", "qty__btn", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", "اضافه کردن یک عدد");
    plus.disabled = l.qty >= 9;
    plus.addEventListener("click", () => changeQty(key, 1));
    qty.append(minus, value, plus);

    const remove = el("button", "line__remove", "حذف");
    remove.type = "button";
    remove.setAttribute("aria-label", `حذف ${p.name} از سبد`);
    remove.addEventListener("click", () => removeLine(key));

    const foot = el("div", "line__foot");
    foot.append(qty, el("p", "line__price num", toman(lineTotal(l))), remove);
    info.append(foot);

    li.append(art, info);
    return li;
  }

  /* ---------- Drawer views ---------- */

  function showView(name) {
    ["cart", "checkout", "done"].forEach((v) => {
      $("#" + (v === "cart" ? "view-cart" : v === "checkout" ? "checkout" : "view-done")).hidden = v !== name;
    });
    const focusTarget = { cart: "#cart-title", checkout: "#checkout-title", done: "#done-title" }[name];
    $(focusTarget).focus();
    $("#cart").scrollTop = 0;
  }

  /* ---------- Checkout ---------- */

  function setFieldError(field, message) {
    const wrap = $(`[data-field="${field}"]`);
    const input = $("input, textarea", wrap);
    $(".field__error", wrap).textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    return input;
  }

  function validateCheckout() {
    const name = $("#f-name").value.trim();
    const phone = normalizeDigits($("#f-phone").value);
    const address = $("#f-address").value.trim();
    const checks = [
      ["name", name.length >= 5 && name.includes(" "), "نام و نام خانوادگی را کامل بنویسید."],
      ["phone", /^09\d{9}$/.test(phone), "شماره‌ی موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد."],
      ["address", address.length >= 15, "نشانی را با شهر، خیابان و پلاک بنویسید."],
    ];
    let first = null;
    checks.forEach(([field, ok, message]) => {
      const input = setFieldError(field, ok ? "" : message);
      if (!ok && !first) first = input;
    });
    if (first) first.focus();
    return !first;
  }

  function submitOrder(e) {
    e.preventDefault();
    if (!validateCheckout()) return;
    const total = subtotal() + shippingFee();
    const code = "AB-" + String(Math.floor(10000 + Math.random() * 90000));
    $("#done-text").textContent =
      `${$("#f-name").value.trim()} عزیز، سفارش ${code} به مبلغ ${toman(total)} ثبت شد. ` +
      "این یک فروشگاه نمایشی است؛ کالایی ارسال نمی‌شود.";
    cart = [];
    cartChanged();
    $("#checkout").reset();
    showView("done");
    if (window.toast) window.toast("سفارش نمایشی ثبت شد");
  }

  function bindCart() {
    const dialog = $("#cart");
    bindDialog(dialog);
    $("#open-cart").addEventListener("click", (e) => {
      showView("cart");
      showDialog(dialog, e.currentTarget);
      $("#cart-title").focus();
    });
    $("#go-checkout").addEventListener("click", () => showView("checkout"));
    $("#back-to-cart").addEventListener("click", () => showView("cart"));
    $("#checkout").addEventListener("submit", submitOrder);
    $("#done-close").addEventListener("click", () => closeDialog(dialog));
    $("#empty-action").addEventListener("click", () => {
      closeDialog(dialog);
      $("#shelf").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    });
    ["name", "phone", "address"].forEach((field) => {
      const input = $(`[data-field="${field}"] input, [data-field="${field}"] textarea`);
      input.addEventListener("input", () => setFieldError(field, ""));
    });
  }

  /* ---------- Init ---------- */

  function init() {
    bindCatalogue();
    bindQuickView();
    bindCart();
    renderGrid();
    renderCart();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
