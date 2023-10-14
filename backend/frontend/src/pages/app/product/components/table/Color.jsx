// Import styles
import { styled } from "styled-components";
// Import components
import ColorPicker from "../../../../../components/colorPicker/ColorPicker";
// Import hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";
// Import actions
import { reset } from "../../../../../toolkit/cart/cartSlice";

const Container = styled.div`
  margin-top: 1rem;
`;

// Export color picker
function Color({ variants, error }) {
  // Initialize hooks
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (error) dispatch(reset());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, values]);

  return (
    <Container>
      {variants.length > 0 && variants[0].color.toLowerCase() !== "default" && (
        <ColorPicker
          Changer={(value) => setFieldValue("color", value)}
          color={values.color}
          variants={variants}
        />
      )}
    </Container>
  );
}

export default Color;
