// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

// Import hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import actions
import { getProducts } from "../../../../../toolkit/discounts/discountProductSlice";
const Container = styled.div`
  width: 30rem;
  max-width: 80vw;

  & > div > div > div:first-of-type {
    width: 30rem;
    max-width: 80vw;

    padding-left: 1rem;

    border-radius: 20px;
    border-color: white;

    font-size: var(--small-m);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

// Export product select
function ProductSelect({ formik, i18n }) {
  // Initialize hooks
  const dispatch = useDispatch();

  // Get products from store
  const { products } = useSelector((state) => state.discountProducts);

  useEffect(() => {
    dispatch(getProducts({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  // Formilize products

  let customProducts =
    products?.length > 0
      ? products.map((product) => ({
          value: product._id,
          label: "ID : " + product._id + ", " + product.name_geo,
        }))
      : [];

  return (
    products && (
      <Container>
        <FormikControl
          control="autocomplete"
          name="productId"
          formik={formik}
          options={customProducts}
        />
      </Container>
    )
  );
}

export default ProductSelect;
