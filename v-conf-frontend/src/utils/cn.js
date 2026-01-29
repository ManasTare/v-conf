/**
 * Purpose: Utility function for conditionally merging Tailwind CSS classes.
 * Wraps clsx and tailwind-merge to handle conflicts and conditional logic.
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
