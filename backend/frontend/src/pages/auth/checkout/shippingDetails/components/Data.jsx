// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  width: 80%;

  ${respondTo.mobile`
    width: 90%;
  `}

  input {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem 2rem;

    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:var(--white);
    `}

    ${respondTo.lowTablet`
      background-color:var(--white);
    `}
  }
  & * {
    top: 0;
    font-size: var(--small-m);
  }
`;

// Export additional inputs
function Data({ shippingFromStorage }) {
  return (
    <Container className="w3-animate-right">
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        placeholder="+995 XXXXXXXXX"
      />

      {shippingFromStorage?.wants_delivery === "True" && (
        <FormikControl
          control="input"
          type="string"
          label="address"
          name="address"
          placeholder="მისამართი"
        />
      )}
      
    </Container>
  );
}

export default Data;
