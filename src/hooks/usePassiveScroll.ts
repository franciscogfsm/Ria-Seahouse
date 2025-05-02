import { useEffect } from "react";

interface UsePassiveScrollOptions {
  onScroll?: () => void;
  onTouchStart?: (e: Event) => void;
  onTouchMove?: (e: Event) => void;
  target?: HTMLElement | Window | null;
}

export const usePassiveScroll = ({
  onScroll,
  onTouchStart,
  onTouchMove,
  target = null,
}: UsePassiveScrollOptions = {}) => {
  useEffect(() => {
    const element = target || window;

    if (onScroll) {
      element.addEventListener("scroll", onScroll, { passive: true });
    }

    if (onTouchStart) {
      element.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    if (onTouchMove) {
      element.addEventListener("touchmove", onTouchMove, { passive: true });
    }

    return () => {
      if (onScroll) {
        element.removeEventListener("scroll", onScroll);
      }
      if (onTouchStart) {
        element.removeEventListener("touchstart", onTouchStart);
      }
      if (onTouchMove) {
        element.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, [onScroll, onTouchStart, onTouchMove, target]);
};
