// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";
// Import components
import Scroller from "./components/Scroller";

// Export scroll to top
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Delay the scroll action by a short timeout
    const scrollTimeout = setTimeout(scrollToTop, 100); // Adjust the timeout as needed

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [location]);
  return (
    <>
      {props.children}
      {props.visible && <Scroller />}
    </>
  );
};

export default ScrollToTop;
