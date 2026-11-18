const pixelMap = [
  "1000001",
  "1100011",
  "0110110",
  "0011100",
  "0001000",
  "0001000",
  "0001000",
];

export default function HeroCodeWindow() {
  return (
    <div className="hero-dev-scene" aria-label="کانسپت یکسل با پنجرهٔ کدنویسی پایتون و پیکسل‌های مانیتور">
      <div className="hero-dev-grid" aria-hidden="true" />
      <div className="hero-pixel-logo" aria-hidden="true">
        {pixelMap.flatMap((row, rowIndex) =>
          [...row].map((pixel, columnIndex) => (
            <span className={pixel === "1" ? "on" : ""} key={`${rowIndex}-${columnIndex}`} />
          )),
        )}
      </div>
      <div className="hero-code-editor" dir="ltr">
        <div className="hero-editor-chrome">
          <div className="hero-editor-brand"><span className="hero-editor-mark">Y<span>_</span></span> YEKSEL <i>/</i> STUDIO</div>
          <div className="hero-editor-controls" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <div className="hero-editor-tabs"><span className="active">◈ &nbsp; idea.py</span><span>◈ &nbsp; design.tsx</span><span className="hero-editor-plus">+</span></div>
        <div className="hero-editor-body">
          <div className="hero-editor-rail" aria-hidden="true">Y<br/>E<br/>K<br/>S<br/>E<br/>L</div>
          <div className="hero-editor-code" aria-label="نمونه کد پایتون برای ساخت یک تجربهٔ وب">
            <div><small>01</small><code><b className="syntax-purple">from</b> <b className="syntax-white">yeksel</b> <b className="syntax-purple">import</b> <b className="syntax-yellow">Website</b></code></div>
            <div><small>02</small><code>&nbsp;</code></div>
            <div><small>03</small><code><b className="syntax-purple">class</b> <b className="syntax-yellow">YourIdea</b><b className="syntax-white">(Website):</b></code></div>
            <div><small>04</small><code>&nbsp;&nbsp;&nbsp;&nbsp;<b className="syntax-purple">def</b> <b className="syntax-blue">__init__</b><b className="syntax-white">(self, brand):</b></code></div>
            <div><small>05</small><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="syntax-white">self.brand</b> <b className="syntax-muted">=</b> <b className="syntax-orange">brand</b></code></div>
            <div><small>06</small><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="syntax-white">self.design</b> <b className="syntax-muted">=</b> <b className="syntax-green">"distinctive"</b></code></div>
            <div><small>07</small><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="syntax-white">self.code</b> <b className="syntax-muted">=</b> <b className="syntax-green">"built_to_last"</b></code></div>
            <div><small>08</small><code>&nbsp;</code></div>
            <div><small>09</small><code><b className="syntax-muted"># one pixel at a time</b></code></div>
            <div className="hero-active-line"><small>10</small><code><b className="syntax-white">site</b> <b className="syntax-muted">=</b> <b className="syntax-yellow">YourIdea</b><b className="syntax-white">(</b><b className="syntax-green">"your brand"</b><b className="syntax-white">)</b></code></div>
            <div><small>11</small><code><b className="syntax-white">site.</b><b className="syntax-blue">launch</b><b className="syntax-white">()</b><span className="hero-code-caret" /></code></div>
          </div>
        </div>
        <div className="hero-editor-terminal"><span className="hero-terminal-label">⌁ &nbsp; TERMINAL</span><div><span>❯</span> python idea.py</div><div><span>✓</span> Experience is ready to launch<span className="hero-terminal-blink">_</span></div></div>
        <div className="hero-editor-status"><span>◈ &nbsp; main.py</span><span>Python 3.12 &nbsp; · &nbsp; UTF-8 &nbsp; · &nbsp; 100%</span></div>
      </div>
      <div className="hero-dev-note" dir="rtl"><span>یکسل / YEKSEL</span><strong>از یک پیکسل<br/>تا یک تجربهٔ کامل.</strong><i>01 — DESIGN × CODE</i></div>
      <span className="hero-dev-corner hero-dev-corner-one" aria-hidden="true" /><span className="hero-dev-corner hero-dev-corner-two" aria-hidden="true" />
    </div>
  );
}
