// Import styles
import { styled } from "styled-components";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;

    border: none;
    border-radius: 100px;

    text-align: center;
    color: var(--black);
    font-size: var(--small-l);
    background-color: whitesmoke;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  input[type="number"] {
    appearance: textfield !important;
    -moz-appearance: textfield !important;
  }
`;

// Export input for product quantity
function Input({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="number"
        name="quantity"
        noError={true}
        placeholder={t("product.quantity")}
      />
    </Container>
  );
}

export default Input;
