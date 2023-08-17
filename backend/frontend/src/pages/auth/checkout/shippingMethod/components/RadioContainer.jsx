// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
import { DeliverySVG, OfficeSVG } from "../../../../../static/icons/delivery";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const InnerContainer = styled.div`
  display: flex;
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
    color: var(--white);
    .st0 {
      stroke: var(--white);
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
    background-color:var(--whiteWithOpacity);
  `}

  ${respondTo.lowTablet`
    background-color:var(--whiteWithOpacity);
  `}

  &:last-of-type {
    margin-left: 1rem;
  }

  &:hover {
    color: var(--black);
    background: transparent;
  }
`;

const IconContainer = styled.div`
  display: flex;

  svg {
    width: 5rem;
    height: 5rem;

    ${respondTo.mobile`
      width: 4rem;
      height: 4rem;
    `}

    ${respondTo.lowTablet`
      width: 4rem;
      height: 4rem;
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

const Text = styled.p`
  text-align: center;
`;

// Export radio container
function RadioContainer({ formik, t }) {
  const radioOptions = [
    {
      key: "True",
      value: "True",
      label: (
        <>
          <Label htmlFor="True">
            <IconContainer>
              <DeliverySVG />
            </IconContainer>
            <Text>{t("shipping method.delivery")}</Text>
          </Label>
        </>
      ),
    },
    {
      key: "False",
      value: "False",
      label: (
        <>
          <Label htmlFor="False">
            <IconContainer>
              <OfficeSVG />
            </IconContainer>
            <Text> {t("shipping method.in-store pickup")}</Text>
          </Label>
        </>
      ),
    },
  ];
  return (
    <Container>
      <InnerContainer>
        <FormikControl
          control="radio"
          name="wants_delivery"
          options={radioOptions}
        />
      </InnerContainer>

      <ErrorContainer>
        <ErrorText>{formik.errors["wants_delivery"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default RadioContainer;
