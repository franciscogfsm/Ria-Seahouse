import { useCallback } from "react";

export const useSmoothScroll = () => {
  const scrollToElement = useCallback(
    (element: HTMLElement, offset: number = 0) => {
      const startPosition = window.scrollY;
      const targetPosition =
        window.scrollY + element.getBoundingClientRect().top - offset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(1000, Math.max(500, Math.abs(distance) * 0.5)); // Dynamic duration based on distance

      const start = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const currentPosition =
          startPosition + distance * easeInOutCubic(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },
    []
  );

  return scrollToElement;
};
