import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { MinimalArt } from '../components/MinimalArt';
import { insights } from '../data/insights';
import { TransitionLink } from '../components/TransitionLink';

export function Insights() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [lead, ...rest] = insights;

  return (
    <PageShell
      eyebrow="04 — Ideas & Trends"
      title={
        <>
          Perspectives for
          <br />
          <span className="italic">a Digital Tomorrow</span>
        </>
      }
      intro="Thinking on AI, digitalization and the craft of building digital experiences that last."
      nextId="contact"
    >
      <Reveal>
        <TransitionLink
          to={`/insights/${lead.slug}`}
          data-cursor="READ"
          onMouseEnter={() => setHovered(lead.slug)}
          onMouseLeave={() => setHovered(null)}
          className="group grid gap-10 border-t border-navy/10 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16"
        >
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-royal/70">
              Latest · {lead.category} · {lead.readTime}
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.1] text-navy transition-colors duration-500 group-hover:text-purple">
              {lead.title}
            </h2>
            <p className="mt-6 max-w-lg font-sans text-[15px] font-light leading-[1.9] text-muted">
              {lead.excerpt}
            </p>
            <span className="mt-8 inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em] text-navy">
              Read the piece
              <ArrowUpRight
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>

          <motion.div
            animate={{ y: hovered === lead.slug ? -8 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[5/4] overflow-hidden rounded-[2.5rem] border border-white/70"
          >
            <motion.div
              className="h-full w-full"
              animate={{ scale: hovered === lead.slug ? 1.06 : 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <MinimalArt className="h-full w-full" variant={lead.art} />
            </motion.div>
          </motion.div>
        </TransitionLink>
      </Reveal>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1}>
            <TransitionLink
              to={`/insights/${post.slug}`}
              data-cursor="READ"
              onMouseEnter={() => setHovered(post.slug)}
              onMouseLeave={() => setHovered(null)}
              className="glass group block overflow-hidden rounded-3xl p-6 transition-shadow duration-500 md:p-7"
            >
              <motion.div
                animate={{ y: hovered === post.slug ? -6 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <motion.div
                  className="h-full w-full"
                  animate={{ scale: hovered === post.slug ? 1.06 : 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MinimalArt className="h-full w-full" variant={post.art} />
                </motion.div>
              </motion.div>

              <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.24em] text-royal/70">
                {post.category} · {post.readTime}
              </p>
              <h2 className="mt-3 flex items-start justify-between gap-4 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-light leading-tight text-navy transition-colors duration-500 group-hover:text-purple">
                {post.title}
                <ArrowUpRight
                  size={20}
                  className="mt-1 shrink-0 opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </h2>
              <p className="mt-4 font-sans text-[14px] font-light leading-[1.85] text-muted">
                {post.excerpt}
              </p>
            </TransitionLink>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
