// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// Import actions
import { getProduct } from "../../../toolkit/product/actions";
// Import components
import Table from "./components/Table";
import { Loader, ErrorMessage } from "../../../components";
import Details from "./components/Details";
import SimilarProducts from "./components/SimilarProducts";

const Container = styled.div`
  padding: 5rem 0;

  width: 80%;
  max-width: 1400px;

  ${respondTo.mobile`
    width: 90%;
  `}

  @media screen and (min-width: 1280px) and (max-width: 1500px) {
    width: 90%;
  }
`;

const HeaderText = styled.h1`
  text-align: center;
  font-size: var(--medium-m);
`;

// Export product component
function Product({ setIsMessengerShown }) {
  // Initialize hooks
  const dispatch = useDispatch();
  const params = useParams();

  // Get product from product slice
  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, product } = productSlice;

  const { t, i18n } = useTranslation(["app"]);

  useEffect(() => {
    dispatch(getProduct({ id: params.id, language: i18n.language }));
  }, [dispatch, params.id, i18n.language]);

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        product?.products && (
          <>
            {/* Product name */}
            <HeaderText className="w3-animate-right">
              {product.products.name_geo}
            </HeaderText>

            {/* Content */}
            <Table
              product={product.products}
              variants={product.variants}
              setIsMessengerShown={setIsMessengerShown}
              t={t}
              i18n={i18n}
            />

            {/* Product details */}
            <Details product={product.products} t={t} />

            {/* Similar products carousel */}
            <SimilarProducts
              i18n={i18n}
              category={{
                id: product.products.category_id,
                category: product.products.category,
              }}
            />
          </>
        )
      )}
    </Container>
  );
}

export default Product;
