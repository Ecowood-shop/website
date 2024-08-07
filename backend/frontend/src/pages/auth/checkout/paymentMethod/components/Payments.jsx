// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
  }

  input[type="radio"]:checked + label {
    background-color: var(--color-primary);

    * {
      fill: var(--white);
    }
  }
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 2rem;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  text-transform: capitalize;
  background-color: whitesmoke;
  transition: background 0.1s ease-in-out;

  ${respondTo.mobile`
    width: 100%;
    background-color:var(--whiteWithOpacity);
  `}

  ${respondTo.lowTablet`
    width: 100%;
    background-color:var(--whiteWithOpacity);
  `}

  &:hover {
    color: var(--black);
    background: transparent;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;

  svg {
    height: 2rem;
    width: 10rem;
    ${respondTo.mobile`
    `}

    ${respondTo.lowTablet`
      height: 3rem;
    `}

    &:hover {
      stroke: none;
    }
  }
`;

const ErrorContainer = styled.div``;

const ErrorText = styled.p`
  margin-left: 1rem;

  color: var(--red);
  font-size: var(--small-m);
  text-transform: capitalize;
`;

// Export payment component
function Payments({ formik }) {
  const radioOptions = [
    {
      key: "payze",
      value: "payze",
      label: (
        <>
          <Label htmlFor="payze">
            <IconContainer>
              <svg
                width="429"
                height="63"
                viewBox="0 0 429 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_439_1120)">
                  <path
                    d="M74.7 4.20002C71.3747 1.40184 67.145 -0.0910021 62.8 2.38777e-05H0V63H14.8V42.6H62.8C67.128 42.6921 71.3472 41.2385 74.7 38.5C76.6188 36.8031 78.1418 34.7056 79.1612 32.3556C80.1807 30.0057 80.6718 27.4606 80.6 24.9V17.7C80.6779 15.1533 80.189 12.621 79.1686 10.2863C78.1483 7.95162 76.622 5.87277 74.7 4.20002V4.20002ZM65.8 25.5C65.8 27.7 65.3 28.4 64.7 28.9C63.708 29.5994 62.5126 29.951 61.3 29.9H14.8V12.7H61.3C62.5126 12.6491 63.708 13.0007 64.7 13.7C65.3 14.2 65.8 14.9 65.8 17.1V25.5Z"
                    fill="#5033FB"
                  />
                  <path
                    d="M347.3 12.7V25.1H407.7V37.8H347.3V50.3H411.6V63H332.5V0H411.6V12.7H347.3Z"
                    fill="#5033FB"
                  />
                  <path
                    d="M423.1 59.7002V60.2002H421.3V62.9002H420.6V60.2002H418.8V59.7002H423.1Z"
                    fill="#5033FB"
                  />
                  <path
                    d="M423.9 59.7002L425.8 62.3002L427.6 59.7002H428.2V62.9002H427.6V60.8002L426 62.9002H425.5L424 60.8002V62.9002H423.3V59.7002H423.9Z"
                    fill="#5033FB"
                  />
                  <path
                    d="M313.7 50.3004H261.8L280.6 31.5004L271 21.9004L239.5 53.4004L249.1 63.0004H326.4L313.7 50.3004Z"
                    fill="#5033FB"
                  />
                  <path
                    d="M246.8 3.2L256.4 12.7H302.6L283.9 31.5L293.4 41.1L324.9 9.6L315.3 0H229.3L201.6 27.7L182.3 0H164.4L191 38.3L169.7 59.6L128.3 0H115.4L71.7002 63H89.6002L98.4002 50.4H145.3L154.1 63H187L246.8 3.2ZM107.2 37.6L121.8 16.5L136.4 37.6H107.2Z"
                    fill="#5033FB"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_439_1120">
                    <rect width="428.2" height="63" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </IconContainer>
          </Label>
        </>
      ),
    },
  ];
  return (
    <Container className="w3-animate-right">
      <InnerContainer>
        <FormikControl
          control="radio"
          name="paymentMethod"
          options={radioOptions}
        />
      </InnerContainer>

      <ErrorContainer>
        <ErrorText>{formik.errors["paymentMethod"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default Payments;
