import { cn } from "../../utils/cn";

const Input = ({ label, error, className, id, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    "flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-red-500 focus:ring-red-500/50",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500 animate-pulse">{error}</p>
            )}
        </div>
    );
};

export default Input;
