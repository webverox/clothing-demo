import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="quantity" aria-label="Quantity selector">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <Minus size={12} />
      </button>
      <span>{quantity}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={12} />
      </button>
    </div>
  );
}
