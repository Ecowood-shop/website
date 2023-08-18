// Import styles
import {
  Text,
  List,
  Section,
  BoldText,
  SubHeader,
  TextHeader,
  ListElement,
} from "../styles";

// Export cookie policy
function CookiePolicy({ cookieRef }) {
  return (
    <Section ref={cookieRef} id="cookiePolicy">
      <SubHeader>Cookie Policy</SubHeader>
      <Text>
        This Cookie Policy explains how we use cookies and similar tracking
        technologies on our website. By using our website and agreeing to this
        policy, you consent to our use of cookies in accordance with the terms
        of this policy.
      </Text>

      <TextHeader>1. What are Cookies?</TextHeader>
      <Text>
        Cookies are small text files that are placed on your device when you
        visit our website. They are widely used in order to make websites work
        more efficiently and provide improved user experiences. Cookies enable
        the website to recognize your device and store information about your
        preferences or past actions.
      </Text>

      <List>
        <TextHeader>2. Types of Cookies We Use</TextHeader>

        <ListElement>
          <BoldText>Authorization Session Cookies:</BoldText> These cookies are
          essential for the proper functioning of our website's authentication
          and authorization processes. They allow you to navigate through the
          website and access secure areas. Without these cookies, certain
          features may not function properly.
        </ListElement>

        <ListElement>
          <BoldText>Cookie Popup Acceptance Cookie:</BoldText> This cookie is
          used to remember whether you have accepted our cookie policy and popup
          notification. It helps us avoid showing you the cookie notice every
          time you visit our website.
        </ListElement>
      </List>

      <List>
        <TextHeader>3. How We Use Cookies</TextHeader>
        <Text>We use cookies for the following purposes:</Text>

        <ListElement>
          <BoldText>Authentication and Security:</BoldText> Authorization
          session cookies help secure your access to our website's protected
          areas.
        </ListElement>

        <ListElement>
          <BoldText>Functionality:</BoldText> Authorization session cookies also
          enable certain website features and functionalities to work properly.
        </ListElement>

        <ListElement>
          <BoldText> Analytics and Performance:</BoldText> We may use cookies to
          gather information about how you use our website, such as which pages
          you visit most often. This helps us improve the website's performance
          and user experience.
        </ListElement>
      </List>

      <TextHeader>4. Managing Cookies</TextHeader>
      <Text>
        You can control and manage cookies through your browser settings. You
        can choose whether to accept cookies, and you can also delete existing
        cookies from your device. Please note that disabling certain cookies may
        impact the functionality of our website.
      </Text>

      <TextHeader>5. Third-Party Cookies</TextHeader>
      <Text>
        We may also use third-party services that set cookies on our website.
        These third-party cookies are governed by the respective third-party
        privacy policies.
      </Text>

      <TextHeader>6. Changes to Cookie Policy</TextHeader>
      <Text>
        We may update this Cookie Policy from time to time to reflect changes in
        technology, legal requirements, or our practices. Please review this
        policy periodically.
      </Text>
    </Section>
  );
}

export default CookiePolicy;
