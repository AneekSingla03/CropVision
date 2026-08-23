import { useEffect } from 'react';

/**
 * useDocumentTitle Custom Hook
 * 
 * Synchronizes the document title with the active page.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | CropVision` : 'CropVision - Smart Agriculture';

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
