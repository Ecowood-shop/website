// Import lazy Layout
import { lazyLayouts } from "../layouts";

// Import lazy Pages
import { lazyPages } from "../pages";

// Export Admin router
export default function AdminRoutes(user, loadingUser) {
  const { AdminLayout } = lazyLayouts;

  return {
    path: "/admin",
    element: <AdminLayout user={user} loading={loadingUser} />,
    children: [
      // Products
      { path: "products", element: <lazyPages.AdminProductsPage /> },

      {
        path: "products/create",
        element: <lazyPages.AdminCreateProductPage />,
      },

      {
        path: "products/:id/edit",
        element: <lazyPages.AdminUpdateProductPage />,
      },

      // Users
      { path: "users", element: <lazyPages.AdminUsersPage /> },
      { path: "users/:id/edit", element: <lazyPages.AdminUpdateUserPage /> },

      // Categories
      { path: "categories", element: <lazyPages.AdminCategoriesPage /> },

      {
        path: "categories/create",
        element: <lazyPages.AdminCreateCategoryPage />,
      },

      {
        path: "categories/:id/edit",
        element: <lazyPages.AdminUpdateCategoryPage />,
      },

      // Cities
      {
        path: "cities",
        element: <lazyPages.AdminCitiesPage />,
      },

      {
        path: "cities/create",
        element: <lazyPages.AdminCreateCityPage />,
      },

      {
        path: "cities/:id/edit",
        element: <lazyPages.AdminUpdateCityPage />,
      },

      // Discounts
      {
        path: "discounts",
        element: <lazyPages.AdminDiscountsPage />,
      },

      {
        path: "discounts/create",
        element: <lazyPages.AdminCreateDiscountPage />,
      },

      {
        path: "discounts/:id/edit",
        element: <lazyPages.AdminUpdateDiscountPage />,
      },

      // Orders
      {
        path: "orders",
        element: <lazyPages.AdminOrdersPage />,
      },

      // Variants
      {
        path: "products/:id/variants/",
        element: <lazyPages.AdminVariantsPage />,
      },

      // Images
      {
        path: "products/:id/images/",
        element: <lazyPages.AdminImagesPage />,
      },
    ],
  };
}
