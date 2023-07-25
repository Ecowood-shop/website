// Import styled component
import { componentIcons } from "../../../static/icons";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";

// Location column
function Location({ t }) {
  // Destructure icons
  const { RombSVG } = componentIcons;
  return (
    <Column>
      {/* Location */}
      <IconContainer>
        <RombSVG />
      </IconContainer>
      <ItemContainer>
        <Header>{t("footer.location")}</Header>
        <Item>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5949.817422733403!2d44.793126!3d41.787181000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x88b159ead528793b!2z4YOu4YOY4YOhIOGDm-GDkOGDoeGDkOGDmuGDlOGDkeGDmCBlY293b29k!5e0!3m2!1sen!2sge!4v1662732780634!5m2!1sen!2sge"
            allowFullScreen=""
            loading="lazy"
            title="ecowood"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Item>
      </ItemContainer>
    </Column>
  );
}

export default Location;
