// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getLatestProducts } from "../../../store/actions/systemActions";

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

  const systemLatestProducts = useSelector(
    (state) => state.systemLatestProducts
  );
  const { error, loading, products } = systemLatestProducts;

  useEffect(() => {
    dispatch(getLatestProducts(i18n.language));
  }, [i18n.language, dispatch]);
  console.log(products);
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
