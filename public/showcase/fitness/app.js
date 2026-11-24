/* Tempo fitness demo: goal quiz, calorie calculator, weekly program, pricing, sign-up.
   Everything runs locally; nothing is sent anywhere. */
(function () {
  "use strict";

  /* ---------- Data ---------- */

  const PROGRAMS = [
    {
      id: "base",
      name: "پایه",
      tagline: "برای شروع دوباره یا اولین بار",
      summary: "سه جلسه‌ی کوتاه در هفته با حرکت‌های ساده، قدم‌زدن و تمرین تعادل. هدف این است که عادت بسازی، نه اینکه خسته شوی.",
      days: [
        { day: "شنبه", title: "تمام بدن، سبک", items: [["اسکوات با وزن بدن", "۳×۱۰"], ["شنا روی دیوار", "۳×۸"], ["پل باسن", "۳×۱۰"], ["تخته‌ی ساده", "۳×۲۰ ثانیه"]] },
        { day: "یکشنبه", title: "پیاده‌روی تند", items: [["پیاده‌روی با سرعت قابل صحبت", "۳۰ دقیقه"], ["کشش پایان تمرین", "۵ دقیقه"]] },
        { day: "دوشنبه", title: "استراحت فعال", items: [["حرکات تحرک مفاصل", "۱۰ دقیقه"]] },
        { day: "سه‌شنبه", title: "تمام بدن، سبک", items: [["لانج ایستاده", "۳×۸ هر پا"], ["پارویی با کش", "۳×۱۲"], ["پرندگان و سگ", "۳×۸"], ["دد باگ", "۳×۸"]] },
        { day: "چهارشنبه", title: "استراحت", items: [] },
        { day: "پنجشنبه", title: "ترکیبی", items: [["دویدن و راه رفتن متناوب", "۲۰ دقیقه"], ["اسکوات", "۲×۱۰"], ["تخته‌ی ساده", "۲×۲۰ ثانیه"]] },
        { day: "جمعه", title: "استراحت و گزارش هفته", items: [["ثبت گزارش کوتاه برای مربی", "۵ دقیقه"]] },
      ],
    },
    {
      id: "strength",
      name: "قدرت",
      tagline: "برای ساخت قدرت و فرم بدن",
      summary: "چهار جلسه‌ی ساختارمند با اضافه‌بار تدریجی. هر هفته بار یا تکرارها را بر اساس ویدیوها و گزارش تو تنظیم می‌کنم.",
      days: [
        { day: "شنبه", title: "پایین‌تنه", items: [["اسکوات گابلت", "۴×۸"], ["رومانیایی ددلیفت", "۳×۱۰"], ["لانج معکوس", "۳×۱۰ هر پا"], ["ساق پا ایستاده", "۳×۱۵"]] },
        { day: "یکشنبه", title: "بالاتنه", items: [["پرس سینه با دمبل", "۴×۸"], ["زیربغل سیم‌کش", "۴×۱۰"], ["پرس سرشانه", "۳×۱۰"], ["جلو بازو و پشت بازو", "۲×۱۲"]] },
        { day: "دوشنبه", title: "استراحت", items: [] },
        { day: "سه‌شنبه", title: "پایین‌تنه", items: [["هیپ تراست", "۴×۱۰"], ["اسکوات بلغاری", "۳×۸ هر پا"], ["لگ کرل", "۳×۱۲"], ["پلانک جانبی", "۳×۳۰ ثانیه"]] },
        { day: "چهارشنبه", title: "بالاتنه", items: [["بارفیکس کمکی", "۴×۶"], ["پرس بالا سینه", "۳×۱۰"], ["پارویی تک‌دست", "۳×۱۰"], ["نشر جانب", "۳×۱۵"]] },
        { day: "پنجشنبه", title: "راه رفتن و تحرک", items: [["پیاده‌روی", "۴۰ دقیقه"], ["تحرک لگن و شانه", "۱۰ دقیقه"]] },
        { day: "جمعه", title: "استراحت و گزارش هفته", items: [["ثبت وزنه‌ها و حال هفته", "۵ دقیقه"]] },
      ],
    },
    {
      id: "endurance",
      name: "استقامت",
      tagline: "برای دویدن و آمادگی قلبی",
      summary: "ترکیب دویدن آرام، تمرین تمپو و تقویت پایه. مناسب کسی که می‌خواهد ۵ یا ۱۰ کیلومتر را راحت‌تر بدود.",
      days: [
        { day: "شنبه", title: "دویدن آرام", items: [["دویدن آرام", "۳۵ دقیقه"], ["حرکات تحرک مچ و لگن", "۱۰ دقیقه"]] },
        { day: "یکشنبه", title: "تقویت پایه", items: [["اسکوات تک‌پا به صندلی", "۳×۸"], ["پل باسن تک‌پا", "۳×۱۰"], ["ساق پا ایستاده", "۳×۱۵"], ["تخته‌ی ساده", "۳×۴۰ ثانیه"]] },
        { day: "دوشنبه", title: "تمپو", items: [["گرم‌کردن", "۱۰ دقیقه"], ["دویدن در سرعت تمپو", "۲۰ دقیقه"], ["سرد‌کردن", "۱۰ دقیقه"]] },
        { day: "سه‌شنبه", title: "استراحت", items: [] },
        { day: "چهارشنبه", title: "تمرین تکراری", items: [["۸۰۰ متر سریع", "۵ تکرار"], ["استراحت بین تکرارها", "۲ دقیقه"]] },
        { day: "پنجشنبه", title: "تقویت و کشش", items: [["لانج و دد‌لیفت سبک", "۳×۱۰"], ["کشش پویا", "۱۰ دقیقه"]] },
        { day: "جمعه", title: "دویدن بلند", items: [["دویدن طولانی آرام", "۵۰ تا ۷۰ دقیقه"]] },
      ],
    },
  ];

  const QUESTIONS = [
    {
      id: "goal",
      text: "الان بیشتر دنبال چه چیزی هستی؟",
      options: [
        { value: "habit", label: "عادت ورزش کردن بسازم", score: { base: 3 } },
        { value: "strong", label: "قوی‌تر شوم و فرم بدنم بهتر شود", score: { strength: 3 } },
        { value: "run", label: "بهتر بدوم و نفسم بالا بیاید", score: { endurance: 3 } },
      ],
    },
    {
      id: "experience",
      text: "تجربه‌ی تمرینت چقدر است؟",
      options: [
        { value: "none", label: "تازه شروع می‌کنم یا مدتی نبوده", score: { base: 2 } },
        { value: "some", label: "چند ماه منظم تمرین کرده‌ام", score: { strength: 1, endurance: 1 } },
        { value: "lots", label: "بیش از یک سال سابقه دارم", score: { strength: 2, endurance: 1 } },
      ],
    },
    {
      id: "days",
      text: "هفته‌ای چند روز می‌توانی تمرین کنی؟",
      options: [
        { value: "2-3", label: "دو تا سه روز", score: { base: 2 } },
        { value: "4", label: "چهار روز", score: { strength: 2, endurance: 1 } },
        { value: "5", label: "پنج روز یا بیشتر", score: { endurance: 2, strength: 1 } },
      ],
    },
    {
      id: "place",
      text: "بیشتر کجا تمرین می‌کنی؟",
      options: [
        { value: "home", label: "خانه، با وسایل کم", score: { base: 2, endurance: 1 } },
        { value: "gym", label: "باشگاه", score: { strength: 2 } },
        { value: "outdoor", label: "بیرون، پارک یا مسیر دو", score: { endurance: 2 } },
      ],
    },
  ];

  const PLANS = [
    {
      id: "start",
      name: "شروع",
      monthly: 1200000,
      blurb: "برای کسی که برنامه‌ی روشن می‌خواهد و خودش پیش می‌رود.",
      features: ["برنامه‌ی هفتگی مکتوب", "راهنمای ویدیویی حرکت‌ها", "یک بازنگری ماهانه"],
    },
    {
      id: "follow",
      name: "همراه",
      monthly: 2400000,
      blurb: "بازخورد هفتگی روی تمرین واقعی‌ات.",
      featured: true,
      features: ["همه‌ی موارد پلن شروع", "بازخورد هفتگی روی ویدیو", "راهنمای تغذیه‌ی ساده", "پاسخ به پیام در روزهای کاری"],
    },
    {
      id: "close",
      name: "نزدیک",
      monthly: 4200000,
      blurb: "همراهی نزدیک‌تر با تماس تصویری.",
      features: ["همه‌ی موارد پلن همراه", "دو تماس تصویری در ماه", "تنظیم برنامه‌ی سفر و هفته‌های شلوغ"],
    },
  ];

  const ACTIVITY = [
    { value: 1.2, label: "کم‌تحرک؛ بیشتر پشت میز یا نشسته" },
    { value: 1.375, label: "کمی فعال؛ ورزش سبک یک تا سه روز" },
    { value: 1.55, label: "نسبتاً فعال؛ ورزش سه تا پنج روز" },
    { value: 1.725, label: "خیلی فعال؛ تمرین شش تا هفت روز" },
  ];

  const GOALS = [
    { value: -400, label: "کاهش آرام وزن" },
    { value: 0, label: "حفظ وزن فعلی" },
    { value: 300, label: "افزایش آرام وزن و عضله" },
  ];

  const QUARTER_DISCOUNT = 0.15;

  /* ---------- Helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const nf = new Intl.NumberFormat("fa-IR");
  const fmt = (n) => nf.format(n);
  const toman = (n) => fmt(Math.round(n)) + " تومان";
  const programById = (id) => PROGRAMS.find((p) => p.id === id);
  const planById = (id) => PLANS.find((p) => p.id === id);

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
      .replace(/٫/g, ".")
      .replace(/[\s-]/g, "");
  }

  function setError(input, message) {
    const node = document.getElementById(input.id + "-error");
    if (node) node.textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function fillSelect(select, items, valueKey, labelFn) {
    items.forEach((item) => {
      const o = el("option", null, labelFn(item));
      o.value = item[valueKey];
      select.append(o);
    });
  }

  function reducedMotion() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------- Quiz ---------- */

  const quiz = { index: 0, answers: [] };

  function renderQuestion() {
    const q = QUESTIONS[quiz.index];
    const stage = $("#quiz-stage");
    const group = el("fieldset", "quiz__fieldset");
    const legend = el("legend", "quiz__question", q.text);
    group.append(legend);

    q.options.forEach((opt, i) => {
      const id = `quiz-${q.id}-${i}`;
      const label = el("label", "quiz__option");
      label.htmlFor = id;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.id = id;
      input.value = opt.value;
      input.checked = quiz.answers[quiz.index] === i;
      label.append(input, el("span", "quiz__option-text", opt.label));
      group.append(label);
    });

    stage.replaceChildren(group);
    $("#quiz-step").textContent = `سؤال ${fmt(quiz.index + 1)} از ${fmt(QUESTIONS.length)}`;
    $("#quiz-track").setAttribute("aria-valuenow", String(quiz.index + 1));
    $("#quiz-fill").style.width = ((quiz.index + 1) / QUESTIONS.length) * 100 + "%";
    $("#quiz-error").textContent = "";
    $("#quiz-prev").hidden = quiz.index === 0;
    $("#quiz-next").textContent = quiz.index === QUESTIONS.length - 1 ? "نمایش پیشنهاد" : "بعدی";
  }

  function recommend() {
    const totals = { base: 0, strength: 0, endurance: 0 };
    quiz.answers.forEach((choice, qi) => {
      const score = QUESTIONS[qi].options[choice].score;
      Object.keys(score).forEach((k) => (totals[k] += score[k]));
    });
    // Ties resolve toward the gentler program.
    const order = ["base", "endurance", "strength"];
    return order.reduce((best, id) => (totals[id] > totals[best] ? id : best), "base");
  }

  function showQuizResult() {
    const program = programById(recommend());
    const result = $("#quiz-result");
    result.replaceChildren();
    result.append(
      el("p", "quiz__result-label", "پیشنهاد اول"),
      el("h3", "quiz__result-title", `مسیر ${program.name}`),
      el("p", "quiz__result-tagline", program.tagline),
      el("p", null, program.summary)
    );

    const actions = el("div", "quiz__result-actions");
    const see = el("button", "btn btn--primary", "برنامه‌ی هفتگی این مسیر");
    see.type = "button";
    see.addEventListener("click", () => {
      selectProgram(program.id);
      $("#program").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    });
    const join = el("button", "btn btn--ghost-light", "ثبت‌نام با این مسیر");
    join.type = "button";
    join.addEventListener("click", () => {
      $("#join-program").value = program.id;
      $("#join").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    });
    const again = el("button", "btn btn--link", "پاسخ‌ها را از اول بده");
    again.type = "button";
    again.addEventListener("click", resetQuiz);
    actions.append(see, join, again);
    result.append(actions);

    $("#quiz-panel").hidden = true;
    result.hidden = false;
    result.focus();
  }

  function resetQuiz() {
    quiz.index = 0;
    quiz.answers = [];
    $("#quiz-result").hidden = true;
    $("#quiz-panel").hidden = false;
    renderQuestion();
    $("#quiz-stage input").focus();
  }

  function bindQuiz() {
    renderQuestion();
    $("#quiz-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const checked = $("#quiz-stage input:checked");
      if (!checked) {
        $("#quiz-error").textContent = "یک گزینه را انتخاب کن تا بتوانیم ادامه دهیم.";
        $("#quiz-stage input").focus();
        return;
      }
      const inputs = $$("#quiz-stage input");
      quiz.answers[quiz.index] = inputs.indexOf(checked);
      if (quiz.index < QUESTIONS.length - 1) {
        quiz.index++;
        renderQuestion();
        $("#quiz-stage input").focus();
      } else {
        showQuizResult();
      }
    });
    $("#quiz-prev").addEventListener("click", () => {
      const checked = $("#quiz-stage input:checked");
      if (checked) quiz.answers[quiz.index] = $$("#quiz-stage input").indexOf(checked);
      quiz.index = Math.max(0, quiz.index - 1);
      renderQuestion();
      $("#quiz-stage input:checked, #quiz-stage input").focus();
    });
  }

  /* ---------- Weekly program ---------- */

  const programState = { program: "base", day: 0 };

  function renderProgramPicker() {
    const picker = $("#program-picker");
    picker.replaceChildren(
      ...PROGRAMS.map((p) => {
        const btn = el("button", "program-choice");
        btn.type = "button";
        btn.dataset.program = p.id;
        btn.setAttribute("aria-pressed", String(p.id === programState.program));
        btn.append(el("strong", null, p.name), el("span", null, p.tagline));
        btn.addEventListener("click", () => selectProgram(p.id));
        return btn;
      })
    );
  }

  function selectProgram(id) {
    programState.program = id;
    programState.day = 0;
    $$(".program-choice").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.program === id)));
    renderDayTabs();
    renderDayPanel();
  }

  function renderDayTabs() {
    const tabs = $("#day-tabs");
    const program = programById(programState.program);
    tabs.replaceChildren(
      ...program.days.map((d, i) => {
        const tab = el("button", "day-tab", d.day);
        tab.type = "button";
        tab.id = `day-tab-${i}`;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", "day-panel");
        tab.setAttribute("aria-selected", String(i === programState.day));
        tab.tabIndex = i === programState.day ? 0 : -1;
        if (!d.items.length) tab.classList.add("day-tab--rest");
        tab.addEventListener("click", () => selectDay(i));
        return tab;
      })
    );
  }

  function selectDay(index, focus) {
    programState.day = index;
    $$(".day-tab").forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === index));
      t.tabIndex = i === index ? 0 : -1;
    });
    if (focus) $(`#day-tab-${index}`).focus();
    renderDayPanel();
  }

  function renderDayPanel() {
    const program = programById(programState.program);
    const day = program.days[programState.day];
    const panel = $("#day-panel");
    panel.setAttribute("aria-labelledby", `day-tab-${programState.day}`);
    panel.replaceChildren(el("h3", "day-panel__title", `${day.day}: ${day.title}`));

    if (!day.items.length) {
      panel.append(el("p", "day-panel__rest", "امروز تمرین نداریم. خواب کافی و راه رفتن سبک بهترین کار است."));
      return;
    }
    const list = el("ol", "exercise-list");
    day.items.forEach(([name, volume]) => {
      const li = el("li", "exercise");
      li.append(el("span", "exercise__name", name), el("span", "exercise__volume", volume));
      list.append(li);
    });
    panel.append(list);
  }

  function bindDayTabKeys() {
    $("#day-tabs").addEventListener("keydown", (e) => {
      const count = programById(programState.program).days.length;
      let next = null;
      // The layout is RTL, so ArrowLeft moves to the next day.
      if (e.key === "ArrowLeft") next = (programState.day + 1) % count;
      else if (e.key === "ArrowRight") next = (programState.day - 1 + count) % count;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = count - 1;
      if (next === null) return;
      e.preventDefault();
      selectDay(next, true);
    });
  }

  /* ---------- Calculator ---------- */

  function validateNumber(input, min, max, label) {
    const raw = normalizeDigits(input.value);
    const value = Number(raw);
    if (!raw || Number.isNaN(value)) {
      setError(input, `${label} را به عدد وارد کن.`);
      return null;
    }
    if (value < min || value > max) {
      setError(input, `${label} باید بین ${fmt(min)} و ${fmt(max)} باشد.`);
      return null;
    }
    setError(input, "");
    return value;
  }

  function bmiCategory(bmi) {
    if (bmi < 18.5) return "کمتر از محدوده‌ی معمول";
    if (bmi < 25) return "در محدوده‌ی معمول";
    if (bmi < 30) return "بالاتر از محدوده‌ی معمول";
    return "خیلی بالاتر از محدوده‌ی معمول";
  }

  function computeCalc(form) {
    const age = validateNumber($("#calc-age"), 14, 90, "سن");
    const height = validateNumber($("#calc-height"), 120, 220, "قد");
    const weight = validateNumber($("#calc-weight"), 30, 250, "وزن");
    if (age === null || height === null || weight === null) {
      const firstBad = [$("#calc-age"), $("#calc-height"), $("#calc-weight")].find((i) => i.hasAttribute("aria-invalid"));
      if (firstBad) firstBad.focus();
      return null;
    }
    const sex = form.elements.sex.value;
    const activity = Number(form.elements.activity.value);
    const adjust = Number(form.elements.goal.value);

    // Mifflin-St Jeor
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
    const maintenance = bmr * activity;
    const target = Math.max(maintenance + adjust, sex === "male" ? 1500 : 1200);
    const bmi = weight / Math.pow(height / 100, 2);
    return { bmr, maintenance, target, bmi, adjust };
  }

  function showCalcResult(r) {
    const box = $("#calc-result");
    box.replaceChildren();

    const main = el("p", "calc__big");
    main.append(el("span", "calc__num", fmt(Math.round(r.target / 10) * 10)), " کیلوکالری در روز");
    box.append(el("p", "calc__label", "تخمین انرژی هدف"), main);

    const rows = el("dl", "calc__rows");
    [
      ["متابولیسم پایه", `${fmt(Math.round(r.bmr))} کیلوکالری`],
      ["نگهداری وزن فعلی", `${fmt(Math.round(r.maintenance / 10) * 10)} کیلوکالری`],
      ["شاخص توده بدنی", `${fmt(Math.round(r.bmi * 10) / 10)} (${bmiCategory(r.bmi)})`],
    ].forEach(([k, v]) => {
      const row = el("div");
      row.append(el("dt", null, k), el("dd", null, v));
      rows.append(row);
    });
    box.append(rows);
    box.append(el("p", "note", "تخمین است و ممکن است با نیاز واقعی بدنت چند صد کیلوکالری فاصله داشته باشد. ۲ تا ۳ هفته وزن را پیگیری کن و عدد را اصلاح کن."));
  }

  function bindCalc() {
    const form = $("#calc-form");
    fillSelect(form.elements.activity, ACTIVITY, "value", (a) => a.label);
    fillSelect(form.elements.goal, GOALS, "value", (g) => g.label);
    form.elements.activity.value = "1.375";
    form.elements.goal.value = "0";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const result = computeCalc(form);
      if (result) showCalcResult(result);
    });
    ["calc-age", "calc-height", "calc-weight"].forEach((id) => {
      $("#" + id).addEventListener("input", (e) => setError(e.target, ""));
    });
  }

  /* ---------- Pricing ---------- */

  function currentPeriod() {
    return $("input[name='period']:checked").value;
  }

  function planPrice(plan, period) {
    return period === "quarter" ? plan.monthly * (1 - QUARTER_DISCOUNT) : plan.monthly;
  }

  function renderPlans() {
    const period = currentPeriod();
    const list = $("#plan-list");
    list.replaceChildren(
      ...PLANS.map((plan) => {
        const card = el("li", "plan" + (plan.featured ? " plan--featured" : ""));
        const price = el("p", "plan__price");
        price.append(el("strong", "plan__amount", fmt(Math.round(planPrice(plan, period) / 1000) * 1000)), " تومان در ماه");

        const note = el("p", "plan__note");
        if (period === "quarter") {
          const total = planPrice(plan, period) * 3;
          note.textContent = `پرداخت یک‌جا: ${toman(Math.round(total / 1000) * 1000)}`;
        } else {
          note.textContent = "پرداخت ماه‌به‌ماه";
        }

        const features = el("ul", "plan__features");
        plan.features.forEach((f) => features.append(el("li", null, f)));

        const choose = el("button", "btn " + (plan.featured ? "btn--primary" : "btn--outline"), "انتخاب این پلن");
        choose.type = "button";
        choose.setAttribute("aria-label", `انتخاب پلن ${plan.name}`);
        choose.addEventListener("click", () => {
          $("#join-plan").value = plan.id;
          $("#join-period").value = period;
          $("#join").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
          $("#join-name").focus({ preventScroll: true });
        });

        card.append(el("h3", "plan__name", plan.name), el("p", "plan__blurb", plan.blurb), price, note, features, choose);
        return card;
      })
    );
    $("#plan-status").textContent = period === "quarter" ? "قیمت‌ها برای پرداخت سه‌ماهه نمایش داده شد." : "قیمت‌ها برای پرداخت ماهانه نمایش داده شد.";
  }

  function bindPricing() {
    renderPlans();
    $$("input[name='period']").forEach((i) => i.addEventListener("change", () => {
      $("#join-period").value = currentPeriod();
      renderPlans();
    }));
  }

  /* ---------- Sign-up ---------- */

  function bindJoin() {
    fillSelect($("#join-program"), PROGRAMS, "id", (p) => `مسیر ${p.name}`);
    fillSelect($("#join-plan"), PLANS, "id", (p) => `پلن ${p.name}`);
    $("#join-plan").value = "follow";

    const form = $("#join-form");
    const name = $("#join-name");
    const mobile = $("#join-mobile");
    name.addEventListener("input", () => setError(name, ""));
    mobile.addEventListener("input", () => setError(mobile, ""));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let first = null;

      const nameValue = name.value.trim();
      const nameOk = nameValue.length >= 5 && nameValue.includes(" ");
      setError(name, nameOk ? "" : "نام و نام خانوادگی را کامل بنویس.");
      if (!nameOk) first = name;

      const phone = normalizeDigits(mobile.value);
      const phoneOk = /^09\d{9}$/.test(phone);
      setError(mobile, phoneOk ? "" : "شماره‌ی موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.");
      if (!phoneOk && !first) first = mobile;

      if (first) {
        first.focus();
        return;
      }

      const program = programById($("#join-program").value);
      const plan = planById($("#join-plan").value);
      const period = $("#join-period").value;
      const price = Math.round(planPrice(plan, period) / 1000) * 1000;

      const success = $("#join-success");
      success.replaceChildren(
        el("h3", "join__success-title", "درخواست نمایشی ثبت شد"),
        el("p", null, `${nameValue}، برای مسیر ${program.name} و پلن ${plan.name} (${period === "quarter" ? "سه‌ماهه" : "ماهانه"}، ${toman(price)} در ماه) با تو تماس می‌گیرم.`),
        el("p", "note", "این نمونه است و هیچ اطلاعاتی ارسال یا ذخیره نشد.")
      );
      const again = el("button", "btn btn--dark", "ثبت درخواست دیگر");
      again.type = "button";
      again.addEventListener("click", () => {
        form.reset();
        $("#join-plan").value = "follow";
        success.hidden = true;
        form.hidden = false;
        name.focus();
      });
      success.append(again);

      form.hidden = true;
      success.hidden = false;
      success.focus();
      if (window.toast) window.toast("درخواست نمایشی ثبت شد");
    });
  }

  /* ---------- Init ---------- */

  function init() {
    bindQuiz();
    renderProgramPicker();
    renderDayTabs();
    renderDayPanel();
    bindDayTabKeys();
    bindCalc();
    bindPricing();
    bindJoin();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
