// Import styled component
import { socialIcons } from "../../../static/icons";
import { RombSVG,PhoneSVG,LocationSVG } from "../../../static/icons/components";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";

// Contact column
function Contact({ t }) {
  // Destructure icons
  const { MailSVG } = socialIcons;
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
