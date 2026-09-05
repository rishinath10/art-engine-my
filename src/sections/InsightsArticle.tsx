import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { AbstractForm } from '../components/AbstractForm';
import { insights } from '../data/insights';
import { TransitionLink } from '../components/TransitionLink';

export function InsightsArticle() {
  const { slug } = useParams();
  const index = insights.findIndex((p) => p.slug === slug);
  const post = insights[index];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.4 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!post) return <Navigate to="/insights" replace />;

  const next = insights[(index + 1) % insights.length];

  return (
    <PageTransition>
      <div className="relative min-h-dvh overflow-hidden bg-offwhite">
        <AuroraBackground />

        {mounted && (
          <motion.div
            className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-gradient-to-r from-purple to-royal"
            style={{ scaleX: progress }}
          />
        )}

        <div className="relative z-10 px-6 pb-28 pt-28 md:px-14 md:pt-32">
          <div className="mx-auto max-w-2xl">
            <TransitionLink
              to="/insights"
              data-cursor="BACK"
              className="group inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-purple"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-500 group-hover:-translate-x-1"
              />
              All Insights
            </TransitionLink>

            <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.3em] text-purple">
              {post.category} · {post.date} · {post.readTime}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-navy">
              {post.title}
            </h1>
            <p className="mt-8 font-serif text-[19px] leading-relaxed text-navy/70">
              {post.excerpt}
            </p>
          </div>

          <div className="mx-auto mt-14 aspect-[16/9] max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/70">
            <AbstractForm className="h-full w-full" seed={index + 1} />
          </div>

          <article className="mx-auto mt-16 max-w-2xl space-y-8">
            {post.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`font-serif text-[18px] leading-[1.85] text-navy/80 ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2rem] first-letter:font-light first-letter:leading-[0.8] first-letter:text-purple'
                    : ''
                }`}
              >
                {para}
              </motion.p>
            ))}
          </article>

          <div className="mx-auto mt-24 max-w-2xl border-t border-navy/10 pt-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
              Next Reading
            </p>
            <TransitionLink
              to={`/insights/${next.slug}`}
              data-cursor="READ"
              className="group mt-4 flex items-baseline gap-5"
            >
              <span className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-tight text-navy transition-colors duration-500 group-hover:text-purple">
                {next.title}
              </span>
              <ArrowRight
                size={24}
                className="shrink-0 self-center text-navy transition-transform duration-500 group-hover:translate-x-2 group-hover:text-purple"
              />
            </TransitionLink>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
