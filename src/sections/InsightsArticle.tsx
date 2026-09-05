import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { insights } from '../data/insights';

export function InsightsArticle() {
  const { slug } = useParams();
  const post = insights.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/insights" replace />;

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40">
        <Link
          to="/insights"
          data-cursor="BACK"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted hover:text-purple"
        >
          <ArrowLeft size={16} /> All Insights
        </Link>

        <div className="mx-auto mt-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-purple">
            {post.category} · {post.date}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.15] text-navy sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
