import React, { useState, useEffect, useRef, useMemo } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const DataTable = ({ data, columns, title, type }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [screenSize, setScreenSize] = useState("large");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const tableWrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      let newSize;
      if (width <= 425) {
        newSize = "xsmall";
      } else if (width <= 475) {
        newSize = "small";
      } else if (width <= 585) {
        newSize = "medium";
      } else {
        newSize = "large";
      }
      setScreenSize(newSize);

      if (tableWrapperRef.current) {
        const { scrollWidth, clientWidth } = tableWrapperRef.current;
        setHasScrollbar(scrollWidth > clientWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (tableWrapperRef.current) {
      const { scrollWidth, clientWidth } = tableWrapperRef.current;
      setHasScrollbar(scrollWidth > clientWidth);
    }
  }, [data, columns]);

  const formatNumber = (num) => num.toLocaleString("en-US");

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const columnGroups = useMemo(() => {
    let visible, hidden;

    switch (screenSize) {
      case "xsmall":
        visible = columns.slice(0, 2);
        hidden = columns.slice(2);
        break;
      case "small":
        visible = columns.slice(0, 3);
        hidden = columns.slice(3);
        break;
      case "medium":
        visible = columns.slice(0, 4);
        hidden = columns.slice(4);
        break;
      default:
        visible = columns;
        hidden = [];
    }

    const detailsColumns = hidden.filter((column) => {
      if (!column.detailBtn) return true;
      const detailBtnWidth = parseInt(column.detailBtn, 10);
      return isNaN(detailBtnWidth) || screenWidth <= detailBtnWidth;
    });

    const largeScreenDetailsColumns =
      screenSize === "large"
        ? columns
            .filter((col) => !visible.includes(col))
            .filter((column) => {
              if (!column.detailBtn) return true;
              const detailBtnWidth = parseInt(column.detailBtn, 10);
              return isNaN(detailBtnWidth) || screenWidth <= detailBtnWidth;
            })
        : [];

    const showDetailsBtn =
      (hasScrollbar || visible.length < columns.length) &&
      (detailsColumns.length > 0 || largeScreenDetailsColumns.length > 0);

    return {
      visible,
      detailsColumns:
        screenSize === "large" ? largeScreenDetailsColumns : detailsColumns,
      showDetailsBtn,
    };
  }, [columns, screenSize, screenWidth, hasScrollbar]);

  const renderCellContent = (item, column) => {
    if (column.render) {
      return column.render(item);
    }

    if (type === "product") {
      if (column.key === "productImgURL") {
        return item[column.key]?.length > 0 ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${item[column.key][0]}`}
            alt="Product"
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
        );
      }
      if (column.key === "totalRevenue") {
        return (
          <span className="font-medium">${formatNumber(item[column.key])}</span>
        );
      }
    } else if (type === "customer") {
      if (column.key === "totalSpent") {
        return (
          <span className="font-medium">${formatNumber(item[column.key])}</span>
        );
      }
    }

    return item[column.key];
  };

  const renderDetailsCellContent = (item, column) => {
    if (column.render) {
      return column.render(item);
    }

    if (type === "product") {
      if (column.key === "productImgURL") {
        return item[column.key]?.length > 0 ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${item[column.key][0]}`}
            alt="Product"
            className="h-16 w-16 rounded object-cover"
          />
        ) : (
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
        );
      }
      if (column.key === "totalRevenue") {
        return (
          <span className="font-medium">${formatNumber(item[column.key])}</span>
        );
      }
    } else if (type === "customer") {
      if (column.key === "totalSpent") {
        return (
          <span className="font-medium">${formatNumber(item[column.key])}</span>
        );
      }
    }

    return item[column.key];
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div ref={tableWrapperRef} className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              {columnGroups.showDetailsBtn && (
                <th
                  scope="col"
                  className="w-10 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                ></th>
              )}
              {columnGroups.visible.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-50">
            {data.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr className="hover:bg-gray-50">
                  {columnGroups.showDetailsBtn && (
                    <td className="w-10 px-3 py-4 whitespace-nowrap text-sm">
                      <button
                        className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpansion(rowIndex);
                        }}
                        aria-label={
                          expandedRows[rowIndex]
                            ? "Hide Details"
                            : "Show Details"
                        }
                      >
                        {expandedRows[rowIndex] ? (
                          <MdExpandLess size={20} />
                        ) : (
                          <MdExpandMore size={20} />
                        )}
                      </button>
                    </td>
                  )}
                  {columnGroups.visible.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                </tr>

                {/* Expanded details row */}
                {expandedRows[rowIndex] &&
                  columnGroups.detailsColumns.length > 0 && (
                    <tr>
                      <td
                        colSpan={
                          columnGroups.visible.length +
                          (columnGroups.showDetailsBtn ? 1 : 0)
                        }
                        className="px-6 py-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {columnGroups.detailsColumns.map((column, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase">
                                {column.header}
                              </span>
                              <div className="mt-1">
                                {renderDetailsCellContent(item, column)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
