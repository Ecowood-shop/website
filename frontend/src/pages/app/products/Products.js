// Styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
// Functions
import { getProducts } from "../../../toolkit/product/actions";
// Components
import Filter from "../../../components/filter/Filter";
import Product from "../../../components/carousel/components/Product";
import { Loader, Pagination } from "../../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 3rem;
  min-height: var(--height);

  ${respondTo.mobile`
    width:100%;
  `}

  ${respondTo.lowTablet`
    width:100%;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 3rem;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
`;

// Products page
function Products() {
  // Hooks
  const dispatch = useDispatch();

  const { i18n } = useTranslation(["app"]);
  const [searchParams] = useSearchParams();

  // query params
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  const productsSlice = useSelector((state) => state.products);
  const { isLoading, products } = productsSlice;

  useEffect(() => {
    dispatch(
      getProducts({
        language: i18n.language,
        word: word,
        category: category,
        orderby: orderby,
        page: page,
      })
    );
  }, [dispatch, category, word, orderby, page, i18n.language]);
  return (
    <Container>
      {/* Products filter  */}
      <Filter />

      {isLoading ? (
        <Loader color="blueviolet" />
      ) : (
        products?.products && (
          <>
            {/* Products from carousel */}
            <InnerContainer className={" w3-animate-right"}>
              {products.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </InnerContainer>
            {/* Pagination for products */}
            <Pagination pages={products.pages} page={products.page} />
          </>
        )
      )}
    </Container>
  );
}

export default Products;
