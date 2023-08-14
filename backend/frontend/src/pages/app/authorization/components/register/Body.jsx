// Import styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../../../static/icons/components";
// Import hooks
import { useState } from "react";
// Import components
import Buttons from "./Buttons";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import LeftArrowSVG from "../LeftArrowSVG";
import RightArrowSVG from "../RightArrowSVG";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const ArrowContainer = styled.div`
  cursor: pointer;
  --value: 50%;
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
  transform: translate(var(--value), -50%);
  background-color: var(--color-magenta);

  ${(props) =>
    props.$right &&
    "left:0;right:auto;  transform: translate(calc(var(--value) * -1),-50%);"}

  ${respondTo.mobile`
    --value:100%;
    
    & svg{
      height:24px;
      width:24px;
    }
  `}

  ${respondTo.lowTablet`
    --value:calc(100% + 3vw);

    & svg{
      height:24px;
      width:24px;
    }
  `}
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const ErrorText = styled.p`
  color: var(--white);
  font-size: var(--small-l);

  &::first-letter {
    text-transform: capitalize;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

// Export form body
function Body({ t, error, isLoading, pageChanger }) {
  // Initialize hooks
  const [firstPage, setFirstPage] = useState(true);

  const firstPageChanger = () => {
    setFirstPage(!firstPage);
  };

  return (
    <>
      {/* Display register error */}
      {error && (
        <ErrorContainer>
          <IconContainer>
            <ErrorSVG />
          </IconContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}

      {/* Input container */}
      {firstPage ? <FirstPage t={t} /> : <SecondPage t={t} />}

      {/* Arrow Container */}
      <ArrowContainer onClick={() => firstPageChanger()} $right={!firstPage}>
        {firstPage ? <LeftArrowSVG /> : <RightArrowSVG $right />}
      </ArrowContainer>
      {/* Button container */}
      <Buttons
        t={t}
        pageChanger={pageChanger}
        isLoading={isLoading}
        firstPage={firstPage}
        firstPageChanger={firstPageChanger}
      />
    </>
  );
}

export default Body;
