// Import styles
import { styled } from "styled-components";
// Import hooks
import { useState, useEffect, useRef } from "react";
// Import components
import Content from "./Content.jsx";
import LeftArrowSVG from "../LeftArrowSVG.jsx";
import RightArrowSVG from "../RightArrowSVG.jsx";

const Container = styled.div`
  width: 60rem;
  height: 20rem;
  position: relative;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;

const IconContainer = styled.div`
  cursor: pointer;

  z-index: 1;
  right: 0;
  top: 50%;
  position: absolute;
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  border-radius: 50%;
  transform: translate(50%, -50%);
  background-color: var(--color-magenta);

  ${(props) =>
    props.$right && "left:0;right:auto;  transform: translate(-50%,-50%);"}
`;

// Export block carousel component
function BlockCarousel({ t }) {
  // Initialize hooks
  const timeoutRef = useRef(null);
  const [contentId, setContentId] = useState(1);

  const changeContent = (value) => {
    if (value > 0 && value <= 4) {
      setContentId(value);
    }
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // UseEffect for timoutRef
  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      const elements = document.getElementById("carousel content").children;

      // Toggle animation
      for (let i = 1; i < elements.length; i++) {
        elements[i].classList.remove("w3-animate-right");
        setTimeout(() => {
          elements[i].classList.add("w3-animate-right");
        }, 1);
      }

      setContentId(contentId === 4 ? 1 : contentId + 1);
    }, 5000);

    // Remove timout when unmounted
    return () => {
      resetTimeout();
    };
  }, [contentId]);

  return (
    <Container className="w3-animate-right">
      {/* Right arrow */}
      <IconContainer $right onClick={() => changeContent(contentId - 1)}>
        <RightArrowSVG />
      </IconContainer>

      {/* Carousel content */}
      <Content contentId={contentId} setContentId={setContentId} t={t} />

      {/* Left arrow */}
      <IconContainer onClick={() => changeContent(contentId + 1)}>
        <LeftArrowSVG />
      </IconContainer>
    </Container>
  );
}

export default BlockCarousel;
