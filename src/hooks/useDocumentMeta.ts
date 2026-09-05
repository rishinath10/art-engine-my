import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaForPath } from '../data/meta';

/**
 * Keeps the document title and description in step with the route. The build
 * writes the same values straight into each prerendered file, so crawlers get
 * them without running any JavaScript.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);
    document.title = title;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [pathname]);
}
