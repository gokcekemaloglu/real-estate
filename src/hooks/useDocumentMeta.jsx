import { useEffect } from 'react';
// Site-wide defaults — must match what's already in index.html, since
// this hook resets to these values when a page-specific title isn't
// provided or when the component unmounts (so navigating away from a
// property detail page, for example, doesn't leave its title behind on
// the next page you visit).
const DEFAULT_TITLE = "Görkem Emlak | Adana Satılık ve Kiralık Gayrimenkul İlanları";
const DEFAULT_DESCRIPTION = "Görkem Emlak ile Adana'da satılık, kiralık ve devren gayrimenkul ilanlarını keşfedin. Daire, villa, arsa ve ticari mülk portföyümüze göz atın.";
 
/**
 * useDocumentMeta
 * -----------------
 * Sets document.title and the <meta name="description"> tag for the
 * page this hook is called from. This is a client-side-only update —
 * it helps Google's crawler (which does execute JavaScript) index each
 * page with its own title/description, but it does NOT affect social
 * media link-preview cards (WhatsApp, Facebook, etc.), since those
 * bots only read the static index.html without running JS. That would
 * require server-side rendering, which is out of scope here.
 *
 * Call this unconditionally near the top of a page component, same as
 * any other hook. Pass undefined for either argument to fall back to
 * the site-wide default.
 */
const useDocumentMeta = (title, description) => {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
 
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement("meta");
      metaDescriptionTag.setAttribute("name", "description");
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute("content", description || DEFAULT_DESCRIPTION);
 
    return () => {
      document.title = DEFAULT_TITLE;
      metaDescriptionTag.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}

export default useDocumentMeta