"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { useStoredState } from "@/hooks/useStoredState";
import { filterProducts, products } from "@/lib/products";
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
import { ShopSection } from "@/components/ShopSection";
import { StatementSection } from "@/components/StatementSection";

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

      <ShopSection
        filter={filter}
        products={products}
        setFilter={setFilter}
        setQuickProduct={setQuickProduct}
        setSort={setSort}
        sort={sort}
        toggleWishlist={toggleWishlist}
        visible={visible}
        wishlist={wishlist}
        key="shop-section"
      />

      <StatementSection />

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
                  className="relative group overflow-hidden rounded-lg w-full cursor-pointer focus:outline-none"
                  key={category}
                  onClick={() => {
                    setFilter(category.toUpperCase() as CategoryFilter);
                    document
                      .getElementById("shop")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${category} collection`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                    <span className="font-semibold text-lg capitalize">
                      {category}
                    </span>
                    <ArrowUpRight size={20} />
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
