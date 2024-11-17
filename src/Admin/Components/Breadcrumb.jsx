import React, { useState } from "react";

const BreadcrumbTable = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex justify-end mt-4">
      <table className="border border-gray-400">
        <tbody>
          <tr>
            <td
              className={`border border-gray-400 px-3 py-1 cursor-pointer ${
                selected === "Sebelumnya"
                  ? "bg-sky-300 text-sky-900"
                  : "text-gray-600"
              }`}
              onClick={() => setSelected("Sebelumnya")}
            >
              Sebelumnya
            </td>
            <td
              className={`border border-gray-400 px-3 py-1 cursor-pointer ${
                selected === 1 ? "bg-sky-300 text-sky-900" : "text-gray-600"
              }`}
              onClick={() => setSelected(1)}
            >
              1
            </td>
            <td
              className={`border border-gray-400 px-3 py-1 cursor-pointer ${
                selected === 2 ? "bg-sky-300 text-sky-900" : "text-gray-600"
              }`}
              onClick={() => setSelected(2)}
            >
              2
            </td>
            <td
              className={`border border-gray-400 px-3 py-1 cursor-pointer ${
                selected === 3 ? "bg-sky-300 text-sky-900" : "text-gray-600"
              }`}
              onClick={() => setSelected(3)}
            >
              3
            </td>
            {/* <td className="px-3 py-1 text-gray-600">...</td> */}
            <td
              className={`border border-gray-400 px-3 py-1 cursor-pointer ${
                selected === "Selanjutnya"
                  ? "bg-sky-300 text-sky-900"
                  : "text-gray-600"
              }`}
              onClick={() => setSelected("Selanjutnya")}
            >
              Selanjutnya
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BreadcrumbTable;
