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
  const { success } = adminOrders;

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [dispatch, success]);

  let ID, username;
  if (order?.Order) {
    if (order.Order.physicPerson) {
      ID = order.Order.shippingAddress
        ? order.Order.shippingAddress.personId
        : order.Order.withoutShipping.personId;

      username = order.Order.shippingAddress
        ? order.Order.shippingAddress.first_name +
          " " +
          order.Order.shippingAddress.last_name
        : order.Order.withoutShipping.name +  
          " " +
          order.Order.withoutShipping.surname;
    } else {
      ID = order.Order.shippingAddress
        ? order.Order.shippingAddress.personId
        : order.Order.withoutShipping.personId;

      username = order.Order.shippingAddress
        ? order.Order.shippingAddress.last_name +
          " " +
          order.Order.shippingAddress.first_name
        : order.Order.withoutShipping.surname +
          " " +
          order.Order.withoutShipping.name;
    }
  }

  console.log(order);
  return (
    <article className={styles.container}>
      {order?.Order && (
        <>
          <h1>შეკვეთა N{params.id}</h1>
          <h2>დეტალები</h2>
          <section className={styles.sectionDetails}>
            <div>
              <p>
                <b>ID: </b>
                {ID}
              </p>
              <p>
                <b>
                  {order.Order.physicPerson ? "მომხმარებელი: " : "კომპანია: "}
                </b>
                {username}
              </p>

              <p>
                <b>ტელეფონი:</b>{" "}
                {order.Order.shippingAddress
                  ? order.Order.shippingAddress.phone
                  : order.Order.withoutShipping.phone}
              </p>
              {order.Order.wants_delivery ? (
                <>
                  <p>
                    <b>მიტანის სერვისი:</b>
                    {order.Order.shippingAddress.location}
                  </p>
                  <p>
                    <b>მისამართი:</b>
                    {order.Order.shippingAddress.address}
                  </p>
                </>
              ) : (
                <p>
                  <b>ოფისი:</b>
                  {order.Order.withoutShipping.warehouse.location}
                </p>
              )}

              <p>
                <b>თარიღი:</b>
                {order.Order.createdAt.substring(0, 10)}
              </p>
            </div>
            <div>
              <p className={styles.sum}>
                <b>ჯამი:</b>
                {Number(order.Order.totalPrice) + Number(order.Order.shippingPrice)} ლ
              </p>
              {order.Order.wants_delivery && (
                <p className={styles.sum}>
                  <b>მიტანის სერვისი:</b>
                  {order.Order.shippingPrice} ლ
                </p>
              )}
              <p
                className={styles.status}
                style={{ color: order.Order.isDelivered ? "green" : "red" }}
              >
                <b>{order.Order.isDelivered ? "ჩაბარებულია:" : "სტატუსი:"}</b>
                {order.Order.isDelivered
                  ? order.Order.deliveredAt.substring(0, 10)
                  : "მუშავდება"}
              </p>
              {user.is_staff && !order.Order.isDelivered && (
                <button
                  className={styles.delivered}
                  onClick={() => dispatch(orderDelivered(params.id))}
                >
                  ჩაბარებულია
                </button>
              )}
            </div>
          </section>
        </>
      )}
      <h2>პროდუქტები</h2>
      <section className={styles.products}>
        {order?.Order &&
          order?.Order.orderItems.map((product, index) => (
            <div className={styles.product} key={product._id}>
              <img
                src={"/images/" + product.image}
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
                  <p>{order.size[index].size}</p>
                  <p>
                    <b>ფასი: </b> {product.price} ლ
                  </p>
                  <p>
                    <b>ფერი: </b>
                    {order.variants[index].color}
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
