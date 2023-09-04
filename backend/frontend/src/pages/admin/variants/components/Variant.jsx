// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import hooks
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

// Import Components
import Inputs from "./Inputs";
import Button from "./Button";

// Import actions
import { initialValues, validationSchema, onSubmit } from "../values";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  border-radius: 100px;
  ${(props) => props.$isOpen && "  background-color: white;"}
`;

const Window = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 0;
  border-radius: 999px;
  background-image: var(--linear-primary);
`;

const Text = styled.h2`
  cursor: pointer;
  padding: 0 2rem;
  text-align: center;
  font-size: var(--small-l);
  color: var(--black);
  font-weight: bold;
  border-radius: 100px;
  background-color: var(--white);
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${respondTo.mobile`
      flex-direction:column;
    `}

    ${respondTo.lowTablet`
      flex-direction:column;
    `}
  }
`;

// Export variant component
function Variant({ t, variant, id, colors }) {
  // Initialize hooks
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownOptions = [{ key: t("global.color"), value: "" }];
  if (id) {
    colors.forEach((color) => {
      dropdownOptions.push({ key: color.name, value: color.name });
    });
  }

  return (
    <Container $isOpen={isOpen}>
      <Window style={id ? {} : { backgroundImage: `url(${variant.image})` }}>
        <Text onClick={() => setIsOpen(!isOpen)}>
          {id ? t("global.create") : variant.color}
        </Text>
      </Window>

      {/* Show form if Window is open */}
      {isOpen && (
        <FormContainer className="w3-animate-right">
          <Formik
            initialValues={initialValues(variant)}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e, dispatch, id, variant)}
          >
            {(formik) => {
              return (
                <Form>
                  <Inputs t={t} dropdownOptions={dropdownOptions} />
                  <Button t={t} variant={variant} dispatch={dispatch} />
                </Form>
              );
            }}
          </Formik>
        </FormContainer>
      )}
    </Container>
  );
}

export default Variant;
