// Import styled component
import { componentIcons, socialIcons } from "../../../static/icons";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";

// Contact column
function Contact({ t }) {
  // Destructure icons
  const { MailSVG } = socialIcons;
  const { RombSVG, PhoneSVG, LocationSVG } = componentIcons;
  return (
    <Column>
      {/* Contact */}
      <IconContainer>
        <RombSVG />
      </IconContainer>
      <ItemContainer>
        <Header>{t("footer.contact")}</Header>
        <Item $small>
          <PhoneSVG /> 599 99 99 99
        </Item>
        <Item $small>
          <a href="mailto:dd@gmail.com">
            <MailSVG /> sales@essltd.ge{" "}
          </a>
        </Item>
        <Item $small>
          <LocationSVG /> {t("footer.Tbilisi, Tskalsadeni St. N21")}
        </Item>
      </ItemContainer>
    </Column>
  );
}

export default Contact;
