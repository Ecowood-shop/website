export function mapLatestProducts(products) {
  let categoryApart = products?.map((products) => {
    let categories = products.category;
    return { categories, products };
  });
  let orderByCategories = categoryApart.reduce(
    (a, { categories, products: product }) => {
      const element = a.find(({ category }) => category === categories);
      if (element) element.products.push({ product });
      else a.push({ category: categories, products: [{ product }] });
      return a;
    },
    []
  );

  return orderByCategories;
}
