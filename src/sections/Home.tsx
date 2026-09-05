import { MapPin, Play } from 'lucide-react';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '../components/SocialIcons';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { OrganicFlow } from '../components/OrganicFlow';
import { ParallaxPanel } from '../components/ParallaxPanel';
import { HeroNavigation } from '../components/HeroNavigation';

export function Home() {
  return (
    <PageTransition>
      <div className="relative h-dvh w-full overflow-hidden bg-offwhite">
        <OrganicFlow />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[29vw] max-w-[480px] lg:block">
          <ParallaxPanel
            className="h-full w-full opacity-90"
            radius="42% 0 0 46% / 50% 0 0 54%"
            strength={22}
          />
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-offwhite via-offwhite/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-24 right-10 flex max-w-[260px] items-center gap-3 rounded-2xl border border-white/60 bg-white/85 p-3 backdrop-blur-md"
            style={{ boxShadow: '0 24px 60px -34px rgba(17,25,54,0.55)' }}
          >
            <span className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-purple-light to-royal" />
            <p className="text-[11px] leading-snug text-navy">
              Transforming Businesses Through Digital Experiences
            </p>
          </motion.div>
        </div>

        <div className="absolute right-6 top-6 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-muted lg:flex xl:right-16 xl:top-10">
          Creativity. Technology. <span className="text-navy">Digitalization</span>
          <span className="h-px w-10 bg-navy/20" />
        </div>

        <div className="relative z-10 grid h-full grid-cols-1 items-center gap-6 px-6 pb-20 pt-16 lg:grid-cols-[0.95fr_1.2fr_0.6fr] lg:gap-8 lg:px-12 lg:pb-16 lg:pt-12 xl:px-16">
          <div className="hidden lg:block">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.4rem,3.4vw,3.6rem)] leading-[1.05] text-navy"
            >
              Different
              <br />
              Ideas
              <br />
              Brighter
              <br />
              <span className="bg-gradient-to-r from-purple to-royal bg-clip-text text-transparent">
                Tomorrows.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mt-8 block h-px w-12 bg-navy/20" />
              <p className="mt-6 max-w-[19rem] text-sm leading-relaxed text-muted">
                We blend creativity, technology and strategy to build digital experiences that
                drive real impact.
              </p>

              <button
                data-cursor="PLAY"
                className="group mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-navy"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple to-royal text-white transition-transform duration-300 group-hover:scale-110">
                  <Play size={13} fill="currentColor" />
                </span>
                Watch Our Story
              </button>
            </motion.div>
          </div>

          <div className="flex items-center justify-center">
            <HeroNavigation />
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        <div className="absolute inset-x-6 bottom-5 z-20 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted lg:inset-x-12 xl:inset-x-16">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-purple" />
            <span className="hidden sm:inline">Kuala Lumpur, Malaysia</span>
          </div>
          <div className="hidden md:block">Global Ideas. Real Impact.</div>
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
        </div>
      </div>
    </PageTransition>
  );
}
