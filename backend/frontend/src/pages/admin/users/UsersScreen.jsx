// Import styles and icons
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Import components
import { UserFilter as Filter } from "../../../components/filter";
import { Loader, Pagination, ErrorMessage, Table } from "../../../components";

// Import actions
import { reset } from "../../../toolkit/users/usersSlice";
import { getUsers, deleteUser } from "../../../toolkit/users/actions";

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

const Icon = styled.svg`
  fill: white;
  height: 2rem;
  vertical-align: bottom;
  margin-right: 0.5rem;
  fill: var(--color-second);
  ${(props) => props.$success && "fill: green;"}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;

  & > div {
    overflow-x: auto;
  }
`;

const columns = (t) => [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: t("user.first name"),
    accessor: "first_name",
  },
  {
    Header: t("user.last name"),
    accessor: "last_name",
  },
  {
    Header: t("global.email"),
    accessor: "email",
  },
  {
    Header: t("user.admin"),
    accessor: (user) =>
      user.is_staff ? (
        <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" $success>
          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </Icon>
      ) : (
        <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </Icon>
      ),
  },
];

// Export users page
function UsersScreen() {
  // Initialize hoooks
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);
  const [searchParams] = useSearchParams();

  // Query params
  const word = searchParams.get("word");
  const status = searchParams.get("status");
  const page = searchParams.get("page");

  // Get users from store
  const usersSlice = useSelector((state) => state.users);
  const { error, isLoading, users, success } = usersSlice;

  useEffect(() => {
    dispatch(getUsers({ page: page, word: word, status: status }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, word, status, page, success]);

  return (
    <Container>
      {/* Filter */}
      <Filter />

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}

      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        users?.users?.length > 0 && (
          <>
            <InnerContainer>
              {/* Users table */}
              <Table
                columns={columns(t)}
                data={users.users}
                link="/admin/users/"
                linkEnd="/edit"
                Delete={(id) => dispatch(deleteUser({ id: id }))}
                text={t("global.deleteuser")}
              />
            </InnerContainer>

            {/* Pagination for orders */}
            <Pagination pages={users.pages} page={users.page} />
          </>
        )
      )}
    </Container>
  );
}

export default UsersScreen;
