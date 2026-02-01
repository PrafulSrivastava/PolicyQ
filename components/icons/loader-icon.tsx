import { forwardRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion } from "motion/react";

const LoaderIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        return (
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </motion.svg>
        );
    },
);

LoaderIcon.displayName = "LoaderIcon";
export default LoaderIcon;
