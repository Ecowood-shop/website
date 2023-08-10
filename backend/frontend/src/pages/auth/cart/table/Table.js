// components
import Button from "./Button";

function Table({ styles, cart, t }) {
  return (
    <section className={styles.section2}>
      <h1>{t("cart.total")}</h1>
      <div className={styles.table}>
        <h2>
          <b>{t("global.quantity")}:</b> {cart.qty}
        </h2>
        <h2>
          <b>{t("cart.total price")}: </b>
          {Number(cart.sum_price) > Number(cart.discounted_sum_price) ? (
            <>
              <i>{cart.sum_price}</i>
              {cart.discounted_sum_price} ₾
            </>
          ) : (
            <> {cart.sum_price} ₾</>
          )}
        </h2>
        <Button styles={styles} cart={cart} t={t} />
      </div>
    </section>
  );
}

export default Table;
