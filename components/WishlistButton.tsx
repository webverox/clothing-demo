import { Heart } from "lucide-react";

export const WishlistButton = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      className={`wishlist ${active ? "is-active" : ""}`}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        onToggle();
      }}
    >
      <Heart size={15} fill={active ? "currentColor" : "none"} />
    </button>
  );
};
