import { motion, Variants } from "framer-motion";

const copyContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const textRiseVariant: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function EditorialSection() {
  return (
    <section className="editorial" id="story">
      <motion.div
        className="editorial-image overflow-hidden"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <img
          src="/cloths/photo-1483985988355-763728e1935b.avif"
          alt="Clothing rack and styling in a sunlit studio"
        />
      </motion.div>

      <motion.div
        className="editorial-copy"
        variants={copyContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.p className="eyebrow" variants={textRiseVariant}>
          02 — Field notes
        </motion.p>

        <h2>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRiseVariant}>
              The daily
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.em className="block" variants={textRiseVariant}>
              uniform.
            </motion.em>
          </span>
        </h2>

        <motion.p variants={textRiseVariant}>
          Designed to move between places, seasons, and routines. A closer look
          at the pieces that become part of your everyday.
        </motion.p>

        <motion.div variants={textRiseVariant}>
          <a className="text-link" href="#collections">
            View the story <span>↗</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
