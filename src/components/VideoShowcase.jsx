import { useCallback, useEffect, useRef, useState } from "react";

const VideoShowcase = ({ src, poster, alt = "Project demo video" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(() => !src);

  const isPlaceholder = !src || videoError;

  useEffect(() => {
    if (!src) return;
    const video = document.createElement("video");
    const handleLoadedMetadata = () => setVideoError(false);
    const handleError = () => setVideoError(true);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  const open = useCallback(() => {
    setVideoError(false);
    setIsOpen(true);
  }, []);
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
            {isPlaceholder ? "Demo video coming soon" : "Watch demo"}
          </span>
        </div>
      </button>

      {isOpen && (
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
              {isPlaceholder ? (
                <div className="flex flex-col items-center gap-5 p-8">
                  <div className="size-20 rounded-full bg-white/5 border border-white/10 flex-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="size-10 ml-1 opacity-30"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white-50 text-lg text-center">
                    Demo video coming soon
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={() => setVideoError(true)}
                >
                  <source src={src} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoShowcase;
