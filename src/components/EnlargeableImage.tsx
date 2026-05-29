import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EnlargeableImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export default function EnlargeableImage({
  src,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
}: EnlargeableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary rounded-[inherit]"
        aria-label={`Enlarge image: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          className={className}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img loading="lazy"
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}
