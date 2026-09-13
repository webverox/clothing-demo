export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a href="#top" className="wordmark">
          SONDER <span>SUPPLY</span>
        </a>
        <p>
          Considered clothing
          <br />
          for everyday life.
        </p>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">About</a>
            <a href="#story">Journal</a>
          </div>
          <div>
            <p className="footer-label">Customer care</p>
            <a href="#top">Shipping & Returns</a>
            <a href="#top">Size Guide</a>
            <a href="#top">FAQ</a>
          </div>
          <div>
            <p className="footer-label">Follow</p>
            <a href="#top">Instagram ↗</a>
            <a href="#top">Pinterest ↗</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Sonder Supply</span>
        <span className="text-lg">
          Demo made with ❤ by{" "}
          <a
            target="_blank"
            className="text-black!"
            href="https://webverox.com"
          >
            Webverox
          </a>
        </span>
        <div>
          <a href="#top">Terms</a>
          <a href="#top">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
