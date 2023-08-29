// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useCallback } from "react";
import { useFormikContext } from "formik";
// Import formik configuration
import FormikControl from "../../formik/FormikControl";
// Import functions
import { debounce } from "lodash";

// Main container
const Container = styled.div`
  ${respondTo.mobile`
    width:50%;
  `}

  ${respondTo.lowTablet`
    width:50%;
  `}

  input {
    width: 6rem;
    margin: 0;
    height: 100%;

    height: 100%;
    padding: 0.7rem 1.5rem 0.7rem 1.5rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    border: 3px solid var(--darkmagenta);
    border-radius: 100px;

    color: var(--darkmagenta);
    font-size: var(--small-m);
    text-transform: capitalize;
    background-color: whitesmoke;

    ${respondTo.mobile`
      width:100%;
    `}

    ${respondTo.lowTablet`
      width:100%;
    `}
  }
`;

// Export ID select
function Idinput() {
  // Initialize hooks
  const { submitForm, setFieldValue } = useFormikContext();

  // Functions

  // Debounce quantity update api request if clicked many times
  const debounceForm = useCallback(debounce(submitForm, 500), []);

  const setOrderByField = (value) => {
    setFieldValue("id", value);
    debounceForm();
  };

  return (
    <Container>
      <FormikControl
        control="input"
        name="id"
        placeholder={"ID..."}
        onChange={(event) => setOrderByField(event.target.value)}
      />
    </Container>
  );
}

export default Idinput;
