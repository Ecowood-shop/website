// Import styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../../static/icons/components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// Import constants and icons
import { initialValues, validationSchema, onSubmit } from "../values";
import { PlusSVG, MinusSVG } from "../../../../static/icons/form";
// Import functions
import { debounce } from "lodash";
import { useCallback } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ErrorContainer = styled.div`
  bottom: 0;
  left: 0;
  display: flex;
  position: absolute;
  width: max-content;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0.3rem 1rem 0.3rem 0.5rem;
  border-radius: 100px;

  text-align: center;

  background-color: whitesmoke;
  transform: translate(calc(-100% - 1rem), 0.3rem);

  ${respondTo.mobile`
      right:0;
      left:auto;
      transform: translate(100%, 0.3rem);
  `}

  ${respondTo.lowTablet`
      right:0;
      left:auto;
      transform: translate(100%, 0.3rem); 
  `}

  ${respondTo.tablet`
      right:0;
      left:auto;
      transform: translate(100%, 0.3rem);
  `}
  &:empty {
    display: none;
  }

  div {
    padding-bottom: 0.4rem;
  }
`;

const ErrorMessage = styled.p`
  color: var(--red);
  font-size: var(--small-m);

  &::first-letter {
    text-transform: capitalize;
  }
`;
const Input = styled.input`
  padding: 0;
  max-width: 2rem;
  display: inline;
  text-align: center;
  margin: 0 0.5rem;

  border: none;
  border-radius: 100px;

  font-weight: bold;
  font-size: var(--small-l);
  color: var(--blackWithOpacity);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;

  display: flex;
  margin: 0 0.5rem;
  align-items: center;

  svg {
    height: 20px;
    fill: ${(props) =>
      props.$error ? "var(--red)" : "var(--blackWithOpacity)"};
  }

  /* On touch devices cursor should not be pointer */
  ${respondTo.mobile`
    cursor:default;
  `}

  ${respondTo.lowTablet`
    cursor:default;
  `}
  
  ${respondTo.tablet`
    cursor:default;
  `}
  
  ${respondTo.laptop`
    cursor:default;
  `}
`;

// Export form for product quantity
function Form({ variant, cart, t, i18n }) {
  // Initialize hooks
  const dispatch = useDispatch();

  // Initialize formik
  const formikProps = useFormik({
    onSubmit: (values) => onSubmit(values, dispatch, i18n.language, cart.id),
    initialValues: initialValues(cart.qty),
    validationSchema: validationSchema(t, variant),
    validateOnMount: true,
  });

  // Debounce quantity update api request if clicked many times
  const debounceForm = useCallback(debounce(formikProps.submitForm, 500), []);

  // Quantity validation
  function setQuantity(value) {
    if (variant.active) {
      if (value > variant.quantity || value < 1) {
        formikProps.setFieldError(
          "quantity",
          `${t("cart.in stock")} ${variant.quantity}`
        );
        if (formikProps.values.quantity > value && value > 0) {
          formikProps.setFieldValue("quantity", value);
        }
      } else {
        formikProps.setFieldValue("quantity", value);
      }
    }
    debounceForm();
  }

  return (
    <Container>
      {/* Plus quantity */}
      <IconContainer
        onClick={() => setQuantity(formikProps.values.quantity - 1)}
      >
        <MinusSVG />
      </IconContainer>

      {/* Quantity input */}
      <Input
        type="number"
        value={formikProps.values.quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      {/* Minus quantity */}
      <IconContainer
        onClick={() => setQuantity(formikProps.values.quantity + 1)}
      >
        <PlusSVG />
      </IconContainer>
      {/* Error message container */}
      <ErrorContainer>
        {formikProps.errors.quantity && (
          <>
            <IconContainer $error>
              <ErrorSVG />
            </IconContainer>
            <ErrorMessage> {formikProps.errors.quantity}</ErrorMessage>
          </>
        )}
      </ErrorContainer>
    </Container>
  );
}

export default Form;
