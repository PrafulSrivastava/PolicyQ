import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DislikeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            await animate(
                ".dislike-icon",
                {
                    rotate: [0, -8, 5, 0],
                    y: [0, 2, -2, 0],
                },
                { duration: 0.6, ease: "easeInOut" },
            );
        };

        const stop = () => {
            animate(
                ".dislike-icon",
                { rotate: 0, y: 0 },
                { duration: 0.2, ease: "easeOut" },
            );
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
                <motion.g className="dislike-icon" style={{ transformOrigin: "center" }}>
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.07zm0-6h0" />
                </motion.g>
            </motion.svg>
        );
    },
);

DislikeIcon.displayName = "DislikeIcon";
export default DislikeIcon;
