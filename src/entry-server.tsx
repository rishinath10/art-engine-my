import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { staticPaths, errorPath } from './routes';
export { metaForPath } from './data/meta';
export { SITE_URL, SITE_NAME, OG_IMAGE, LOGO_URL } from './data/site';

/**
 * Renders a route to HTML at build time. Effects don't run here, so anything
 * that touches the browser (metadata, pointer, fonts) is simply absent from the
 * markup — the client fills it in on mount.
 */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
