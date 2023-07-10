// Import lazy load
import { lazyLoadComponent } from "../utils/lazyLoad/LazyLoad";

/* Lazily loaded layouts */
// Public layout
const PublicLayout = lazyLoadComponent(() => import("./PublicLayout"));

// Authorized layout
const AuthorizedLayout = lazyLoadComponent(() => import("./AuthorizedLayout"));

// Admin layout
const AdminLayout = lazyLoadComponent(() => import("./AdminLayout"));

// Export lazy Layouts
export const lazyLayouts = {
  PublicLayout,
  AuthorizedLayout,
  AdminLayout,
};
