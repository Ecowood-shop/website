// Import hooks
import { useNavigate } from "react-router-dom";
// Import styled components and svgs
import { headerIcons } from "../../../../static/icons";
import { Container, InnerContainer, SubmitBtn, Cart } from "./styles";
// Import formik configuration
import { Formik, Form } from "formik";
import { initialValues, validationSchema, onSubmit } from "../../values";

// Import components
import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";

// Export Search component
function Search({ t, i18n, isDesktop }) {
  // Get hooks
  const navigate = useNavigate();

  // Destructure icons
  const { SearchSVG, CartSVG } = headerIcons;

  return (
    <Container className={!isDesktop && "w3-animate-right"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e) => onSubmit(e, navigate)}
      >
        {(formik) => {
          return (
            <Form>
              <SearchInput t={t} />
              <InnerContainer>
                <CategorySelect t={t} i18n={i18n} formik={formik} />
                {/* Submit button with Search SVG */}
                <SubmitBtn type="submit">
                  <SearchSVG />
                </SubmitBtn>
              </InnerContainer>
            </Form>
          );
        }}
      </Formik>
      {/* Cart SVG */}
      <Cart onClick={() => navigate("/cart")}>
        <CartSVG />
      </Cart>
    </Container>
  );
}

export default Search;
