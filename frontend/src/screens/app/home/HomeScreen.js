// REACT
import React, { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";

// COMPONENTS
import Carousel from "../../../components/carousel/Carousel";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";

// OTHERS
import "./home.css";
import { Products } from "../../../functions/CustomFunctions";

function HomeScreen() {
  // HOOKS
  const dispatch = useDispatch();

  const systemProducts = useSelector((state) => state.systemProducts);
  const { error, loading, products } = systemProducts;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);



  return (
    <article className="home-container">
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {products &&
        Products(products).map((element) => (
          <Carousel
            key={element.category}
            category={{ category: element.category }}
            products={element.products}
          />
        ))}
    </article>
  );
}

export default HomeScreen;
