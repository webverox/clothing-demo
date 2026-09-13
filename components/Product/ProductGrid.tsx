import { motion, Variants } from "framer-motion";
import { type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

// Parent container variant to stagger child items
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Delay between each card's pop-up
    },
  },
};

// Card pop-up spring variant
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export const ProductGrid = ({
  items,
  onOpen,
  wishlist,
  onWishlist,
}: {
  items: Product[];
  onOpen: (product: Product) => void;
  wishlist: string[];
  onWishlist: (id: string) => void;
}) => {
  if (!items.length)
    return (
      <div className="empty-state">
        <p className="eyebrow">No pieces found.</p>
        <p>Try another search or category.</p>
      </div>
    );

  return (
    <motion.div
      className="product-grid"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((product) => (
        <motion.div key={product.id} variants={cardVariants}>
          <ProductCard
            product={product}
            onOpen={() => onOpen(product)}
            isWishlisted={wishlist.includes(product.id)}
            onWishlist={() => onWishlist(product.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
