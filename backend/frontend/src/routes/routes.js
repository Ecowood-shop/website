// Import router
import { useRoutes } from "react-router-dom";

// Import routes
import PublicRoutes from "./publicRoutes";
import AuthorizedRoutes from "./authorizedRoutes";
import AdminRoutes from "./adminRoutes";

// Export global router
export default function Router({ user, loading, setIsMessengerShown }) {
  return useRoutes([
    PublicRoutes(setIsMessengerShown),
    AuthorizedRoutes(user, loading),
    AdminRoutes(user, loading),
  ]);
}
