// Import lazy components
import { lazyPublicPages } from "./lazyPages/LazyLoadedPublic";
import { lazyAuthorizedPages } from "./lazyPages/LazyLoadedAuthorized";
import { lazyAdminPages } from "./lazyPages/LazyLoadedAdmin";

// Export Lazy Pages
export const lazyPages = {
  ...lazyPublicPages,
  ...lazyAuthorizedPages,
  ...lazyAdminPages,
};
