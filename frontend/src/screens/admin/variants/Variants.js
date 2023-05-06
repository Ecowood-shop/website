// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVariants, getColors } from "../../../store/actions/adminActions";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Variant from "./variant/Variant";

// OTHERS
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";
function Variants() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const adminVariants = useSelector((state) => state.adminVariants);
  const { error, loading, variants, success, successUpdate, successCreate } =
    adminVariants;

  const adminColors = useSelector((state) => state.adminColors);
  const { colors } = adminColors;

  useEffect(() => {
    dispatch(getVariants(id));
    dispatch(getColors());
  }, [dispatch, success, successUpdate, successCreate, id]);

  console.log(variants);
  console.log(colors);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate(`/admin/products/${id}/edit`)}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {colors && <Variant create colors={colors} id={id} t={t} />}
      {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {variants &&
        variants.map((variant) => (
          <Variant variant={variant} key={variant.id} t={t} />
        ))}
    </article>
  );
}

export default Variants;
