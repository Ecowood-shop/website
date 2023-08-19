// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
import { ArrowUpSVG } from "../../../static/icons/components";
// Import hooks
import { useState, useEffect } from "react";

const Container = styled.button`
  left: 0.5rem;
  bottom: 0;

  position: fixed;

  border: none;
  background: transparent;

  ${respondTo.laptop`
     left: 1rem;
     bottom: 0.5rem;
  `}

  ${respondTo.desktop`
     left: 1rem;
     bottom: 0.5rem;
  `}
`;

// Export scroller component
const Scroller = () => {
  // Initialize hooks
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // Adjust the speed as needed

    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <>
      {isVisible && (
        <Container onClick={scrollToTop}>
          <ArrowUpSVG />
        </Container>
      )}
    </>
  );
};

export default Scroller;
