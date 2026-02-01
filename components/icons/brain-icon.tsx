import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrainIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            animate(
                ".brain-path",
                {
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
            );
        };

        const stop = () => {
            animate(".brain-path", { scale: 1, opacity: 1 }, { duration: 0.2 });
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
                    className="brain-path"
                    d="M9.5 2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1Z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="brain-path"
                    d="M14.5 2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1Z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="brain-path"
                    d="M12 11V7l3.5-3.5"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="brain-path"
                    d="M12 7 8.5 3.5"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="brain-path"
                    d="M20 14a8 8 0 1 0-16 0c0 4.993 5.539 10.193 7.399 11.796a1 1 0 0 0 1.202 0c1.86-1.603 7.399-6.803 7.399-11.796Z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="brain-path"
                    d="M12 12v3"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    },
);

BrainIcon.displayName = "BrainIcon";
export default BrainIcon;
