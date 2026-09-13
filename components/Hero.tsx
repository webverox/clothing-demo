import { ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function Hero() {
  // Stagger container for text elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Upward slide & fade for individual text items
  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  // Hover background animation variants
  const fillVariants: Variants = {
    initial: { x: "-100%" },
    hover: { x: "0%" },
  };

  return (
    <section className="hero" id="top">
      {/* Background Image subtle scale-down & fade on load */}
      <motion.img
        src="/cloths/photo-1539109136881-3be0616acf4b.avif"
        alt="Model in a neutral wool coat in soft daylight"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="hero-overlay" />

      {/* Staggered Content Container */}
      <motion.div
        className="hero-copy"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={itemVariants}>
          The autumn / winter collection
        </motion.p>

        <motion.h1 variants={itemVariants}>
          Everyday,
          <br />
          <em>refined.</em>
        </motion.h1>

        <motion.p className="hero-description" variants={itemVariants}>
          Essential pieces designed with intention.
        </motion.p>

        <motion.div className="hero-links" variants={itemVariants}>
          <a className="button-dark" href="#shop">
            Shop the collection <ArrowUpRight size={15} />
          </a>

          {/* Explore lookbook button with hover animation */}
          <motion.a
            className="text-link group relative overflow-hidden inline-flex items-center gap-1 z-10 px-4 py-2 transition-colors duration-300"
            href="#story"
            whileHover="hover"
            initial="initial"
          >
            {/* Background slide fill effect */}
            <motion.span
              className="absolute inset-0 bg-[var(--button-dark-bg,#18181b)] -z-10"
              variants={fillVariants}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />

            {/* Text & icon color transition */}
            <motion.span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Explore lookbook{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero Index Fade */}
      <motion.p
        className="hero-index"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        01 / 04
      </motion.p>
    </section>
  );
}
