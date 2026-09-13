import { type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

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
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpen={() => onOpen(product)}
          isWishlisted={wishlist.includes(product.id)}
          onWishlist={() => onWishlist(product.id)}
        />
      ))}
    </div>
  );
};
