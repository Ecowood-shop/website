// Import styles and icons
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// Import actions
import {
  getCategories,
  deleteCategory,
} from "../../../toolkit/category/actions";
import { reset } from "../../../toolkit/category/categorySlice";

// Import components
import Nav from "./Nav";
import { Loader, Table, ErrorMessage } from "../../../components";

const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("global.category"),
    accessor: "name",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  & > div {
    overflow-x: auto;
  }
`;

const MessageContainer = styled.div`
  ${(props) => props.$auth && "cursor:pointer;"}
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

// Export category screen
function CategoryScreen() {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["admin"]);

  // Get categories from store
  const categoriesSlice = useSelector((state) => state.categories);
  const { error, isLoading, categories, success } = categoriesSlice;

  useEffect(() => {
    dispatch(getCategories({ language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language]);

  return (
    <Container>
      <Nav navigate={navigate} t={t} />

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color={"darkmagenta"} />
      ) : categories.length > 0 ? (
        <InnerContainer>
          {/* Shipping prices table */}
          <Table
            columns={columns(t)}
            data={categories}
            link="/admin/categories/"
            linkEnd="/edit"
            Delete={(id) =>
              dispatch(deleteCategory({ id: id, language: i18n.language }))
            }
            text={t("global.deletecategory")}
          />
        </InnerContainer>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("global.no categories")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default CategoryScreen;
