import { formatPrice, Product } from "@/lib/products";
import { ArrowUpRight, Trash2, X } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";

type CartLine = { productId: string; size: string; quantity: number };

export function CartDrawer({
  lines,
  onClose,
  onUpdate,
  onRemove,
  onCheckout,
  onShop,
}: {
  lines: (CartLine & { product: Product })[];
  onClose: () => void;
  onUpdate: (line: CartLine, quantity: number) => void;
  onRemove: (line: CartLine) => void;
  onCheckout: () => void;
  onShop: () => void;
}) {
  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;
  return (
    <div
      className="drawer-layer"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="drawer-header">
          <h2>Your bag</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </div>
        {!lines.length ? (
          <div className="empty-bag">
            <p className="eyebrow">Your bag is empty</p>
            <p>Explore the latest pieces from Sonder Supply.</p>
            <button className="text-link" onClick={onShop}>
              Shop the collection <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => (
                <div
                  className="cart-line"
                  key={`${line.product.id}-${line.size}`}
                >
                  <img src={line.product.image} alt={line.product.alt} />
                  <div className="cart-line-copy">
                    <div className="cart-line-title">
                      <div>
                        <p>{line.product.name}</p>
                        <span>Size {line.size}</span>
                      </div>
                      <button
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => onRemove(line)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="cart-line-bottom">
                      <QuantitySelector
                        quantity={line.quantity}
                        onChange={(quantity) => onUpdate(line, quantity)}
                      />
                      <span>
                        {formatPrice(line.product.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>
                  {shipping ? formatPrice(shipping) : "Complimentary"}
                </span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                className="button-dark checkout-button"
                onClick={onCheckout}
              >
                Checkout <ArrowUpRight size={15} />
              </button>
              <button className="continue-button" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
