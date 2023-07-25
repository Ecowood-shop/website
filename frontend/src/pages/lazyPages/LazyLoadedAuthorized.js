// Import lazy load
import { lazyLoadComponent } from "../../utils/helpers/LazyLoad";

/* Lazily loaded pages */
// Profile
const AuthorizedProfilePage = lazyLoadComponent(() =>
  import("../auth/profile/Profile")
);

const AuthorizedUpdateProfilePage = lazyLoadComponent(() =>
  import("../auth/edit/Profile")
);

// Order
const AuthorizedOrderPage = lazyLoadComponent(() =>
  import("../auth/order/Order")
);

// Checkout
const AuthorizedShippingMethodPage = lazyLoadComponent(() =>
  import("../auth/checkout/shippingMethod/ShippingMethod")
);

const AuthorizedShippingDetailsPage = lazyLoadComponent(() =>
  import("../auth/checkout/shippingDetails/ShippingDetails")
);

const AuthorizedPaymentMethodPage = lazyLoadComponent(() =>
  import("../auth/checkout/paymentMethod/PaymentMethod")
);

// Export lazy Authorized pages
export const lazyAuthorizedPages = {
  AuthorizedProfilePage,
  AuthorizedUpdateProfilePage,
  AuthorizedOrderPage,
  AuthorizedShippingMethodPage,
  AuthorizedShippingDetailsPage,
  AuthorizedPaymentMethodPage,
};
