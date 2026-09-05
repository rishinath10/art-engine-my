import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ParallaxPanel } from '../components/ParallaxPanel';
import { projects } from '../data/projects';

export function WorkCaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <Link
          to="/work"
          data-cursor="BACK"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted hover:text-purple"
        >
          <ArrowLeft size={16} /> All Work
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-purple">{project.category}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-navy sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-8 max-w-md text-lg text-muted">{project.summary}</p>
          </div>
          <ParallaxPanel className="h-[320px] w-full lg:h-[440px]" />
        </div>
      </div>
    </PageTransition>
  );
}
