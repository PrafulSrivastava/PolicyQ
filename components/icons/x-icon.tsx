import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const XIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            animate(".x-path", { rotate: 90 }, { duration: 0.2 });
        };

        const stop = () => {
            animate(".x-path", { rotate: 0 }, { duration: 0.2 });
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
                <motion.path
                    className="x-path"
                    d="M18 6 6 18"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="x-path"
                    d="m6 6 12 12"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    },
);

XIcon.displayName = "XIcon";
export default XIcon;
