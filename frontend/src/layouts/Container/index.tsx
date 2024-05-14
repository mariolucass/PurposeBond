import { IChildren } from "@/interfaces/global";
import { motion } from "framer-motion";

export const Container = ({ children }: IChildren) => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.1,
      }}
    >
      {children}
    </motion.div>
  );
};
