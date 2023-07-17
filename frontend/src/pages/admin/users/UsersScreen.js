// REACT
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../../toolkit/users/actions";
import { reset } from "../../../toolkit/users/usersSlice";

// COMPONENTS
import UserFilter from "../../../components/filter/UserFilter";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";

// OTHERS
import styles from "./style.module.scss";

// translate
import { useTranslation } from "react-i18next";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={styles.iconY}
        >
          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className={styles.iconN}
        >
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      ),
  },
];

function UsersScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const usersSlice = useSelector((state) => state.users);
  const { error, isLoading, users, success } = usersSlice;

  // PARAMS
  const word = searchParams.get("word");
  const status = searchParams.get("status");
  const page = searchParams.get("page");

  useEffect(() => {
    dispatch(getUsers({ page: page, word: word, status: status }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, word, status, page, success]);

  return (
    <section className={styles.container}>
      <UserFilter />
      {isLoading && <Loader color="darkmagenta" />}{" "}
      {error && <Message>{error}</Message>}
      {users?.users?.length > 0 && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns(t)}
              data={users.users}
              link="/admin/users/"
              linkEnd="/edit"
              Delete={(id) => dispatch(deleteUser({ id: id }))}
              text={t("user.user")}
            />
          </div>

          <Pagination pages={users.pages} page={users.page} />
        </>
      )}
    </section>
  );
}

export default UsersScreen;
