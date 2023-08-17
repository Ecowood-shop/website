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

const ErrorContainer = styled.div``;

const ErrorText = styled.p`
  margin-left: 1rem;

  color: var(--red);
  font-size: var(--small-m);
  text-transform: capitalize;
`;

const Text = styled.p`
  display: block;
  width: max-content;

  text-align: center;
  font-size: var(--small-l);
  text-transform: lowercase;

  ${respondTo.mobile`
    max-width:6rem;
  `}

  &::first-letter {
    text-transform: capitalize;
  }
`;

// Export customer input
function Customer({ t, formik }) {
  const radioOptions = [
    {
      key: "True",
      value: "True",
      label: (
        <Label htmlFor="True">
          <Text>{t("shipping details.individual")}</Text>
        </Label>
      ),
    },
    {
      key: "False",
      value: "False",
      label: (
        <Label htmlFor="False">
          <Text>{t("shipping details.legal entity")}</Text>
        </Label>
      ),
    },
  ];

  return (
    <Container>
      <InnerContainer>
        <FormikControl
          control="radio"
          name="physicPerson"
          options={radioOptions}
        />
      </InnerContainer>

      <ErrorContainer>
        <ErrorText>{formik.errors["physicPerson"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default Customer;
