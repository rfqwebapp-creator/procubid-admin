const EmployeePerformance = () => {

  const performance = [
    {name:"Abijith",revenue:500000,clients:50},
    {name:"Sarath",revenue:450000,clients:45},
  ]

  return (

    <div className="p-4 md:p-6">

      <h1 className="text-xl font-bold mb-4">
        Employee Performance
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow rounded">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Clients</th>
            </tr>

          </thead>

          <tbody>

            {performance.map((p,i)=>(
              <tr key={i} className="text-center border-t">

                <td className="p-3">{p.name}</td>
                <td className="p-3">₹ {p.revenue}</td>
                <td className="p-3">{p.clients}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default EmployeePerformance