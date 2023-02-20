// components
import Coupon from "./Coupon";
import Button from "./Button";

function Table({ styles, cart }) {
  return (
    <section className={styles.section2}>
      <h1>ჯამი</h1>
      <div className={styles.table}>
        <h2>
          <b>რაოდენობა:</b> {cart.qty}
        </h2>
        <h2>
          <b>ჯამი: </b>
          {cart.sum_price} ლ
        </h2>
        <Coupon styles={styles} />
        <Button styles={styles}  cart={cart} />
      </div>
    </section>
  );
}

export default Table;
