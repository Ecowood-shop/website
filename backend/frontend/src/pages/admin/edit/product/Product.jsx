// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import actions
import { reset } from "../../../../toolkit/product/productSlice";
import { initialValues, validationSchema, onSubmit } from "./values";
import { getCategories } from "../../../../toolkit/category/actions";
import { getProductAdmin } from "../../../../toolkit/product/actions";

// import component
import Nav from "./components/Nav";
import { Formik, Form } from "formik";
import Button from "./components/Button";
import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import { LoaderMini, ErrorMessage } from "../../../../components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10rem;

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

  ${respondTo.tv`
    max-width: 1400px;
  `}

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
  const { i18n, t } = useTranslation(["admin"]);
  const { id } = useParams();

  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, product, success } = productSlice;

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (success) {
      navigate("/admin/products/");
    } else {
      dispatch(getCategories({ language: i18n.language }));
      dispatch(getProductAdmin({ id: id, language: i18n.language }));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, navigate, i18n.language, id]);

  return (
    <Container>
      <Nav id={id} navigate={navigate} t={t} />

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
          product?.products && (
            <Formik
              initialValues={initialValues(product.products)}
              validationSchema={validationSchema}
              onSubmit={(e) => onSubmit(e, dispatch, i18n.language, id)}
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
          )
        )}
      </InnerContainer>
    </Container>
  );
}

export default Product;
