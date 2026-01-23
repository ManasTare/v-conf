import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Button = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary: "bg-blue-600/90 hover:bg-blue-600 text-white backdrop-blur-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 border border-blue-500/20",
        secondary: "bg-purple-600/90 hover:bg-purple-600 text-white backdrop-blur-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 border border-purple-500/20",
        outline: "bg-white/10 hover:bg-white/20 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 backdrop-blur-sm",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200",
        danger: "bg-red-500/90 hover:bg-red-600 text-white shadow-lg shadow-red-500/30",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;
