import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure it overrides any browser scroll restoration
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);
    
    return () => clearTimeout(timeout);
  }, [location]);

  return null;
};

export default ScrollToTop;
