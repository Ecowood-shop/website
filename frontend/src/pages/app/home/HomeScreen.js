// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getLatestProducts } from "../../../toolkit/product/latestProductSlice";

// COMPONENTS
import Carousel from "../../../components/carousel/Carousel";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";

// OTHERS
import "./home.css";
import { Products } from "../../../functions/CustomFunctions";

import { useTranslation } from "react-i18next";
function HomeScreen() {
  const { t, i18n } = useTranslation();
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const latestProductsSlice = useSelector((state) => state.latestProducts);
  const { error, loading, products } = latestProductsSlice;

  useEffect(() => {
    dispatch(getLatestProducts({ language: i18n.language }));
  }, [i18n.language, dispatch]);

  return (
    <article className="home-container">
      {loading && <Loader color={"blueviolet"} />}{" "}
      {error && <Message>{error}</Message>}
      {products &&
        Products(products).map((element) => (
          <Carousel
            key={element.category}
            category={{ category: element.category }}
            products={element.products}
            navigate={navigate}
          />
        ))}
    </article>
  );
}

export default HomeScreen;
