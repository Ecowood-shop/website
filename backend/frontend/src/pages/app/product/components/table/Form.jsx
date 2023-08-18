// Import styles
import { styled } from "styled-components";
// Import hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { useSelector, useDispatch } from "react-redux";
// Import components
import Input from "./Input";
import Color from "./Color";
import Button from "./Button";
import PriceText from "./PriceText";
// Import constants
import { initialValues, validationSchema, onSubmit } from "../../values";

const Container = styled.div`
  width: 100%;
  display: flex;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const ErrorContainer = styled.div`
  top: 0.5rem;
  left: 0.5rem;
  position: relative;

  color: var(--red);
  font-weight: bold;
  font-size: var(--small-m);
  transition: color 0.1s ease-in-out;

  &::first-letter{
    text-transform: capitalize;
  }
  ${(props) =>
    props.$cursor && "cursor:pointer; &:hover{color:var(--redWithOpacity)}"}
`;

function Form({ product, variants, t }) {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from user slice
  const { user } = useSelector((state) => state.user);

  // Get cart from cart slice
  const cartSlice = useSelector((state) => state.cart);
  const { error, success } = cartSlice;

  useEffect(() => {
    if (success) navigate("/cart");
  }, [dispatch, navigate, success]);

  return (
    <Container>
      <Formik
        initialValues={initialValues(variants)}
        validationSchema={validationSchema(t, user)}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, dispatch, product)
        }
      >
        {({ errors, values }) => {
          return (
            <FormikForm>
              {/* Color picker */}
              <Color variants={variants} error={error} />

              {/* Price text */}
              <PriceText t={t} product={product} />

              {/* Input for product quantity*/}
              <Input t={t} />

              {/* Error message container */}
              <ErrorContainer
                onClick={() => {
                  if (values.quantity && !user) {
                    navigate("/authorization");
                  }
                }}
                $cursor={values.quantity && !user}
              >
                {error ? error : errors.quantity}
              </ErrorContainer>

              {/* Submit button */}
              <Button t={t} />
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Form;
