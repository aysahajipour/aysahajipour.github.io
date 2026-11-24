/* Shared helpers: Persian numbers, toast, nav toggle, demo bar. No dependencies. */
(function () {
  const fa = new Intl.NumberFormat("fa-IR");
  window.fa = {
    num: (n) => fa.format(n),
    toman: (n) => fa.format(n) + " تومان",
  };

  let timer;
  window.toast = function (msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.append(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("on"));
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove("on"), 2600);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const bar = document.querySelector(".demo-bar");
    if (!bar) document.body.insertAdjacentHTML("afterbegin",
      '<div class="demo-bar"><span>این یک دموی نمایشی است؛ محتوا و اطلاعات تماس فرضی‌اند.</span><a href="../../#project-brief">همین سبک را برای من بساز</a></div>');

    document.querySelectorAll("[data-nav-toggle]").forEach((btn) => {
      const target = document.getElementById(btn.getAttribute("aria-controls"));
      if (!target) return;
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        target.toggleAttribute("data-open", !open);
      });
      target.addEventListener("click", (e) => {
        if (e.target.closest("a")) { btn.setAttribute("aria-expanded", "false"); target.removeAttribute("data-open"); }
      });
    });
  });
})();
