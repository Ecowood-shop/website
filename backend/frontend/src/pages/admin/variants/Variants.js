// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVariants } from "../../../toolkit/variant/actions";
import { reset } from "../../../toolkit/variant/variantSlice";
import { getColors } from "../../../toolkit/color/colorSlice";

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

  const variantsSlice = useSelector((state) => state.variants);
  const { error, isLoading, variants, success } = variantsSlice;

  const { colors } = useSelector((state) => state.colors);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVariants({ id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, id]);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate(`/admin/products/${id}/edit`)}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {colors && <Variant create colors={colors} id={id} t={t} />}
      {isLoading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {variants &&
        variants.map((variant) => (
          <Variant variant={variant} key={variant.id} t={t} />
        ))}
    </article>
  );
}

export default Variants;
