import { useEffect, useState } from 'react';
import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, ZoomIn, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  sort?: number;
}

interface GalleryData {
  id: string;
  tagline?: string;
  headline?: string;
  items?: GalleryItem[];
}

interface GalleryProps {
  data: GalleryData;
}

const Gallery = ({ data }: GalleryProps) => {
  const { tagline, headline, items } = data;

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedItems = items ? [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)) : [];
  const isValidIndex = sortedItems.length > 0 && currentIndex >= 0 && currentIndex < sortedItems.length;

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sortedItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < sortedItems.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
      if (e.key === 'Escape') { e.preventDefault(); setLightboxOpen(false); }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIndex]);

  return (
    <section className="relative" aria-label={headline || 'Gallery'}>
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}

      {sortedItems.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className="relative overflow-hidden rounded-lg group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[300px] w-full border-0 bg-transparent p-0"
              onClick={() => handleOpenLightbox(index)}
              aria-label={`View gallery item ${index + 1} of ${sortedItems.length}`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-500">Image not available</div>
              )}
              <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                <ZoomIn className="size-10 text-gray-800" />
              </div>
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && isValidIndex && (
        <Dialog open={isLightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent
            className="flex max-w-full max-h-full items-center justify-center p-2 bg-transparent border-none z-50"
            hideCloseButton
          >
            <DialogTitle className="sr-only">Gallery Image</DialogTitle>
            <DialogDescription className="sr-only">
              Viewing image {currentIndex + 1} of {sortedItems.length}.
            </DialogDescription>
            <div className="relative flex justify-center items-center w-[90vw] h-[90vh]">
              <img
                src={sortedItems[currentIndex].image}
                alt={`Gallery item ${currentIndex + 1}`}
                className="size-full object-contain"
              />
            </div>
            <div className="absolute bottom-4 inset-x-0 flex justify-between items-center px-4">
              <button type="button" className="flex items-center gap-2 text-white bg-black bg-opacity-70 rounded-full px-4 py-2 hover:bg-opacity-90" onClick={handlePrev} aria-label="Previous">
                <ArrowLeft className="size-8" /><span>Prev</span>
              </button>
              <button type="button" className="flex items-center gap-2 text-white bg-black bg-opacity-70 rounded-full px-4 py-2 hover:bg-opacity-90" onClick={handleNext} aria-label="Next">
                <span>Next</span><ArrowRight className="size-8" />
              </button>
            </div>
            <DialogClose asChild>
              <button type="button" className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90" aria-label="Close">
                <X className="size-8" />
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Gallery;
