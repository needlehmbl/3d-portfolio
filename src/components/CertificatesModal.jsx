import { useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

const CertificatesModal = ({ isOpen, onClose, certificates = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
    resetZoom();
  };
  const goPrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
    resetZoom();
  };
  const goTo = (i) => {
    setActiveIndex(i);
    resetZoom();
  };

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    resetZoom();

    // Lock background scroll while modal is open (html + body)
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "+") setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
      if (e.key === "-") setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen || certificates.length === 0) return null;

  const active = certificates[activeIndex];

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom((z) => {
      const next = Math.min(Math.max(z + delta, MIN_ZOOM), MAX_ZOOM);
      if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleImageClick = () => {
    if (zoom === MIN_ZOOM) {
      setZoom(2);
    } else {
      resetZoom();
    }
  };

  const handleMouseDown = (e) => {
    if (zoom === MIN_ZOOM) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: offsetStart.current.x + dx, y: offsetStart.current.y + dy });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="fixed inset-0 z-200 flex-center bg-black/80 backdrop-blur-sm px-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black-100 border border-black-50 rounded-xl p-5 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white-50 hover:text-white text-2xl leading-none cursor-pointer z-10"
          aria-label="Close certificates"
        >
          &times;
        </button>

        <h3 className="text-white text-xl md:text-2xl font-semibold mb-5 pr-10">
          {active.name}
        </h3>

        <div
          className="relative flex-center bg-black-200 rounded-lg overflow-hidden min-h-[40vh] md:min-h-[55vh]"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={active.imgPath}
            alt={active.name}
            onClick={handleImageClick}
            draggable={false}
            className="max-h-[70vh] w-auto object-contain select-none"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor:
                zoom > MIN_ZOOM
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "zoom-in",
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
          />

          {/* Zoom controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 rounded-full px-2 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
              }}
              className="size-7 flex-center text-white text-lg rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="text-white-50 text-xs w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
              }}
              className="size-7 flex-center text-white text-lg rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

          {certificates.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 text-white flex-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Previous certificate"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 text-white flex-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Next certificate"
              >
                ›
              </button>
            </>
          )}
        </div>

        {certificates.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {certificates.map((cert, i) => (
              <button
                key={cert.name}
                onClick={() => goTo(i)}
                className={`size-2.5 rounded-full transition-colors cursor-pointer ${
                  i === activeIndex ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Go to ${cert.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesModal;
