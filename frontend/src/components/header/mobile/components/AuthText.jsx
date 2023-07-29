// Import styles
import { AuthContainer } from "./style";
// Import redux
import { useDispatch } from "react-redux";
import { logout } from "../../../../toolkit/user/actions";

// Export authorized text
function AuthText({ navigate, closeMenu, user, t }) {
  // Hooks
  const dispatch = useDispatch();

  // Functions
  const navigator = () => {
    if (user) {
      navigate("/");
      dispatch(logout());
    } else {
      navigate("/authorization");
    }
    closeMenu();
  };

  return (
    <AuthContainer onClick={() => navigator()}>
      {user ? t("header.log out") : t("header.log in")}
    </AuthContainer>
  );
}

export default AuthText;
