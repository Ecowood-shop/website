// Import react select and useEffect
import { useEffect } from "react";
import Select from "react-select";
// Import redux
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../toolkit/category/actions";

// Export category select
const CategorySelect = ({ t, i18n, formik }) => {
  // Get hooks
  const dispatch = useDispatch();

  // Get categories from category slice
  const categoriesSlice = useSelector((state) => state.categories);
  const { categories } = categoriesSlice;

  // Get categories according to language
  useEffect(() => {
    dispatch(getCategories({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  return (
    <>
      {/* When categories are loaded display react select */}
      {categories && (
        <Select
          options={categories}
          isClearable={true}
          placeholder={t("global.category")}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          onChange={(option) => {
            formik.setFieldValue("category", option ? option : {});
          }}
        />
      )}
    </>
  );
};

export default CategorySelect;
