import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header({
  cartCount,
  onCart,
  onSearch,
}: {
  cartCount: number;
  onCart: () => void;
  onSearch: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const links = [
    ["New Arrivals", "#new"],
    ["Shop", "#shop"],
    ["Collections", "#collections"],
    ["About", "#about"],
  ];
  return (
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label="Sonder Supply home">
        SONDER <span>SUPPLY</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button aria-label="Search" onClick={onSearch}>
          <Search size={17} strokeWidth={1.5} />
        </button>
        <button aria-label="Account">
          <UserRound size={17} strokeWidth={1.5} />
        </button>
        <button
          className="bag-button"
          aria-label={`Shopping bag, ${cartCount} items`}
          onClick={onCart}
        >
          <ShoppingBag size={17} strokeWidth={1.5} />
          <span>({cartCount})</span>
        </button>
        <button
          className="menu-button"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
