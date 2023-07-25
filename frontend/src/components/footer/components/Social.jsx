// Import styled component
import { componentIcons, socialIcons } from "../../../static/icons";
import { Column, Header, IconContainer, ItemContainer, Item } from "../style";

// Social column
function Social({ t }) {
  // Destructure icons
  const { FacebookSVG, YoutubeSVG, InstagramSVG } = socialIcons;
  const { RombSVG } = componentIcons;
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
