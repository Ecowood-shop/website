// Export columns for orders table
export const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("profile.total"),
    accessor: (d) => Number(d.totalPrice) + Number(d.shippingPrice) + " ₾",
  },
  {
    Header: t("global.delivered"),
    accessor: (d) =>
      d.isDelivered ? (
        <p
          style={{
            color: "green",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {d?.deliveredAt.substring(0, 10)}
        </p>
      ) : (
        <p
          style={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {t("global.processing")}
        </p>
      ),
  },
];
