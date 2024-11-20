import React from "react";

const Table = ({ headers, data, renderActions }) => {
  return (
    <table className="w-full border-collapse mb-4">
      <thead>
        <tr className="bg-sky-200">
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-sky-900 p-2 text-sky-900 text-center"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`border border-sky-900 p-2 text-sky-900 ${
                  cellIndex === 0 ? "text-center" : ""
                }`}
              >
                {cell}
              </td>
            ))}
            {renderActions && (
              <td className="border border-sky-900 p-2 text-sky-900 text-center">
                {renderActions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
