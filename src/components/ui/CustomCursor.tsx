import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [hovered, setHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("button") ||
                target.closest("a") ||
                target.getAttribute("data-cursor") === "pointer"
            ) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.addEventListener("mousemove", moveCursor);
            window.addEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[100] h-4 w-4 rounded-full bg-gold mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%",
            }}
            animate={{
                scale: hovered ? 4 : 1,
                opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
};
