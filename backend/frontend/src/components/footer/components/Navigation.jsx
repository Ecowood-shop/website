// Import styled component
import { RombSVG } from "../../../static/icons/components";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";
// Import Link from router
import { Link } from "react-router-dom";

// Navigation column
function Navigation({ t }) {
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
          <Link to="/about-us#branches">{t("header.branches")}</Link>
        </Item>
        <Item>
          <Link to="/terms-and-conditions">
            {t("footer.conditions of use")}
          </Link>
        </Item>
      </ItemContainer>
    </Column>
  );
}

export default Navigation;
