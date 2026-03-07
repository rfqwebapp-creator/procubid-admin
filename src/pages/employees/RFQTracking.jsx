const RFQTracking = () => {

  const rfqs = [
    {id:"RFQ1001",client:"ABC Pvt Ltd",employee:"Abijith",value:50000,status:"Open"},
    {id:"RFQ1002",client:"BuildTech",employee:"Sarath",value:35000,status:"Closed"},
  ]

  return (

    <div className="p-4 md:p-6">

      <h1 className="text-xl font-bold mb-4">
        RFQ Tracking
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow rounded">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">RFQ ID</th>
              <th className="p-3">Client</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Value</th>
              <th className="p-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {rfqs.map((r,i)=>(
              <tr key={i} className="text-center border-t">

                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.client}</td>
                <td className="p-3">{r.employee}</td>
                <td className="p-3">₹ {r.value}</td>
                <td className="p-3">{r.status}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default RFQTracking