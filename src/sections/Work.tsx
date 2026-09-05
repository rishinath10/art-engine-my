import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { AbstractForm } from '../components/AbstractForm';
import { ProjectArt } from '../components/ProjectArt';
import { projects } from '../data/projects';
import { TransitionLink } from '../components/TransitionLink';

export function Work() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <PageShell
      eyebrow="03 — Real Impact"
      title={
        <>
          Ideas we've turned
          <br />
          <span className="italic">into outcomes</span>
        </>
      }
      intro="A selection of work across branding, platforms, automation and campaigns. Every one started as a conversation about a problem."
      nextId="insights"
    >
      <div className="grid gap-10 md:gap-14 lg:grid-cols-2">
        {projects.map((project, i) => {
          const isHovered = hovered === project.slug;
          return (
            <Reveal key={project.slug} delay={(i % 2) * 0.1}>
              <TransitionLink
                to={`/work/${project.slug}`}
                data-cursor="VIEW"
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
                className={`group block ${i % 2 === 1 ? 'lg:mt-16' : ''}`}
              >
                <motion.div
                  animate={{ y: isHovered ? -10 : 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/40 backdrop-blur-xl"
                  style={{ boxShadow: '0 30px 70px -50px rgba(17,25,54,0.5)' }}
                >
                  <div className="relative h-[300px] overflow-hidden md:h-[380px]">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: isHovered ? 1.06 : 1 }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {project.art ? (
                        <ProjectArt className="h-full w-full" variant={project.art} />
                      ) : (
                        <AbstractForm className="h-full w-full" seed={project.seed} />
                      )}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.7 }}
                    />
                    <span className="absolute left-7 top-7 rounded-full border border-white/70 bg-white/45 px-4 py-1.5 font-sans text-[9px] uppercase tracking-[0.22em] text-navy backdrop-blur-xl">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-6 p-8 md:p-10">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-royal/70">
                        {project.category}
                      </p>
                      <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-tight text-navy transition-colors duration-500 group-hover:text-purple">
                        {project.name}
                      </h2>
                      <p className="mt-4 max-w-sm font-sans text-[14px] font-light leading-[1.8] text-muted">
                        {project.description}
                      </p>
                    </div>
                    <motion.span
                      animate={{
                        x: isHovered ? 4 : 0,
                        y: isHovered ? -4 : 0,
                        opacity: isHovered ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-1 shrink-0 text-navy group-hover:text-purple"
                    >
                      <ArrowUpRight size={24} />
                    </motion.span>
                  </div>
                </motion.div>
              </TransitionLink>
            </Reveal>
          );
        })}
      </div>
    </PageShell>
  );
}
