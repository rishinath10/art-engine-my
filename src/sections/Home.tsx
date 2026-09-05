import { useCallback, useState } from 'react';
import { MapPin, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { NavNode } from '../data/navigation';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '../components/SocialIcons';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { ParallaxPanel } from '../components/ParallaxPanel';
import { HeroNavigation } from '../components/HeroNavigation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useScrollLock } from '../hooks/useScrollLock';

const rise = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

export function Home() {
  const [active, setActive] = useState<NavNode | null>(null);
  const handleHoverChange = useCallback((node: NavNode | null) => setActive(node), []);
  const isCompact = useMediaQuery('(max-width: 1023px)');

  // the hub fits the viewport exactly, so nothing below it is worth scrolling to
  useScrollLock(isCompact);

  const supporting = (
    <motion.div
      {...rise}
      transition={{ duration: 1.1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center lg:items-start"
    >
      <span className="mt-8 block h-px w-12 bg-navy/20 [@media(max-height:760px)]:mt-5 lg:mt-9" />
      <p className="mt-5 max-w-[19rem] text-center font-sans text-[13px] font-light leading-[1.75] tracking-wide text-muted [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-[12px] lg:mt-6 lg:text-left">
        We blend creativity, technology and strategy to build digital experiences that drive real
        impact.
      </p>

      <button
        data-cursor="PLAY"
        className="group mt-7 flex items-center gap-4 font-sans text-[10px] font-normal uppercase tracking-[0.24em] text-navy [@media(max-height:760px)]:mt-4 lg:mt-11"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple to-royal text-white transition-transform duration-500 group-hover:scale-110">
          <Play size={12} fill="currentColor" />
        </span>
        Watch Our Story
      </button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="relative h-dvh w-full overflow-hidden bg-offwhite">
        <AuroraBackground />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[29vw] max-w-[480px] lg:block">
          <div
            className="h-full w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 8%, rgba(0,0,0,0.55) 40%, black 72%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 8%, rgba(0,0,0,0.55) 40%, black 72%)',
            }}
          >
            <ParallaxPanel
              className="h-full w-full"
              radius="42% 0 0 46% / 50% 0 0 54%"
              strength={22}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-24 right-10 flex max-w-[250px] items-center gap-3 rounded-2xl border border-white/70 bg-white/45 p-3.5 backdrop-blur-2xl"
            style={{
              boxShadow:
                '0 24px 60px -34px rgba(17,25,54,0.5), inset 0 1px 0 0 rgba(255,255,255,0.8)',
            }}
          >
            <span className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-purple-light to-royal" />
            <p className="font-serif text-[12px] leading-snug text-navy">
              Transforming Businesses Through Digital Experiences
            </p>
          </motion.div>
        </div>

        <motion.div
          {...rise}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 top-7 z-20 hidden items-center gap-3 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-muted lg:flex xl:right-16 xl:top-10"
        >
          Creativity. Technology. <span className="text-navy">Digitalization</span>
          <span className="h-px w-10 bg-navy/20" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col px-6 lg:grid lg:grid-cols-[0.95fr_1.15fr_0.62fr] lg:items-center lg:gap-8 lg:px-12 xl:px-16">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center pt-10 text-center [@media(max-height:760px)]:pt-6 lg:flex-none lg:justify-start lg:items-start lg:pt-0 lg:text-left">
            <motion.p
              {...rise}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[9px] font-light uppercase tracking-[0.32em] text-muted lg:hidden"
            >
              Creativity · Technology · Digitalization
            </motion.p>

            <motion.h1
              {...rise}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[clamp(2.4rem,8.2vw,3.05rem)] [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:text-[clamp(1.9rem,6.6vw,2.4rem)] font-light leading-[1.04] tracking-[-0.02em] text-navy sm:text-[clamp(3rem,6vw,4rem)] lg:mt-0 lg:text-[clamp(3rem,4.4vw,4.5rem)]"
            >
              Different
              <span className="lg:hidden"> </span>
              <br className="hidden lg:inline" />
              Ideas
              <br />
              Brighter
              <span className="lg:hidden"> </span>
              <br className="hidden lg:inline" />
              <span className="bg-gradient-to-r from-purple to-royal bg-clip-text italic text-transparent">
                Tomorrows.
              </span>
            </motion.h1>

            <div className="hidden lg:block">{supporting}</div>
          </div>

          <div className="flex shrink-0 items-center justify-center lg:flex-1">
            <HeroNavigation onHoverChange={handleHoverChange} />
          </div>

          {/* on mobile the supporting copy sits under the ring so the hub
              stays centred in the viewport */}
          <div className="safe-b flex min-h-0 flex-1 flex-col items-center justify-center pb-14 [@media(max-height:760px)]:pb-9 lg:hidden">
            {supporting}
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        <motion.div
          {...rise}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="safe-b safe-x absolute inset-x-6 bottom-4 z-20 flex items-center justify-between font-sans text-[9px] font-light uppercase tracking-[0.24em] text-muted lg:bottom-5 lg:inset-x-12 xl:inset-x-16 lg:text-[10px]"
        >
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-purple" />
            <span className="sm:hidden">Kuala Lumpur</span>
            <span className="hidden sm:inline">Kuala Lumpur, Malaysia</span>
            <span className="hidden xl:inline text-muted/50">— 3.1390° N, 101.6869° E</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="h-px w-8 bg-navy/15" />
            <span className="flex items-baseline gap-1 tabular-nums">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={active?.index ?? '00'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-navy"
                >
                  {active?.index ?? '00'}
                </motion.span>
              </AnimatePresence>
              <span className="text-muted/50">/ 06</span>
            </span>
            <span className="h-px w-8 bg-navy/15" />
          </div>
          <div className="flex items-center gap-4 text-navy">
            <a href="#" data-cursor="VISIT" aria-label="LinkedIn" className="hover:text-purple">
              <LinkedInIcon />
            </a>
            <a href="#" data-cursor="VISIT" aria-label="Instagram" className="hover:text-purple">
              <InstagramIcon />
            </a>
            <a href="#" data-cursor="VISIT" aria-label="YouTube" className="hover:text-purple">
              <YouTubeIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
