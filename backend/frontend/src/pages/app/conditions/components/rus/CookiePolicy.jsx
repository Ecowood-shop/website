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
      <SubHeader>Политика использования файлов Cookie</SubHeader>
      <Text>
        Эта Политика использования файлов cookie объясняет, как мы используем
        файлы cookie и аналогичные технологии отслеживания на нашем веб-сайте.
        Используя наш веб-сайт и соглашаясь с этой политикой, вы соглашаетесь с
        использованием файлов cookie в соответствии с условиями этой политики.
      </Text>

      <TextHeader>1. Что такое файлы Cookie?</TextHeader>
      <Text>
        Файлы cookie - это небольшие текстовые файлы, которые размещаются на
        вашем устройстве при посещении нашего веб-сайта. Они широко используются
        для более эффективной работы веб-сайтов и для предоставления улучшенного
        пользовательского опыта. Файлы cookie позволяют веб-сайту распознавать
        ваше устройство и сохранять информацию о ваших предпочтениях или
        предыдущих действиях.
      </Text>

      <List>
        <TextHeader>2. Типы файлов Cookie, которые мы используем</TextHeader>

        <ListElement>
          <BoldText>Файлы Cookie для авторизации и сеансов: </BoldText> Эти
          файлы cookie являются необходимыми для правильной функциональности
          процессов аутентификации и авторизации на нашем веб-сайте. Они
          позволяют вам перемещаться по веб-сайту и получать доступ к защищенным
          областям. Без этих файлов cookie некоторые функции могут работать
          некорректно.
        </ListElement>

        <ListElement>
          <BoldText>Файл согласия на всплывающее окно Cookie: </BoldText> Этот
          файл cookie используется для запоминания, приняли ли вы нашу политику
          использования файлов cookie и уведомление о всплывающем окне. Он
          помогает нам избежать показа вам уведомления о файлах cookie каждый
          раз при посещении нашего веб-сайта.
        </ListElement>
      </List>

      <List>
        <TextHeader>3. Как мы используем файлы Cookie</TextHeader>
        <Text>Мы используем файлы cookie для следующих целей:</Text>

        <ListElement>
          <BoldText>Аутентификация и безопасность: </BoldText> Файлы cookie для
          авторизации и сеансов помогают обеспечить безопасный доступ к
          защищенным областям нашего веб-сайта.
        </ListElement>

        <ListElement>
          <BoldText>Функциональность: </BoldText> Файлы cookie для авторизации и
          сеансов также позволяют корректно функционировать определенным
          функциям и возможностям веб-сайта.
        </ListElement>

        <ListElement>
          <BoldText> Аналитика и производительность:</BoldText> Мы можем
          использовать файлы cookie, чтобы собирать информацию о том, как вы
          используете наш веб-сайт, например, какие страницы вы посещаете чаще
          всего. Это помогает нам улучшить производительность и пользовательский
          опыт веб-сайта.
        </ListElement>
      </List>

      <TextHeader>4. Управление файлами Cookie</TextHeader>
      <Text>
        Вы можете контролировать и управлять файлами cookie через настройки
        вашего браузера. Вы можете выбрать, принимать ли файлы cookie, и также
        можете удалить существующие файлы cookie с вашего устройства. Обратите
        внимание, что отключение некоторых файлов cookie может повлиять на
        функциональность нашего веб-сайта.
      </Text>

      <TextHeader>5. Файлы Cookie от сторонних поставщиков</TextHeader>
      <Text>
        Мы также можем использовать услуги сторонних поставщиков, которые
        устанавливают файлы cookie на нашем веб-сайте. Эти файлы cookie
        сторонних поставщиков регулируются соответствующими политиками
        конфиденциальности сторонних поставщиков.
      </Text>

      <TextHeader>
        6. Изменения в Политике использования файлов Cookie
      </TextHeader>
      <Text>
        Мы можем время от времени обновлять эту Политику использования файлов
        cookie, чтобы отразить изменения в технологии, правовых требованиях или
        наших практиках. Пожалуйста, периодически просматривайте эту политику.
      </Text>
    </Section>
  );
}

export default CookiePolicy;
