// Import lazy Layout
import { lazyLayouts } from "../layouts";

// Import lazy Pages
import { lazyPages } from "../pages";

// Export Public router
export default function PublicRoutes() {
  const { PublicLayout } = lazyLayouts;

  return {
    path: "/",
    element: <PublicLayout />,
    children: [
      // Home
      {
        path: "/",
        element: <lazyPages.HomePage />,
      },

      // Authorization
      {
        path: "authorization",
        element: <lazyPages.AuthorizationPage />,
      },

      // About
      {
        path: "about-us",
        element: <lazyPages.AboutPage />,
      },

      // Products
      {
        path: "products/search",
        element: <lazyPages.ProductsPage />,
      },
      {
        path: "product/:id",
        element: <lazyPages.ProductPage />,
      },

      // Cart
      {
        path: "cart",
        element: <lazyPages.CartPage />,
      },

      // Verification
      {
        path: "verification/:id/:token",
        element: <lazyPages.VerificationPage />,
      },

      // Reset Password
      {
        path: "password-reset/:id/:token",
        element: <lazyPages.ResetPasswordPage />,
      },

      // Error
      {
        path: "*",
        element: <lazyPages.ErrorPage />,
      },
    ],
  };
}
