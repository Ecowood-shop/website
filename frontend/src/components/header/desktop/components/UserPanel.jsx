// Import styled components
import { UserPanel as UserPanelComponent, SVGContainer, Link } from "./style";
// Import svgs
import { headerIcons } from "../../../../static/icons";
// Import redux
import { useDispatch } from "react-redux";
import { logout } from "../../../../toolkit/user/actions";

// Export user panel component
function UserPanel({ user, t, navigate, panelChanger }) {
  // Destructure icons
  const { AdminPanelSVG, ProfileSVG, CartSVG, LogOutSVG } = headerIcons;

  // Hooks
  const dispatch = useDispatch();

  return (
    <UserPanelComponent>
      {/* Open admin menu if user is staff */}
      {user.is_staff && (
        <Link onClick={(event) => panelChanger(event)}>
          <SVGContainer>
            <AdminPanelSVG />
          </SVGContainer>
          {t("header.admin panel")}
        </Link>
      )}

      {/* Profile link */}
      <Link onClick={() => navigate("/profile")}>
        <SVGContainer>
          <ProfileSVG />
        </SVGContainer>
        {t("header.profile")}
      </Link>

      {/* Cart link */}
      <Link onClick={() => navigate("/cart")}>
        <SVGContainer>
          <CartSVG />
        </SVGContainer>
        {t("header.cart")}
      </Link>

      {/* Log out link */}
      <Link $borderBottom onClick={() => dispatch(logout())}>
        <SVGContainer>
          <LogOutSVG />
        </SVGContainer>
        {t("header.log out")}
      </Link>
    </UserPanelComponent>
  );
}

export default UserPanel;
