import { useState } from "react"

const EmployeeList = () => {

  const [search,setSearch] = useState("")

  const employees = [
    {id:"001",name:"Procubid",referral:"Nil",clients:250,income:750000,commission:750000},
    {id:"002",name:"Abijith Anil",referral:"Abijith",clients:50,income:500000,commission:50000},
    {id:"003",name:"Sarath",referral:"Sarath",clients:45,income:450000,commission:45000},
  ]

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="p-4 md:p-6">

      <h1 className="text-xl font-bold mb-4">Employee List</h1>

      <input
        type="text"
        placeholder="Search Employee"
        className="border p-2 rounded mb-4 w-full md:w-64"
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow rounded">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Staff No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Referral</th>
              <th className="p-3">Clients</th>
              <th className="p-3">Income</th>
              <th className="p-3">Commission</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(emp=>(
              <tr key={emp.id} className="text-center border-t">

                <td className="p-3">{emp.id}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.referral}</td>
                <td className="p-3">{emp.clients}</td>
                <td className="p-3">₹ {emp.income}</td>
                <td className="p-3">₹ {emp.commission}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default EmployeeList