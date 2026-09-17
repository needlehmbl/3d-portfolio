import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VideoShowcase = ({ src, poster, alt = "Project demo video" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Play ${alt}`}
        className="relative w-full aspect-video overflow-hidden rounded-xl group cursor-pointer bg-black-100 border border-black-50"
      >
        {poster && (
          <img
            src={poster}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 flex-col-center gap-4">
          <span className="size-16 rounded-full bg-white/10 border border-white/25 flex-center backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="size-7 ml-1"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-white-50 text-sm uppercase tracking-widest group-hover:text-white transition-colors">
            Watch demo
          </span>
        </div>
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-200 flex-center bg-black/80 backdrop-blur-sm px-5"
            onClick={close}
          >
            <div
              className="relative w-full max-w-4xl bg-black-100 border border-black-50 rounded-xl p-5 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 text-white-50 hover:text-white text-2xl leading-none cursor-pointer z-10"
                aria-label="Close video"
              >
                &times;
              </button>

              <h3 className="text-white text-xl md:text-2xl font-semibold mb-5 pr-10">
                {alt}
              </h3>

              <div className="flex-center rounded-lg overflow-hidden min-h-[40vh] md:min-h-[55vh] bg-black-200">
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default VideoShowcase;
