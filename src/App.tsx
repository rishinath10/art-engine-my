import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { SiteDock } from './components/SiteDock';
import { TransitionProvider } from './context/TransitionContext';
import { Preloader } from './components/Preloader';
import { appRoutes } from './routes';
import { useDocumentMeta } from './hooks/useDocumentMeta';

function App() {
  const location = useLocation();
  const isHub = location.pathname === '/';

  useDocumentMeta();

  // the veil covers the screen while this happens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <TransitionProvider>
      <div className="cursor-enabled relative">
        <Preloader />
        <CustomCursor />
        {!isHub && (
          <>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <SiteDock />
          </>
        )}
        {/* wait: the outgoing page leaves before the next arrives, so two
            full-page backgrounds are never composited at once */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </AnimatePresence>
      </div>
    </TransitionProvider>
  );
}

export default App;
