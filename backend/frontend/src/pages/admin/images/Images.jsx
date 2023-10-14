// Import styles and icons
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// Import actions
import { getImages, reset } from "../../../toolkit/image/imageSlice";

// Import components
import Image from "./components/Image";
import Table from "./components/Table";
import { Loader, ErrorMessage } from "../../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1400px;
  padding: 3rem;

  ${respondTo.mobile`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.lowTablet`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.tablet`
    width:90%;
    padding: 3rem 1rem;
  `}
`;

const InnerContainer = styled.div``;
const GridContainer = styled.div`
  gap: 2rem;
  width: 100%;
  margin-top: 5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

  ${respondTo.mobile`
    width:90%;
  `}

  ${respondTo.lowTablet`
    width:90%;
  `}
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem 0;

  color: var(--red);
  border-radius: 20px;
  font-size: var(--small-l);
  text-transform: capitalize;

  svg {
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }

  ${respondTo.desktop`
    margin:7rem 0 1rem 0;
  `}
`;

// Export image page
function Images() {
  // Initialize hooks
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t, i18n } = useTranslation(["admin"]);

  // Get images from store
  const imagesSlice = useSelector((state) => state.images);
  const { error, isLoading, images, success } = imagesSlice;

  const options = [
    { label: t("images.main"), value: 0 },
    { label: t("images.images"), value: 1 },
    { label: t("images.others"), value: 2 },
  ];

  useEffect(() => {
    dispatch(getImages({ id: id, language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language, id]);

  const imagesClone = [...images];
  return (
    <Container>
      <InnerContainer>
        <Table t={t} id={id} i18n={i18n} />
      </InnerContainer>

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color={"darkmagenta"} />
      ) : imagesClone?.length > 0 ? (
        <GridContainer className="w3-animate-right">
          {imagesClone
            .sort((a, b) => a.ord - b.ord)
            .map((element) => (
              <Image
                id={element.id}
                key={element.id}
                image={element}
                i18n={i18n}
                order={
                  options.filter((option) => option.value === element.ord)[0]
                    .label
                }
              />
            ))}
        </GridContainer>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("images.no images")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default Images;
