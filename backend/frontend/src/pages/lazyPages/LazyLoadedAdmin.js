// Import lazy load
import { lazyLoadComponent } from "../../utils/helpers/LazyLoad";

/* Lazily loaded pages */
// Products
const AdminProductsPage = lazyLoadComponent(() =>
  import("../admin/products/ProductsScreen")
);

const AdminCreateProductPage = lazyLoadComponent(() =>
  import("../admin/create/product/Product")
);

const AdminUpdateProductPage = lazyLoadComponent(() =>
  import("../admin/edit/product/Product")
);

// Users
const AdminUsersPage = lazyLoadComponent(() =>
  import("../admin/users/UsersScreen")
);

const AdminUpdateUserPage = lazyLoadComponent(() =>
  import("../admin/edit/user/User")
);

// Categories
const AdminCategoriesPage = lazyLoadComponent(() =>
  import("../admin/categories/CategoryScreen")
);

const AdminCreateCategoryPage = lazyLoadComponent(() =>
  import("../admin/create/category/CreateCategoryScreen")
);

const AdminUpdateCategoryPage = lazyLoadComponent(() =>
  import("../admin/edit/category/Category")
);

// Cities
const AdminCitiesPage = lazyLoadComponent(() =>
  import("../admin/cities/CitiesScreen")
);

const AdminCreateCityPage = lazyLoadComponent(() =>
  import("../admin/create/city/CreateCityScreen")
);

const AdminUpdateCityPage = lazyLoadComponent(() =>
  import("../admin/edit/city/UpdateCityScreen")
);

// Discounts
const AdminDiscountsPage = lazyLoadComponent(() =>
  import("../admin/specificDiscounts/DiscountsScreen")
);

const AdminCreateDiscountPage = lazyLoadComponent(() =>
  import("../admin/create/specificDiscount/SpecificDiscount")
);

const AdminUpdateDiscountPage = lazyLoadComponent(() =>
  import("../admin/edit/specificDiscount/SpecificDiscount")
);

// Orders
const AdminOrdersPage = lazyLoadComponent(() =>
  import("../admin/orders/OrderScreen")
);

// Variants
const AdminVariantsPage = lazyLoadComponent(() =>
  import("../admin/variants/Variants")
);

// Images
const AdminImagesPage = lazyLoadComponent(() =>
  import("../admin/images/Images")
);

// Export lazy Admin pages
export const lazyAdminPages = {
  AdminProductsPage,
  AdminCreateProductPage,
  AdminUpdateProductPage,
  AdminUsersPage,
  AdminUpdateUserPage,
  AdminCategoriesPage,
  AdminCreateCategoryPage,
  AdminUpdateCategoryPage,
  AdminCitiesPage,
  AdminCreateCityPage,
  AdminUpdateCityPage,
  AdminDiscountsPage,
  AdminCreateDiscountPage,
  AdminUpdateDiscountPage,
  AdminOrdersPage,
  AdminVariantsPage,
  AdminImagesPage,
};
