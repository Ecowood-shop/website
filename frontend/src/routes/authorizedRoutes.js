// Import lazy Layout
import { lazyLayouts } from "../layouts";

// Import lazy Pages
import { lazyPages } from "../pages";

// Export Public router
export default function AuthorizedRoutes(user, loading) {
  const { AuthorizedLayout } = lazyLayouts;

  return {
    path: "/",
    element: <AuthorizedLayout user={user} loading={loading} />,
    children: [
      // profile
      {
        path: "profile",
        element: <lazyPages.AuthorizedProfilePage />,
      },

      {
        path: "profile/update",
        element: <lazyPages.AuthorizedUpdateProfilePage />,
      },

      // Order
      {
        path: "order/:id/",
        element: <lazyPages.AuthorizedOrderPage />,
      },

      // Products
      {
        path: "products/searc",
        element: <lazyPages.ProductsPage />,
      },

      {
        path: "product/:id",
        element: <lazyPages.ProductPage />,
      },

      // Checkout
      {
        path: "checkout/shippingmethod",
        element: <lazyPages.AuthorizedShippingMethodPage />,
      },

      {
        path: "checkout/shippingdetails",
        element: <lazyPages.AuthorizedShippingDetailsPage />,
      },

      {
        path: "checkout/paymentmethod",
        element: <lazyPages.AuthorizedPaymentMethodPage />,
      },
    ],
  };
}
