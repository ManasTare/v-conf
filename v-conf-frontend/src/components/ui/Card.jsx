import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hover ? { y: -5, cursor: "default" } : {}}
            className={cn(
                "rounded-xl border border-white/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-xl p-6",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
