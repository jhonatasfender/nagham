import { useEffect, useState } from "react";
import { VIEW_MAX_WIDTH } from "../constants/layout.js";

export function useContainerSize(elementRef, options = {}) {
  const maxWidth = options.maxWidth ?? VIEW_MAX_WIDTH;
  const fallbackWidth = options.fallbackWidth ?? maxWidth;

  const [width, setWidth] = useState(fallbackWidth);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return undefined;

    const measure = () => {
      const w = el.clientWidth;
      setWidth(
        w > 0 ? Math.min(Math.round(w * 100) / 100, maxWidth) : fallbackWidth
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [elementRef, maxWidth, fallbackWidth]);

  return width;
}
