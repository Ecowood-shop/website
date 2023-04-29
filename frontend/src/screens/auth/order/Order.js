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

// translate
import { useTranslation } from "react-i18next";

function Order() {
  const { t } = useTranslation(["auth"]);
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
          <h1>
            {t("order.order")} N{params.id}
          </h1>
          <h2>{t("order.details")}</h2>
          <section className={styles.sectionDetails}>
            <div>
              <p>
                <b>ID: </b>
                {ID}
              </p>
              <p>
                <b>{t("order.receiver")}</b>
                {username}
              </p>

              <p>
                <b>{t("order.phone")}:</b>
                {order.Order.shippingAddress
                  ? order.Order.shippingAddress.phone
                  : order.Order.withoutShipping.phone}
              </p>
              {order.Order.wants_delivery ? (
                <>
                  <p>
                    <b>{t("order.address")}:</b>
                    {order.Order.shippingAddress.location},
                    {order.Order.shippingAddress.address}
                  </p>
                </>
              ) : (
                <p>
                  <b>{t("order.office")}:</b>
                  {order.Order.withoutShipping.warehouse.location}
                </p>
              )}

              <p>
                <b>{t("order.date")}:</b>
                {order.Order.createdAt.substring(0, 10)}
              </p>
            </div>
            <div>
              {" "}
              {order.Order.wants_delivery && (
                <p className={styles.sum}>
                  <b>{t("order.shipping")}:</b>
                  {order.Order.shippingPrice} ₾
                </p>
              )}
              <p className={styles.sum}>
                <b>{t("order.total")}:</b>
                {Number(order.Order.totalPrice) +
                  Number(order.Order.shippingPrice)}{" "}
                ₾
              </p>
              <p
                className={styles.status}
                style={{ color: order.Order.isDelivered ? "green" : "red" }}
              >
                <b>
                  {order.Order.isDelivered
                    ? t("order.delivered")
                    : t("order.status")}
                  :
                </b>
                {order.Order.isDelivered
                  ? order.Order.deliveredAt.substring(0, 10)
                  : t("order.in progress")}
              </p>
              {user.is_staff && !order.Order.isDelivered && (
                <button
                  className={styles.delivered}
                  onClick={() => dispatch(orderDelivered(params.id))}
                >
                  {t("order.delivered")}
                </button>
              )}
            </div>
          </section>
        </>
      )}
      <h2>{t("cart.products")}</h2>
      <section className={styles.products}>
        {order?.Order &&
          order?.Order.orderItems.map((product, index) => (
            <div className={styles.product} key={product._id}>
              <img
                src={"/images/" + product.image}
                onClick={() => navigate(`/product/${product.product}`)}
                alt={product.name}
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
                    <b>{t("global.price")}: </b> {product.price} ₾
                  </p>
                  <p>
                    <b>{t("global.color")}: </b>
                    {order.variants[index].color}
                  </p>
                </div>
              </div>
              <p className={styles.emount}>
                {product.qty}{" "}
                {product.qty > 1 ? t("global.items") : t("global.item")}
              </p>
            </div>
          ))}
      </section>
    </article>
  );
}

export default Order;
