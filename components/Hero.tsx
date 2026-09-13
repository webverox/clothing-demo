import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="top">
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=90"
        alt="Model in a neutral wool coat in soft daylight"
      />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <p className="eyebrow">The autumn / winter collection</p>
        <h1>
          Everyday,
          <br />
          <em>refined.</em>
        </h1>
        <p className="hero-description">
          Essential pieces designed with intention.
        </p>
        <div className="hero-links">
          <a className="button-dark" href="#shop">
            Shop the collection <ArrowUpRight size={15} />
          </a>
          <a className="text-link" href="#story">
            Explore lookbook <span>↗</span>
          </a>
        </div>
      </div>
      <p className="hero-index">01 / 04</p>
    </section>
  );
}
