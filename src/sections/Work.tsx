import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { OrganicFlow } from '../components/OrganicFlow';
import { projects } from '../data/projects';

export function Work() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <OrganicFlow />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-purple">Real Impact</p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
            Ideas we've turned into outcomes.
          </h1>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.slug} to={`/work/${project.slug}`} data-cursor="VIEW">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden rounded-[2rem] border border-navy/10 bg-white"
                >
                  <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                    <motion.div
                      className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/5"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">
                        {project.category}
                      </p>
                      <h2 className="mt-2 font-display text-2xl text-navy">{project.name}</h2>
                      <p className="mt-3 max-w-sm text-sm text-muted">{project.description}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple"
                      size={22}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
