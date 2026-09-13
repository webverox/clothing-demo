export function EditorialSection() {
  return (
    <section className="editorial" id="story">
      <div className="editorial-image">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90"
          alt="Clothing rack and styling in a sunlit studio"
        />
      </div>
      <div className="editorial-copy">
        <p className="eyebrow">02 — Field notes</p>
        <h2>
          The daily
          <br />
          <em>uniform.</em>
        </h2>
        <p>
          Designed to move between places, seasons, and routines. A closer look
          at the pieces that become part of your everyday.
        </p>
        <a className="text-link" href="#collections">
          View the story <span>↗</span>
        </a>
      </div>
    </section>
  );
}
