const ClientDetails = () => {

  const clients = [
    {name:"ABC Pvt Ltd",employee:"Abijith",rfq:12,revenue:200000},
    {name:"BuildTech",employee:"Sarath",rfq:8,revenue:120000},
  ]

  return (

    <div className="p-4 md:p-6">

      <h1 className="text-xl font-bold mb-4">
        Client Details
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow rounded">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Employee</th>
              <th className="p-3">RFQ Count</th>
              <th className="p-3">Revenue</th>
            </tr>

          </thead>

          <tbody>

            {clients.map((c,i)=>(
              <tr key={i} className="text-center border-t">

                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.employee}</td>
                <td className="p-3">{c.rfq}</td>
                <td className="p-3">₹ {c.revenue}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ClientDetails