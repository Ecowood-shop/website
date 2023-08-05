// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import Youtube from "./Youtube";
import SlideShow from "./SlideShow";
// Import hooks
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  position: relative;

  height: ${(props) => (props.$youtube ? "max-content" : "auto")};

  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;


  ${respondTo.tablet`
    width:80%;
  `}

  ${respondTo.laptop`
    width: 60%;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.desktop`
    width:50%;
  `}
`;

const ButtonContainer = styled.div`
  bottom: 0;
  right: 1rem;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 3rem 0.3rem 3rem;

  color: var(--white);
  font-size: var(--small-m);
  text-transform: capitalize;
  transform: translateY(100%);
  border-radius: 0 0 100px 100px;
  transition: color 1ms ease-in-out;
  background-color: ${(props) =>
    props.$youtube ? "var(--error)" : "var(--darkmagenta)"};

  ${respondTo.laptop`
    right:auto;
    left:0;
    bottom:1rem;
    writing-mode: tb-rl;
    transform: rotate(-180deg) translateX(100%); 
    padding: 2rem 0.3rem 2rem 0.2rem;
    border-radius: 0  100px  100px 0;
  `}

  ${respondTo.desktop`
    &:hover{
      cursor:pointer;
      color:var(--whiteWithOpacity)
    }
  `}
`;

// Export gallery
function Gallery({ t, product }) {
  // Initialize hooks
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Container $youtube={isOpen}>
      {/* If is open show slideshow else youtube */}
      {isOpen ? (
        <SlideShow product={product} />
      ) : (
        <Youtube url={product.youtubeUrl} />
      )}

      {/* Show if product has youtube video */}
      {product.youtubeUrl && (
        <ButtonContainer $youtube={isOpen} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "youtube" : t("product.gallery")}
        </ButtonContainer>
      )}
    </Container>
  );
}

export default Gallery;
