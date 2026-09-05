import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { SiteDock } from './components/SiteDock';
import { TransitionProvider } from './context/TransitionContext';
import { Home } from './sections/Home';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Work } from './sections/Work';
import { WorkCaseStudy } from './sections/WorkCaseStudy';
import { Insights } from './sections/Insights';
import { InsightsArticle } from './sections/InsightsArticle';
import { Contact } from './sections/Contact';
import { StartProject } from './sections/StartProject';

function App() {
  const location = useLocation();
  const isHub = location.pathname === '/';

  return (
    <TransitionProvider>
      <div className="cursor-enabled relative">
        <CustomCursor />
        {!isHub && <SiteDock />}
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
      </div>
    </TransitionProvider>
  );
}

export default App;
