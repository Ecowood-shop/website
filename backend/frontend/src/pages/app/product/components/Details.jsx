// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  margin: 2rem 0;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);

  ${respondTo.desktop`
      display: flex;
      align-items: center;
      justify-content: space-evenly;
  `}

  ${respondTo.tv`
      display: flex;
      align-items: center;
      justify-content: space-evenly;
  `}
`;

const Title = styled.h3`
  padding: 0;
  white-space: pre;

  color: var(--black);
  font-size: var(--small-l);
  text-transform: capitalize;

  transition: color 1ms ease-in-out;
  font-weight: ${(props) => (props.$active ? "bolder" : "normal")};

  &:nth-of-type(3) {
    grid-column: span 2;
    text-align: center;
  }

  ${respondTo.mobile`
    font-size:var(--small-m);
  `}
  ${respondTo.desktop`
    cursor:pointer;  
    padding: 0.5rem 1rem;

    &:hover {
      color:var(--blackWithOpacity);
    }
  `}

  ${respondTo.tv`
    cursor:pointer;  
    padding: 0.5rem 1rem;

    &:hover {
      color:var(--blackWithOpacity);
    }
  `}
`;

const TextContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;
const Text = styled.p`
  font-size: var(--small-l);
  text-align: justify;
`;

// Export product details
function Details({ product, t }) {
  // Constants
  // Titles
  const titles = [
    t("product.terms of use"),
    t("product.technical requirements"),
    t("product.safety standard"),
  ];
  // Texts
  const texts = [
    product.instructionForUse,
    product.technicalRequirements,
    product.safetyStandard,
  ];

  // Initialize hooks
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    handleTitleClick(currentIndex);
  });

  // Functions
  // Change text and add animation
  const handleTitleClick = (index) => {
    const details = document.getElementById("details-text");
    details.classList.remove("w3-animate-right");

    setTimeout(() => {
      details.classList.add("w3-animate-right");
      setCurrentIndex(index);
    }, 1);
  };

  return (
    <Container>
      {/* Titles */}
      <TitleContainer>
        {titles.map((title, index) => (
          <Title
            key={index}
            $active={currentIndex === index}
            onClick={() => handleTitleClick(index)}
          >
            {title}
          </Title>
        ))}
      </TitleContainer>

      {/* Texts */}
      <TextContainer className="w3-animate-right" id="details-text">
        <Text>{texts[currentIndex]}</Text>
      </TextContainer>
    </Container>
  );
}

export default Details;
