import { Dispatch, SetStateAction } from "react";
import { motion, Variants } from "framer-motion";
import { ProductGrid } from "./Product/ProductGrid";
import { Category } from "./CategoryFilter";
import type { CategoryFilter, Product } from "@/lib/products";

export interface ShopSectionProps {
  filter: CategoryFilter;
  setFilter: Dispatch<SetStateAction<CategoryFilter>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  visible: Product[];
  products: Product[];
  setQuickProduct: Dispatch<SetStateAction<Product | null>>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

// Framer Motion Variants
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function ShopSection({
  filter,
  setFilter,
  sort,
  setSort,
  visible,
  products,
  setQuickProduct,
  wishlist,
  toggleWishlist,
}: ShopSectionProps) {
  return (
    <section className="section collection" id="shop">
      {/* Animated Section Heading */}
      <motion.div
        className="section-heading"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
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
      </motion.div>

      {/* Animated Product Grid Container */}
      <motion.div
        key={`${filter}-${sort}`}
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <ProductGrid
          items={visible}
          onOpen={setQuickProduct}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />
      </motion.div>

      {/* Animated Shop Count */}
      <motion.div
        className="shop-count"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Showing {visible.length} of {products.length} pieces
      </motion.div>
    </section>
  );
}
