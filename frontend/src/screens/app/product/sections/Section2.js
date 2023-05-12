// REACT
import { useState, useEffect } from "react";

// REDUX
import { useSelector } from "react-redux";
import { getSimilarProducts } from "../../../../store/actions/systemActions";

// COMPONENTS
import Carousel from "../../../../components/carousel/Carousel";

function Section2({ product, styles, navigate, category, dispatch, t, i18n }) {
  const [current, setCurrent] = useState(0);

  const systemSimilarProducts = useSelector(
    (state) => state.systemSimilarProducts
  );
  const { products } = systemSimilarProducts;

  useEffect(() => {
    dispatch(getSimilarProducts(i18n.language, category.id));
  }, [dispatch, category.id, i18n.language]);

  function renderSwitch(param) {
    switch (param) {
      case 0:
        return product.instructionForUse;
      case 1:
        return product.safetyStandard;
      case 2:
        return product.technicalRequirements;
      default:
        return product.instructionForUse;
    }
  }

  let k = [];
  products?.forEach((element) => k.push({ product: element }));
  console.log(products);
  return (
    <section className={styles.section2}>
      <header>
        <h2
          onClick={() => setCurrent(0)}
          style={
            current == 0 ? { fontWeight: "bold", backgroundColor: "white" } : {}
          }
        >
          {t("product.technical requirements")}
        </h2>
        <h2
          onClick={() => setCurrent(1)}
          style={
            current == 1 ? { fontWeight: "bold", backgroundColor: "white" } : {}
          }
        >
          {t("product.terms of use")}
        </h2>
        <h2
          onClick={() => setCurrent(2)}
          style={
            current == 2 ? { fontWeight: "bold", backgroundColor: "white" } : {}
          }
        >
          {t("product.safety standard")}
        </h2>
      </header>
      <p> {renderSwitch(current)}</p>
      {products && (
        <Carousel category={category} products={k} navigate={navigate} />
      )}
    </section>
  );
}

export default Section2;
