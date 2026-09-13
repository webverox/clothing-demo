import { ArrowUpRight, X } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice, type Product } from "@/lib/products";
import { useEffect, useState } from "react";

export function QuickView({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (size: string, quantity: number) => void;
}) {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="quick-view"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close product view"
        >
          <X size={20} />
        </button>
        <div className="quick-image">
          <img src={product.image} alt={product.alt} />
        </div>
        <div className="quick-copy">
          <p className="eyebrow">
            {product.category} / {product.color}
          </p>
          <h2 id="quick-view-title">{product.name}</h2>
          <p className="quick-price">{formatPrice(product.price)}</p>
          <p className="quick-description">{product.description}</p>
          <div className="size-label">
            <span>Size</span>
            <span>{size || "Select a size"}</span>
          </div>
          <div className="size-options">
            {product.sizes.map((option) => (
              <button
                key={option}
                className={size === option ? "selected" : ""}
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setError("");
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="quick-controls">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button
              className="button-dark add-button"
              onClick={() =>
                size
                  ? onAdd(size, quantity)
                  : setError("Select a size before adding to your bag.")
              }
            >
              Add to bag <ArrowUpRight size={15} />
            </button>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="product-notes">
            <p>Free shipping on orders over $150</p>
            <p>Easy returns within 30 days</p>
          </div>
        </div>
      </section>
    </div>
  );
}
