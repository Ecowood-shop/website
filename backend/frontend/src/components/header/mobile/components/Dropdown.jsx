// Import styled components
import { DropDown, Item, IconContainer, ArrowContainer } from "./style";
import { headerIcons} from "../../../../static/icons";
import { BranchSVG,EcowoodSVG,RightArrowSVG } from "../../../../static/icons/components";
// Import components
import Translate from "./Translate";
import AdminPanel from "./AdminPanel";

// Export dropdown component
function Dropdown({ i18n, t, navigate, closeMenu, user }) {
  // Destructure icons
  const { CartSVG, ProfileSVG } = headerIcons;

  // Functions
  const navigator = (url) => {
    navigate(url);
    closeMenu();
  };
  return (
    <DropDown>
      {/* Cart */}
      <Item onClick={() => navigator("/cart")}>
        <IconContainer>
          <CartSVG />
        </IconContainer>
        {t("header.cart")}
        <ArrowContainer>
          <RightArrowSVG />
        </ArrowContainer>
      </Item>

      {/* Profile */}
      {user && (
        <Item onClick={() => navigator("/profile")}>
          <IconContainer>
            <ProfileSVG />
          </IconContainer>
          {t("header.profile")}{" "}
          <ArrowContainer>
            <RightArrowSVG />
          </ArrowContainer>
        </Item>
      )}

      {/* Admin panel */}
      {user?.is_staff && (
        <Item>
          <AdminPanel navigator={navigator} t={t} />
        </Item>
      )}

      {/* Branches */}
      <Item onClick={() => navigator("/about-us#branches")}>
        <IconContainer>
          <BranchSVG />
        </IconContainer>
        {t("header.branches")}
        <ArrowContainer>
          <RightArrowSVG />
        </ArrowContainer>
      </Item>

      {/* Ecowood */}
      <Item>
        <IconContainer>
          <EcowoodSVG />
        </IconContainer>
        <a href="https://ecowood.ge/" target="_blank" rel="noopener noreferrer">
          ecowood
        </a>{" "}
        <ArrowContainer>
          <RightArrowSVG />
        </ArrowContainer>
      </Item>

      {/* Translate */}
      <Item>
        <Translate i18n={i18n} closeMenu={closeMenu} />
      </Item>
    </DropDown>
  );
}

export default Dropdown;
