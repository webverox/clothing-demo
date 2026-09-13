import { formatPrice, type Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";
import { WishlistButton } from "../WishlistButton";

export const ProductCard = ({
  product,
  onOpen,
  isWishlisted,
  onWishlist,
}: {
  product: Product;
  onOpen: () => void;
  isWishlisted: boolean;
  onWishlist: () => void;
}) => {
  return (
    <article className="product">
      <button
        className="product-image"
        onClick={onOpen}
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt={product.alt} />
        <span className="product-number">
          {product.isNew ? "NEW" : product.category}
        </span>
        <span className="view-product">
          Quick view <ArrowUpRight size={14} />
        </span>
      </button>
      <div className="product-meta">
        <button onClick={onOpen}>{product.name}</button>
        <div>
          <span>{formatPrice(product.price)}</span>
          <WishlistButton active={isWishlisted} onToggle={onWishlist} />
        </div>
      </div>
    </article>
  );
};
