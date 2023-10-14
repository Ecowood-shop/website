// Import styled components
import { styled } from "styled-components";
import { DeleteSVG, EditSVG } from "../../static/icons/components";
// Import hooks
import { useState } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import components
import Popup from "./components/Popup";

// SVG container
const SVG = styled.div`
  padding: 0.3rem 0 0.1rem 0;
  svg {
    height: 20px;
    width: 20px;
  }
`;

function Table({ columns, data, link, linkEnd, Delete, text, user }) {
  // initialize hooks
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [isPopped, setIsPopped] = useState(false);
  const { t } = useTranslation(["admin"]);

  const popper = (id) => {
    setId(id);
    setIsPopped(!isPopped);
  };

  // Functions
  const edit = (row) => {
    navigate(
      link + (row.values._id ? row.values._id : row.values.id) + linkEnd
    );
  };

  const popUp = (row) => {
    popper(row.values._id ? row.values._id : row.values.id);
  };

  // Create table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Container $admin={!user}>
      {isPopped && (
        <Popup
          text={t("global.delete1") + ` ${text} ` + t("global.delete2") + "?"}
          popper={() => popper()}
          Delete={() => Delete(id)}
        />
      )}
      <table {...getTableProps()} className="w3-animate-right">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key="0">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      <div>{cell.render("Cell")} </div>
                    </td>
                  );
                })}

                <td>
                  <SVG onClick={() => edit(row)}>
                    <EditSVG />
                  </SVG>
                </td>
                {!user && (
                  <td>
                    <SVG onClick={() => popUp(row)}>
                      <DeleteSVG />
                    </SVG>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default Table;

const Container = styled.div`
  width: 100%;
  table {
    width: 100%;
    th {
      background-image: var(--linear-primary);
      color: white;
      border-radius: 10%;
      font-size: var(--small-l);
      padding: 0.5rem;
      text-transform: capitalize;
    }

    div {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* number of lines to show */
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    td {
      padding: 0 0.5rem;
      border-radius: 10%;
      text-align: center;
      border: 3px solid var(--color-magenta);
      transition: transform 0.1s ease-out;
      font-size: var(--small-l);

      ${(props) => props.$admin && "&:nth-last-child(2),"} &:last-child {
        background-color: var(--color-magenta);
        &:hover {
          cursor: pointer;
          background-color: var(--white);

          svg {
            fill: var(--darkmagenta);
          }
        }
      }
    }
  }
`;