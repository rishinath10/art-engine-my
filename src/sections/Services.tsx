import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { services } from '../data/services';

export function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <AuroraBackground />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-purple">What We Do</p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
            Digital solutions designed to move businesses forward.
          </h1>

          <div className="mt-16 border-t border-navy/10">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                onMouseEnter={() => setActive(service.slug)}
                onMouseLeave={() => setActive(null)}
                data-cursor="VIEW"
                className="group relative flex cursor-pointer flex-col justify-between gap-3 border-b border-navy/10 py-8 md:flex-row md:items-center md:gap-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-sm text-purple-light">0{i + 1}</span>
                  <h2 className="font-display text-2xl text-navy transition-colors duration-300 group-hover:text-purple md:text-3xl">
                    {service.title}
                  </h2>
                </div>
                <motion.p
                  animate={{ opacity: active === service.slug ? 1 : 0.6 }}
                  className="max-w-md text-sm text-muted md:text-base"
                >
                  {service.tagline}
                </motion.p>
                <ArrowUpRight
                  className="hidden shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple md:block"
                  size={22}
                />
              </motion.div>
            ))}
          </div>

          <Link
            to="/start-a-project"
            data-cursor="OPEN"
            className="mt-16 inline-block text-sm uppercase tracking-[0.15em] text-navy underline decoration-purple-light underline-offset-8 hover:text-purple"
          >
            Have something specific in mind? Start a project →
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
