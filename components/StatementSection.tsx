import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const slideUpVariant: Variants = {
  hidden: { y: 35, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function StatementSection() {
  return (
    <motion.section
      className="statement"
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }} // Triggers only when 60% of the element is in view
    >
      <motion.p className="eyebrow" variants={slideUpVariant}>
        Our point of view
      </motion.p>

      <h2>
        <span className="block overflow-hidden">
          <motion.span className="block" variants={slideUpVariant}>
            Clothing
          </motion.span>
        </span>

        <span className="block overflow-hidden">
          <motion.em className="block" variants={slideUpVariant}>
            without the noise.
          </motion.em>
        </span>
      </h2>

      <motion.div className="statement-detail" variants={slideUpVariant}>
        <p>
          Sonder Supply creates considered everyday pieces with honest
          materials, practical silhouettes, and a focus on the details that
          matter.
        </p>
        <a className="text-link" href="#story">
          Read our story <span>↗</span>
        </a>
      </motion.div>
    </motion.section>
  );
}
