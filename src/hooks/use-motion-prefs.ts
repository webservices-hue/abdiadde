import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Centralised motion preferences used by scroll-driven animations.
 * - `reduce`: user prefers reduced motion (OS-level setting).
 * - `isSmall`: viewport <= 768px — scroll-bound springs are expensive on
 *   low-power phones, so heavy effects should fall back to simple reveals.
 * - `lite`: convenience flag = reduce || isSmall. When true, components
 *   should skip useScroll/useSpring chains and render content statically
 *   (or use cheap whileInView reveals instead).
 */
export function useMotionPrefs() {
  const reduce = useReducedMotion() ?? false;
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return { reduce, isSmall, lite: reduce || isSmall };
}
