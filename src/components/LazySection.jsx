import { Suspense, useEffect, useRef, useState } from "react";

/**
 * Viewport-gated lazy section.
 * - Reserves vertical space via minHeight to avoid CLS / scroll jumps.
 * - Only mounts (and therefore only triggers the dynamic import / data fetch
 *   of) its children when within `rootMargin` of the viewport.
 * - Shows a lightweight skeleton until the lazy chunk resolves.
 */
const LazySection = ({ children, minHeight = "60vh", rootMargin = "400px 0px" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? (
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              style={{ minHeight }}
              className="w-full animate-pulse"
            />
          }
        >
          {children}
        </Suspense>
      ) : (
        <div aria-hidden="true" style={{ minHeight }} className="w-full" />
      )}
    </div>
  );
};

export default LazySection;
