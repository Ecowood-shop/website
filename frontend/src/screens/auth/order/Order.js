// REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";
import { deleteProduct } from "../../../store/actions/adminActions";

// OTHERS
import styles from "./styles.module.scss";

function Order() {
  const User = useSelector((state) => state.User);
  const {user } = User;

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const systemProducts = useSelector((state) => state.systemProducts);
  const { error, loading, products } = systemProducts;

  useEffect(() => {
    dispatch(getProducts(null,null,null,null));
  }, [dispatch]);

  console.log(products);
  return (
    <article className={styles.container}>
      <h1>შეკვეთა N{params.id}</h1>
      <h2>დეტალები</h2>
      <section className={styles.sectionDetails}>
        <div>
          <p>
            <b>მომხმარებელი:</b>შსს ქუთაისი
          </p>
         
          <p>
            <b>ტელეფონი:</b>577 69 23 44
          </p>
          <p>
            <b>მისამართი:</b>გამსახურდია
          </p>
          <p>
            <b>ID:</b>ასდსად
          </p>
        </div>
        <div>
          <p className={styles.sum}>
            <b>ჯამი:</b>289.00 ლ
          </p>
          <p className={styles.status} style={{ color: "red" }}>
            <b>სტატუსი:</b>მუშავდება
          </p>
          {user.is_staff && 
          <button className={styles.delivered}>ჩაბარებულია</button>}
        </div>
      </section>
      <h2>პროდუქტები</h2>
      <section className={styles.products}>
        {products && products.products.map(product=> <div className={styles.product}>
          <img src={product.picture_set[0].picture} onClick={()=>navigate(`/product/${params.id}`)}/>
          <div>
          <p className={styles.name}  onClick={()=>navigate(`/product/${params.id}`)}>{product.name_geo}</p>
          <div className={styles.productDetails}>
          <p>{product.size}</p>
          <p><b>ფასი:</b> {product.price} ლ</p>
          </div>
          </div>
          <p className={styles.emount}>3 ცალი</p>
        </div>)}
      </section>
    </article>
  );
}

export default Order;
