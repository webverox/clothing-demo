import { Search, X } from "lucide-react";
import { ProductGrid } from "./Product/ProductGrid";
import { products, type Product } from "@/lib/products";
import { useState } from "react";

export function SearchOverlay({
  onClose,
  onOpen,
  wishlist,
  onWishlist,
}: {
  onClose: () => void;
  onOpen: (product: Product) => void;
  wishlist: string[];
  onWishlist: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const results = products.filter((product) =>
    `${product.name} ${product.category} ${product.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="search-layer">
      <div className="search-panel">
        <div className="search-top">
          <label htmlFor="site-search">Search the collection</label>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
        <div className="search-input">
          <Search size={18} />
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pieces, categories..."
          />
        </div>
        {query && (
          <div className="search-results">
            <p className="eyebrow">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ProductGrid
              items={results}
              onOpen={onOpen}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          </div>
        )}
      </div>
    </div>
  );
}
