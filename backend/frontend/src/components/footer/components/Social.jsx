// Import styled component
import { socialIcons } from "../../../static/icons";
import { RombSVG } from "../../../static/icons/components";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";

// Social column
function Social({ t }) {
  // Destructure icons
  const { FacebookSVG, YoutubeSVG, InstagramSVG } = socialIcons;
  return (
    <Column>
      {/* Social */}
      <IconContainer>
        <RombSVG />
      </IconContainer>
      <ItemContainer>
        <Header>{t("footer.social")}</Header>
        <Item>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookSVG /> Facebook
          </a>
        </Item>
        <Item>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramSVG /> Instagram
          </a>
        </Item>
        <Item>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeSVG /> Youtube
          </a>
        </Item>
      </ItemContainer>
    </Column>
  );
}

export default Social;
