"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useStoredState } from "@/hooks/useStoredState";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import {
  categories,
  filterProducts,
  formatPrice,
  products,
} from "@/lib/products";

import type { CategoryFilter, Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/Product/ProductGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickView } from "@/components/QuickView";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Category } from "@/components/CategoryFilter";
import { Hero } from "@/components/Hero";
import { EditorialSection } from "@/components/EditorialSection";
import { Newsletter } from "@/components/Newsletter";

type CartLine = { productId: string; size: string; quantity: number };

export default function Page() {
  const [cart, setCart] = useStoredState<CartLine[]>("sonder-cart", []);
  const [wishlist, setWishlist] = useStoredState<string[]>(
    "sonder-wishlist",
    [],
  );
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [sort, setSort] = useState("Featured");
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [notice, setNotice] = useState("");
  const visible = useMemo(() => {
    const filtered = filterProducts(filter);
    return [...filtered].sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : sort === "Newest"
            ? Number(b.isNew) - Number(a.isNew)
            : 0,
    );
  }, [filter, sort]);
  const cartLines = cart
    .map((line) => ({
      ...line,
      product: products.find((product) => product.id === line.productId)!,
    }))
    .filter((line) => line.product);
  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find(
        (line) => line.productId === product.id && line.size === size,
      );
      return existing
        ? current.map((line) =>
            line === existing
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [...current, { productId: product.id, size, quantity }];
    });
    setQuickProduct(null);
    setDrawer(true);
    setNotice(`${product.name} added to bag`);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const updateLine = (line: CartLine, quantity: number) =>
    setCart((current) =>
      current.map((item) =>
        item.productId === line.productId && item.size === line.size
          ? { ...item, quantity }
          : item,
      ),
    );
  const removeLine = (line: CartLine) =>
    setCart((current) =>
      current.filter(
        (item) =>
          !(item.productId === line.productId && item.size === line.size),
      ),
    );

  const toggleWishlist = (id: string) =>
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const shopAll = () => {
    setFilter("ALL");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Header
        cartCount={cart.reduce((total, line) => total + line.quantity, 0)}
        onCart={() => setDrawer(true)}
        onSearch={() => setSearch(true)}
      />
      <Hero />
      <section className="section collection" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow" id="new">
              01 — The edit
            </p>
            <h2>The autumn edit</h2>
          </div>
          <div className="collection-controls">
            <Category active={filter} onChange={setFilter} />
            <label className="sort-control">
              Sort by{" "}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </label>
          </div>
        </div>
        <ProductGrid
          items={visible}
          onOpen={setQuickProduct}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />
        <div className="shop-count">
          Showing {visible.length} of {products.length} pieces
        </div>
      </section>
      <section className="statement" id="about">
        <p className="eyebrow">Our point of view</p>
        <h2>
          Clothing
          <br />
          <em>without the noise.</em>
        </h2>
        <div className="statement-detail">
          <p>
            Sonder Supply creates considered everyday pieces with honest
            materials, practical silhouettes, and a focus on the details that
            matter.
          </p>
          <a className="text-link" href="#story">
            Read our story <span>↗</span>
          </a>
        </div>
      </section>
      <EditorialSection />
      <section className="section categories" id="collections">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 — Browse</p>
            <h2>Shop by category</h2>
          </div>
          <p>Find your foundation.</p>
        </div>
        <div className="category-grid">
          {(["Outerwear", "Tops", "Bottoms", "Knitwear"] as const).map(
            (category) => {
              const item = products.find(
                (product) => product.category === category,
              )!;
              return (
                <button
                  className="category"
                  key={category}
                  onClick={() => {
                    setFilter(category.toUpperCase() as CategoryFilter);
                    document
                      .getElementById("shop")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img src={item.image} alt={`${category} collection`} />
                  <div>
                    <span>{category}</span>
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              );
            },
          )}
        </div>
      </section>
      <Newsletter />
      <Footer />
      {quickProduct && (
        <QuickView
          product={quickProduct}
          onClose={() => setQuickProduct(null)}
          onAdd={(size, quantity) => addToCart(quickProduct, size, quantity)}
        />
      )}
      {drawer && (
        <CartDrawer
          lines={cartLines}
          onClose={() => setDrawer(false)}
          onUpdate={updateLine}
          onRemove={removeLine}
          onShop={shopAll}
          onCheckout={() =>
            setNotice("Checkout is not connected in this demo.")
          }
        />
      )}
      {search && (
        <SearchOverlay
          onClose={() => setSearch(false)}
          onOpen={(product) => {
            setSearch(false);
            setQuickProduct(product);
          }}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}
