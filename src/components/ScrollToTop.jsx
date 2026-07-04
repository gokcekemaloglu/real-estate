import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  // Listens strictly to global URL pathname changes.
  // Instantly forces browser viewport scrolling coordinates back to baseline 0 upon entry!
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null; // This structural cila anchor renders absolutely nothing on the DOM tree layout
};

export default ScrollToTop;
