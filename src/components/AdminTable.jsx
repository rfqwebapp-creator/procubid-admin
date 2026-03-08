const AdminTable = ({ columns, data }) => {
  return (

    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full text-sm">

        <thead className="bg-gray-100">

          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          {data.map((row, i) => (

            <tr key={i} className="border-t hover:bg-gray-50">

              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default AdminTable