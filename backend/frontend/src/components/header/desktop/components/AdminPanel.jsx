// Import svgs
import { headerIcons } from "../../../../static/icons";

// Import styled components
import { SVGContainer, UserPanel, Link } from "./style";

// Export admin panel component
function AdminPanel({ t, navigate, panelChanger }) {
  // Destructure icons
  const { BackSVG, ProductSVG, OrderSVG, UsersSVG, DiscountSVG } = headerIcons;

  return (
    <UserPanel>
      {/* User Panel link */}
      <Link onClick={(event) => panelChanger(event)}>
        <SVGContainer>
          <BackSVG />
        </SVGContainer>
        {t("header.back")}
      </Link>

      {/* Users link */}
      <Link onClick={() => navigate("/admin/users")}>
        <SVGContainer>
          <UsersSVG />
        </SVGContainer>
        {t("header.users")}
      </Link>

      {/* Products link */}
      <Link onClick={() => navigate("/admin/products")}>
        <SVGContainer>
          <ProductSVG />
        </SVGContainer>
        {t("header.products")}
      </Link>

      {/* Orders link */}
      <Link onClick={() => navigate("/admin/orders")}>
        <SVGContainer>
          <OrderSVG />
        </SVGContainer>
        {t("header.orders")}
      </Link>

      {/* Discounts link */}
      <Link onClick={() => navigate("/admin/discounts")}>
        <SVGContainer>
          <DiscountSVG />
        </SVGContainer>
        {t("header.discounts")}
      </Link>
    </UserPanel>
  );
}

export default AdminPanel;
