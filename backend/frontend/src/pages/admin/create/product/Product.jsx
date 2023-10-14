// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import actions
import { reset } from "../../../../toolkit/product/productSlice";
import { initialValues, validationSchema, onSubmit } from "./values";
import { getCategories } from "../../../../toolkit/category/actions";

// import component
import { Formik, Form } from "formik";
import Button from "./components/Button";
import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import { LoaderMini, ErrorMessage } from "../../../../components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 5rem 0 10rem 0;

  ${respondTo.mobile`
    width:100%;
  `}

  ${respondTo.lowTablet`
    width:100%;
  `}

  ${respondTo.tablet`
    width:90%;
  `}

  ${respondTo.tv`
    max-width: 1400px;
  `}
`;

const InnerContainer = styled.div`
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  border-radius: 20px;

  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
    margin: 0rem;
    padding: 0rem;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.lowTablet`
    width:100%;
    margin: 0rem;
    padding: 0rem;
    box-shadow:none;
    background:transparent;
  `}

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${respondTo.tv`
    max-width: 1400px;
  `}
`;

const Header = styled.h1`
  text-align: center;
  font-size: var(--medium-m);
  color: var(--color-primary);
`;

const SubHeader = styled.h1`
  text-align: center;
  font-size: var(--medium-s);
  color: var(--color-primary);

  &:last-of-type {
    margin-top: 3rem;
  }
`;

const LoaderContainer = styled.div`
  margin: 3rem 0;
`;

const ErrorContainer = styled.div`
  width: 30rem;
  max-width: 80vw;
  margin-bottom: 1rem;

  * {
    margin: 0;
    stroke: var(--red);
    color: var(--red);
    background: transparent;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

// export product page
function Product() {
  // initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["admin"]);
  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, success } = productSlice;

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories({ langauge: i18n.language }));
    if (success) navigate("/admin/products/");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success, i18n.language]);

  return (
    <Container>
      <InnerContainer>
        <Header>{t("product.edit product")}</Header>

        {!isLoading && error && (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        )}

        {isLoading ? (
          <LoaderContainer>
            <LoaderMini color="darkmagenta" />
          </LoaderContainer>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e, i18n.language, dispatch)}
          >
            {(formik) => {
              return (
                <Form className="w3-animate-right">
                  {/* product specification */}
                  <SubHeader>{t("product.specification")}</SubHeader>
                  <Inputs categories={categories} formik={formik} t={t} />

                  {/* product details */}
                  <SubHeader>{t("product.details")}</SubHeader>
                  <Textarea t={t} />

                  <Button t={t} />
                </Form>
              );
            }}
          </Formik>
        )}
      </InnerContainer>
    </Container>
  );
}

export default Product;
