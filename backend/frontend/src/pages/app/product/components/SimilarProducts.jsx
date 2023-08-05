// Import styles
import { styled } from "styled-components";
// Import hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import components
import { Carousel } from "../../../../components";
// Import actions
import { getSimilarProducts } from "../../../../toolkit/product/similarProductSlice";

const Container = styled.div``;

// Export similar products carousel for product
function SimilarProducts({ category, i18n }) {
  // Initizalize hooks
  const dispatch = useDispatch();
  // Get products from similar products slice
  const { products } = useSelector((state) => state.similarProducts);

  useEffect(() => {
    dispatch(
      getSimilarProducts({ category: category.id, language: i18n.language })
    );
  }, [dispatch, category.id, i18n.language]);

  let similarProducts = [];
  products?.forEach((element) => similarProducts.push({ product: element }));

  return (
    <Container>
      {products && <Carousel category={category} products={similarProducts} />}
    </Container>
  );
}

export default SimilarProducts;
