import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { SiteDock } from './components/SiteDock';
import { TransitionProvider } from './context/TransitionContext';
import { Home } from './sections/Home';

// Destinations load on demand so the hub paints as early as possible.
const About = lazy(() => import('./sections/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./sections/Services').then((m) => ({ default: m.Services })));
const Work = lazy(() => import('./sections/Work').then((m) => ({ default: m.Work })));
const WorkCaseStudy = lazy(() =>
  import('./sections/WorkCaseStudy').then((m) => ({ default: m.WorkCaseStudy })),
);
const Insights = lazy(() => import('./sections/Insights').then((m) => ({ default: m.Insights })));
const InsightsArticle = lazy(() =>
  import('./sections/InsightsArticle').then((m) => ({ default: m.InsightsArticle })),
);
const Contact = lazy(() => import('./sections/Contact').then((m) => ({ default: m.Contact })));
const StartProject = lazy(() =>
  import('./sections/StartProject').then((m) => ({ default: m.StartProject })),
);

function App() {
  const location = useLocation();
  const isHub = location.pathname === '/';

  return (
    <TransitionProvider>
      <div className="cursor-enabled relative">
        <CustomCursor />
        {!isHub && <SiteDock />}
        <Suspense fallback={<div className="min-h-dvh bg-offwhite" />}>
          <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkCaseStudy />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightsArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/start-a-project" element={<StartProject />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </TransitionProvider>
  );
}

export default App;
