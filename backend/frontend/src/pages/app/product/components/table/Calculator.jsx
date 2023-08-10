// Import styles
import { styled } from "styled-components";
import { CloseSVG } from "../../../../../static/icons/components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import hooks
import { useState } from "react";

const Container = styled.div``;

const Button = styled.button`
  bottom: 0;
  right: 1rem;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 3rem 0.3rem 3rem;

  border: none;
  color: var(--white);
  font-size: var(--small-m);
  text-transform: capitalize;
  transform: translateY(100%);
  border-radius: 0 0 100px 100px;
  transition: color 1ms ease-in-out;
  background-color: var(--darkmagenta);

  &:empty {
    display: none;
  }

  ${respondTo.laptop`
    right:0rem;
    bottom:0rem;
    padding: 2rem 0.3rem 2rem 0.2rem;

    text-orientation: mixed;
    writing-mode: vertical-rl;  
    transform:translate(100%,0%); 
    border-radius: 0  100px  100px 0;
  `}

  ${respondTo.desktop`
    &:hover{
      cursor:pointer;
      color:var(--whiteWithOpacity)
    }
  `}

  ${respondTo.tv`
    &:hover{
      cursor:pointer;
      color:var(--whiteWithOpacity)
    }
  `}
`;

const InnerContainer = styled.div`
  right: 1rem;
  bottom: 1rem;
  z-index: 1001;
  min-width: 10%;
  position: fixed;

  ${respondTo.tv`
  position: absolute;
  transform: translateY(150%);
`}

  display: flex;
  padding: 1rem 3rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  color: var(--white);
  border-radius: 10%;
  background-color: var(--color-primary);

  ${respondTo.mobile`
    right:0.5rem;
    padding:1rem 2rem;
    align-self:center;
  `}
`;

const IconContainer = styled.div`
  top: 1rem;
  right: 1rem;
  position: absolute;

  ${respondTo.desktop`
    &:hover{
      cursor:pointer;

      svg{
        fill:var(--whiteWithOpacity)
      }
    }
  `}

  ${respondTo.tv`
    &:hover{
      cursor:pointer;

      svg{
        fill:var(--whiteWithOpacity)
      }
    }
  `}
`;

const Title = styled.h3`
  font-size: var(--medium-s);
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 0;
  max-width: 2rem;
  display: inline;
  text-align: end;
  margin: 0 0.5rem;

  border: none;
  font-size: var(--small-l);
  background-color: var(--color-primary);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    appearance: textFiled;
    -moz-appearance: textfield;
  }
`;

const Text = styled.p`
  font-size: var(--small-l);
`;
const BlackText = styled.b`
  margin: 0 0.5rem;
  color: var(--black);
`;

// Export calculator
function Calculator({ t, product }) {
  // Initialize hooks
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState(0);

  const changer = () => {
    if (isOpen) setAnswer(0);
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {/* Show calculator button if product has coverage length */}
      {product?.coverageLength && (
        <Button onClick={changer}>{t("product.calculator")}</Button>
      )}

      {/* Show calculator if open */}
      {isOpen && (
        <InnerContainer className="w3-animate-right">
          <Title> {t("product.calculator")}</Title>

          {/* Close icon */}
          <IconContainer onClick={changer}>
            <CloseSVG />
          </IconContainer>

          {/* Text container */}
          <TextContainer>
            <Text> {t("product.enter the coverage area")}</Text>
            {/* Input for area length */}
            <Input
              type="number"
              min={0}
              size="2"
              pattern="[0-9]*"
              defaultValue={0}
              onChange={(e) =>
                setAnswer(e.target.value > 0 ? e.target.value : 0)
              }
            />
            <Text>
              {t("product.meter")}
              <sup>2</sup>
            </Text>
          </TextContainer>

          {/* Calculated text */}
          <Text>
            {t("product.you will need")}{" "}
            <BlackText>
              {((answer / product.coverageLength) * 2).toFixed(1)}
            </BlackText>
            {t("product.liter")}
          </Text>

          {/* Additional Text */}
          <Text> ({t("product.counted for two layers")})</Text>
        </InnerContainer>
      )}
    </Container>
  );
}

export default Calculator;
