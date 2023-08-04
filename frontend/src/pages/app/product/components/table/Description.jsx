// Import styles
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Table = styled.table`
  width: 100%;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;

const TableHead = styled.th`
  min-width: 30%;
  padding: 0.5rem;

  text-align: left;
  color: var(--black);
  font-size: var(--small-l);
  text-transform: capitalize;
  border-bottom: 1px solid var(--color-primary) !important;
`;

const TableData = styled.td`
  width: 70%;
  padding: 0.5rem;

  text-align: left;
  font-size: var(--small-l);
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-primary) !important;

  &::first-letter {
    text-transform: capitalize;
  }
`;

function Description({ product, t }) {
  return (
    <Container>
      <Table>
        <TableBody>
          {/* Brand */}
          <TableRow>
            <TableHead>
              <b>{t("product.brand")}</b>
            </TableHead>
            <TableData>{product.brand}</TableData>
          </TableRow>

          {/* Category */}
          <TableRow>
            <TableHead>
              <b>{t("product.category")}</b>
            </TableHead>
            <TableData>{product.category}</TableData>
          </TableRow>

          {/* Coverage length */}
          {product.coverageLength && (
            <TableRow>
              <TableHead>
                <b>{t("product.cover")}</b>
              </TableHead>
              <TableData>
                {product.coverageLength} {t("product.meter")}
                <sup>2</sup> (1 {t("product.layer")})
              </TableData>
            </TableRow>
          )}

          {/* Size */}
          <TableRow>
            <TableHead>
              <b>{t("product.volume")}</b>
            </TableHead>
            <TableData>{product.size}</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}

export default Description;
