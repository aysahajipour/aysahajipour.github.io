import "./infinite-marquee.css";

const words = ["DESIGN", "DEVELOPMENT", "EXPERIENCE", "REACT", "PERFORMANCE", "SEO"];

function Group({ duplicate = false }: { duplicate?: boolean }) {
  return <span className="marquee-group" aria-hidden={duplicate || undefined}>
    {words.map(word => <span className="marquee-item" key={word}>{word}<span className="marquee-spark" aria-hidden="true">✳</span></span>)}
  </span>;
}

export default function InfiniteMarquee() {
  return <div className="v2-marquee infinite-marquee" aria-label="طراحی، توسعه، تجربه، React، عملکرد و سئو">
    <div className="marquee-track"><Group/><Group duplicate/></div>
  </div>;
}
