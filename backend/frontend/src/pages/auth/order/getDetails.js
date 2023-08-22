export function getDetails(order) {
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

    return { ID, username };
  }
}
