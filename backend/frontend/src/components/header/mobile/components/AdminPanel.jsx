// Import styled components
import { styled } from "styled-components";
import { DropDown, Item, IconContainer } from "./style";

// Import icons
import { headerIcons } from "../../../../static/icons";
import { useState } from "react";

// Main container
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Export admin dropdown component
function AdminPanel({ t, navigator }) {
  // Destructure icons
  const { ProductSVG, OrderSVG, UsersSVG, DiscountSVG, AdminPanelSVG } =
    headerIcons;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      {/* Admin panel */}
      <Item $left onClick={() => setIsOpen(!isOpen)}>
        <IconContainer>
          <AdminPanelSVG />
        </IconContainer>
        {t("header.admin panel")}
      </Item>

      {isOpen && (
        <DropDown className="w3-animate-right">
          {/* Users link */}
          <Item onClick={() => navigator("/admin/users")}>
            <IconContainer>
              <UsersSVG />
            </IconContainer>
            {t("header.users")}
          </Item>

          {/* Products link */}
          <Item onClick={() => navigator("/admin/products")}>
            <IconContainer>
              <ProductSVG />
            </IconContainer>
            {t("header.products")}
          </Item>

          {/* Orders link */}
          <Item onClick={() => navigator("/admin/orders")}>
            <IconContainer>
              <OrderSVG />
            </IconContainer>
            {t("header.orders")}
          </Item>

          {/* Discounts link */}
          <Item onClick={() => navigator("/admin/discounts")}>
            <IconContainer>
              <DiscountSVG />
            </IconContainer>
            {t("header.discounts")}
          </Item>
        </DropDown>
      )}
    </Container>
  );
}

export default AdminPanel;
