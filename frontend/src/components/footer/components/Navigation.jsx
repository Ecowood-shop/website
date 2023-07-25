// Import styled component
import { componentIcons } from "../../../static/icons";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";
// Import Link from router
import { Link } from "react-router-dom";

// Navigation column
function Navigation({ t }) {
  // Destructure icons
  const { RombSVG } = componentIcons;
  return (
    <Column>
      {/* Navigation */}
      <IconContainer>
        <RombSVG />
      </IconContainer>
      <ItemContainer>
        <Header>{t("footer.navigation")}</Header>
        <Item>
          <Link to="/about-us"> {t("footer.about us")}</Link>
        </Item>
        <Item>
          <Link to="/about-us">{t("footer.instruction")}</Link>
        </Item>
        <Item>
          <Link to="/about-us#branches">{t("header.branches")}</Link>
        </Item>
      </ItemContainer>
    </Column>
  );
}

export default Navigation;
