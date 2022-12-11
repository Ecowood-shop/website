// REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../../store/actions/orderActions";
import { orderDelivered } from "../../../store/actions/adminActions";

// OTHERS
import styles from "./styles.module.scss";

function Order() {
  const User = useSelector((state) => state.User);
  const { user } = User;

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const Order = useSelector((state) => state.Order);
  const { error, loading, order } = Order;

  const adminOrders = useSelector((state) => state.adminOrders);
  const { success} = adminOrders;

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [dispatch,success]);

  console.log(order);
  return (
    <article className={styles.container}>
      {order && <>
      <h1>შეკვეთა N{params.id}</h1>
      <h2>დეტალები</h2>
      <section className={styles.sectionDetails}>
        <div>
          <p>
            <b>მომხმარებელი:</b>არაა
          </p>

          <p>
            <b>ტელეფონი:</b>araa
          </p>
          <p>
            <b>მისამართი:</b>araa
          </p>
          <p>
            <b>თარიღი:</b>
            {order.createdAt.substring(0, 10)}
          </p>
        </div>
        <div>
          <p className={styles.sum}>
            <b>ჯამი:</b>{order.totalPrice} ლ
          </p>
          {order.wants_delivery && <p className={styles.sum}>
            <b>მიტანის სერვისი:</b>{order.shippingPrice} ლ
          </p>}
          <p className={styles.status} style={{ color: order.isDelivered ? "green" : "red" }}>
            <b>სტატუსი:</b>{order.isDelivered ? "ჩაბარებულია" : "მუშავდება"}
          </p>
          {(user.is_staff && !order.isDelivered) && (
            <button className={styles.delivered} onClick={()=>dispatch(orderDelivered(params.id))}>ჩაბარებულია</button>
          )}
        </div>
      </section>
      </> }
      <h2>პროდუქტები</h2>
      <section className={styles.products}>
        {order?.orderItems &&
          order?.orderItems.map((product) => (
            <div className={styles.product} key={product._id}>
              <img
                src={"/images/"+product.image}
                onClick={() => navigate(`/product/${product.product}`)}
              />
              <div>
                <p
                  className={styles.name}
                  onClick={() => navigate(`/product/${product.product}`)}
                >
                  {product.name}
                </p>
                <div className={styles.productDetails}>
                  <p>{product.size}</p>
                  <p>
                    <b>ფასი:</b> {product.price} ლ
                  </p>
                </div>
              </div>
              <p className={styles.emount}>{product.qty} ცალი</p>
            </div>
          ))}
      </section>
    </article>
  );
}

export default Order;
