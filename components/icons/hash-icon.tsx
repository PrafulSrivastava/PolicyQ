import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const HashIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            animate(".hash-path", { pathLength: [0, 1] }, { duration: 0.4 });
        };

        const stop = () => {
            animate(".hash-path", { pathLength: 1 }, { duration: 0.2 });
        };

        useImperativeHandle(ref, () => ({
            startAnimation: start,
            stopAnimation: stop,
        }));

        return (
            <motion.svg
                ref={scope}
                onHoverStart={start}
                onHoverEnd={stop}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`cursor-pointer ${className}`}
            >
                <motion.path className="hash-path" d="M4 9h16" />
                <motion.path className="hash-path" d="M4 15h16" />
                <motion.path className="hash-path" d="M10 3L8 21" />
                <motion.path className="hash-path" d="M16 3l-2 18" />
            </motion.svg>
        );
    },
);

HashIcon.displayName = "HashIcon";
export default HashIcon;
