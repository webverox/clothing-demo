import { categories, CategoryFilter } from "@/lib/products";

export function Category({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (filter: CategoryFilter) => void;
}) {
  return (
    <div
      className="category-filter"
      role="tablist"
      aria-label="Filter products"
    >
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={active === category}
          className={active === category ? "active" : ""}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
