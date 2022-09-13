// REACT
import { useSearchParams } from "react-router-dom";

function Products() {
  const [search, setSearch] = useSearchParams();
  console.log(search.get("category"));
  return (
    <div>
      Products
      <button
        onClick={() => {
          setSearch({ category: "კედელი და ჭერი" });
        }}
      >
        dd
      </button>
    </div>
  );
}

export default Products;
