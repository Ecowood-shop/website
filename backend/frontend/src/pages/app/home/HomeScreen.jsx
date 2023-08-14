// Styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// COMPONENTS
import { Carousel, Loader } from "../../../components";
// Functions
import { getLatestProducts } from "../../../toolkit/product/latestProductSlice";
import { mapLatestProducts } from "../../../utils/helpers/mapLatestProducts";

const Container = styled.div`
  width: 80%;
  max-width: 1400px;

  padding: 5rem 0;

  gap: 5rem;
  display: flex;
  flex-direction: column;
`;

// Home page
function HomeScreen() {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  // Get latest products from store
  const latestProductsSlice = useSelector((state) => state.latestProducts);
  const { isLoading, products } = latestProductsSlice;

  useEffect(() => {
    dispatch(getLatestProducts({ language: i18n.language }));
  }, [i18n.language, dispatch]);

  // map latest products by category
  const latestProducts = mapLatestProducts(products);
  return (
    <Container>
      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        products &&
        latestProducts.map((element) => (
          <Carousel
            key={element.category}
            category={{ category: element.category }}
            products={element.products}
            navigate={navigate}
          />
        ))
      )}
    </Container>
  );
}

export default HomeScreen;
