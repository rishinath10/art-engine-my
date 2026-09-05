import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { STORY_VIDEO_URL } from '../data/site';

const isFile = /\.(mp4|webm|mov)$/i.test(STORY_VIDEO_URL);

/**
 * Full-screen player for the brand film. Only mounted when a video URL is
 * configured; Home routes the button to /about otherwise.
 */
export function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Our story"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/70 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl"
            style={{ aspectRatio: '16 / 9' }}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {isFile ? (
              <video src={STORY_VIDEO_URL} controls autoPlay playsInline className="h-full w-full" />
            ) : (
              <iframe
                src={STORY_VIDEO_URL}
                title="Art Engine — Our Story"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </motion.div>

          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-9 md:top-9"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
