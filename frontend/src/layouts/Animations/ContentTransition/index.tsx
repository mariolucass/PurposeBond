"use client";

import { motion } from "framer-motion";

export const ContentTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
