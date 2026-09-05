import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { OrganicFlow } from '../components/OrganicFlow';
import { insights } from '../data/insights';

export function Insights() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <OrganicFlow />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-purple">Ideas & Trends</p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
            Perspectives for
            <br />a Digital Tomorrow
          </h1>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {insights.map((post) => (
              <Link key={post.slug} to={`/insights/${post.slug}`} data-cursor="READ" className="group">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-lavender to-purple-light transition-transform duration-500 group-hover:-translate-y-1" />
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted">
                  {post.category} · {post.date}
                </p>
                <h2 className="mt-2 flex items-start justify-between gap-3 font-display text-xl text-navy group-hover:text-purple">
                  {post.title}
                  <ArrowUpRight className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                </h2>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
