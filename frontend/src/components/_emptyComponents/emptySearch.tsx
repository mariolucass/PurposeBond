import { motion } from "framer-motion";

export const EmptySearch = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center h-full mt-12 gap-4 text-muted-foreground"
  >
    <h3 className="text-2xl font-semibold">Start your search</h3>
    <span className="text-center max-w-md text-sm">
      Use the search bar above to find users, posts or topics.
    </span>
  </motion.div>
);
