import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ZapIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            animate(
                ".zap-path",
                {
                    scale: [1, 1.2, 1],
                    filter: ["drop-shadow(0 0 0px #eab308)", "drop-shadow(0 0 8px #eab308)", "drop-shadow(0 0 0px #eab308)"],
                },
                { duration: 0.4, ease: "easeInOut" },
            );
        };

        const stop = () => {
            animate(".zap-path", { scale: 1, filter: "none" }, { duration: 0.2 });
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
                    className="zap-path"
                    d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    },
);

ZapIcon.displayName = "ZapIcon";
export default ZapIcon;
