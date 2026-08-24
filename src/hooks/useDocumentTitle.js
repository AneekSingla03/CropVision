import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | CropVision` : 'CropVision - Smart Agriculture';

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
