export type Category = "Outerwear" | "Tops" | "Bottoms" | "Knitwear";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  secondaryImage?: string;
  alt: string;
  color: string;
  sizes: string[];
  isNew?: boolean;
};

export const products: Product[] = [
  {
    id: "overshirt",
    slug: "heavyweight-overshirt",
    name: "Heavyweight Overshirt",
    category: "Outerwear",
    price: 128,
    description:
      "Structured cotton overshirt with a relaxed silhouette and brushed finish.",
    image: "/cloths/photo-1598033129183-c4f50c736f10.avif",
    secondaryImage: "/cloths/photo-1529139574466-a303027c1d8b.avif",
    alt: "Olive heavyweight overshirt",
    color: "Faded Olive",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "utility-jacket",
    slug: "utility-jacket",
    name: "Utility Jacket",
    category: "Outerwear",
    price: 178,
    description:
      "A durable cotton canvas layer with considered utility pockets.",
    image: "/cloths/photo-1551488831-00ddcb6c6bd3.avif",
    alt: "Utility jacket in a neutral tone",
    color: "Stone",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "field-coat",
    slug: "wool-field-coat",
    name: "Wool Field Coat",
    category: "Outerwear",
    price: 240,
    description:
      "A warm wool field coat cut for easy layering through the season.",
    image: "/cloths/photo-1539109136881-3be0616acf4b.avif",
    alt: "Wool field coat on a model",
    color: "Charcoal",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: "cotton-tee",
    slug: "everyday-cotton-tee",
    name: "Everyday Cotton Tee",
    category: "Tops",
    price: 58,
    description:
      "A substantial everyday tee made from soft, long-staple cotton.",
    image: "/cloths/photo-1521572163474-6864f9cf17ab.avif",
    alt: "White everyday cotton tee",
    color: "Natural White",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "structured-knit",
    slug: "structured-knit",
    name: "Structured Knit",
    category: "Tops",
    price: 96,
    description:
      "A softly structured knit with a clean neckline and generous fit.",
    image: "/cloths/photo-1610652492500-ded49ceeb378.avif",
    alt: "Cream structured knit sweater",
    color: "Oat",
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
  {
    id: "long-sleeve",
    slug: "heavyweight-long-sleeve",
    name: "Heavyweight Long Sleeve",
    category: "Tops",
    price: 72,
    description: "Midweight jersey with a relaxed shoulder and ribbed cuff.",
    image: "/cloths/photo-1503342217505-b0a15ec3261c.avif",
    alt: "Long sleeve cotton top",
    color: "Washed Black",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "straight-denim",
    slug: "straight-denim",
    name: "Straight Denim",
    category: "Bottoms",
    price: 118,
    description:
      "Five-pocket denim with a straight leg and softened hand feel.",
    image: "/cloths/photo-1542272604-787c3835535d.avif",
    alt: "Straight leg denim jeans",
    color: "Indigo",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "utility-trouser",
    slug: "utility-trouser",
    name: "Utility Trouser",
    category: "Bottoms",
    price: 110,
    description:
      "Practical cotton ripstop trouser with a relaxed, tapered leg.",
    image: "/cloths/photo-1515886657613-9f3515b0c78f.avif",
    alt: "Utility trouser in olive",
    color: "Olive",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: "ribbed-knit",
    slug: "ribbed-knit",
    name: "Ribbed Knit",
    category: "Knitwear",
    price: 110,
    description: "Fine rib knit with a close, comfortable fit for cooler days.",
    image: "/cloths/photo-1576566588028-4147f3842f27.avif",
    alt: "Ribbed knit sweater",
    color: "Cream",
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
  {
    id: "merino-crew",
    slug: "merino-crew",
    name: "Merino Crew",
    category: "Knitwear",
    price: 132,
    description:
      "Lightweight merino wool crewneck, finished with clean rib trims.",
    image: "/cloths/photo-1578681994506-b8f463449011.avif",
    alt: "Merino crewneck sweater",
    color: "Heather Grey",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "heavy-cardigan",
    slug: "heavy-cardigan",
    name: "Heavy Cardigan",
    category: "Knitwear",
    price: 156,
    description:
      "A substantial cardigan with horn buttons and a relaxed shape.",
    image: "/cloths/photo-1608234807905-4466023792f5.avif",
    alt: "Heavy cardigan in brown",
    color: "Cocoa",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
];

export const formatPrice = (price: number) =>
  `$${price.toLocaleString("en-US")}`;

export const categories = [
  "ALL",
  "OUTERWEAR",
  "TOPS",
  "BOTTOMS",
  "KNITWEAR",
] as const;

export type CategoryFilter = (typeof categories)[number];

export const filterProducts = (filter: CategoryFilter) =>
  filter === "ALL"
    ? products
    : products.filter((product) => product.category.toUpperCase() === filter);

export const getProduct = (id: string) =>
  products.find((product) => product.id === id);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product) =>
  products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);
