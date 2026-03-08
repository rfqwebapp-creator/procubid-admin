import { useState } from "react"
import { ArrowLeft, Search, Eye } from "lucide-react"
import RFQModal from "./RFQModal"
import ClientRevenueChart from "./ClientRevenueChart"

const ClientDetails = () => {

const [search,setSearch] = useState("")
const [sector,setSector] = useState("All")
const [sort,setSort] = useState("none")
const [selected,setSelected] = useState(null)

const clients = [

{client:"Al Futtaim Group",handler:"Ahmed Khan",sector:"Infrastructure",value:2400000,rfq:12,status:"Active"},
{client:"Emaar Properties",handler:"Sarah Ali",sector:"Commercial",value:1800000,rfq:8,status:"Active"},
{client:"Dubai Municipality",handler:"John Peters",sector:"Government",value:3100000,rfq:15,status:"Active"},
{client:"DEWA",handler:"Ravi Menon",sector:"Energy",value:890000,rfq:5,status:"New"},
{client:"Etisalat",handler:"Fatima Hassan",sector:"Telecom",value:1200000,rfq:7,status:"Active"},
{client:"ADNOC",handler:"Omar Khalid",sector:"Oil & Gas",value:4500000,rfq:20,status:"Active"},
{client:"Nakheel",handler:"Ahmed Khan",sector:"Real Estate",value:2100000,rfq:9,status:"Inactive"}

]

let filtered = clients.filter(c =>
c.client.toLowerCase().includes(search.toLowerCase())
)

if(sector !== "All"){
filtered = filtered.filter(c => c.sector === sector)
}

if(sort === "high"){
filtered.sort((a,b)=>b.value-a.value)
}

if(sort === "low"){
filtered.sort((a,b)=>a.value-b.value)
}

return(

<div className="p-6 space-y-6">

{/* HEADER */}

<div className="flex items-start gap-3">

<ArrowLeft className="mt-1 text-gray-500"/>

<div>
<h1 className="text-2xl font-bold">Client Details</h1>
<p className="text-gray-500">
Clients handled by employees
</p>
</div>

</div>

{/* SEARCH + FILTER */}

<div className="flex flex-wrap gap-4">

<input
type="text"
placeholder="Search clients..."
className="border px-4 py-2 rounded-lg"
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="border px-4 py-2 rounded-lg"
onChange={(e)=>setSector(e.target.value)}
>

<option>All</option>
<option>Infrastructure</option>
<option>Commercial</option>
<option>Government</option>
<option>Energy</option>
<option>Telecom</option>
<option>Oil & Gas</option>
<option>Real Estate</option>

</select>

<select
className="border px-4 py-2 rounded-lg"
onChange={(e)=>setSort(e.target.value)}
>

<option value="none">Sort Value</option>
<option value="high">High → Low</option>
<option value="low">Low → High</option>

</select>

</div>

{/* TABLE */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="min-w-full">

<thead className="border-b text-sm text-gray-500">

<tr>

<th className="p-4 text-left">CLIENT</th>
<th className="p-4 text-left">HANDLER</th>
<th className="p-4 text-left">SECTOR</th>
<th className="p-4 text-left">VALUE</th>
<th className="p-4 text-left">RFQS</th>
<th className="p-4 text-left">STATUS</th>
<th className="p-4 text-left">ACTION</th>

</tr>

</thead>

<tbody>

{filtered.map((c,i)=>(

<tr key={i} className="border-b hover:bg-gray-50">

<td className="p-4 font-semibold">{c.client}</td>
<td className="p-4">{c.handler}</td>
<td className="p-4">{c.sector}</td>
<td className="p-4 font-semibold">
${(c.value/1000000).toFixed(1)}M
</td>
<td className="p-4">{c.rfq}</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm
${c.status==="Active" && "bg-green-100 text-green-700"}
${c.status==="New" && "bg-blue-100 text-blue-700"}
${c.status==="Inactive" && "bg-gray-200 text-gray-600"}
`}>

{c.status}

</span>

</td>

<td className="p-4">

<button
onClick={()=>setSelected(c)}
className="flex items-center gap-1 text-blue-600 hover:underline"
>

<Eye size={16}/>
View

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* CLIENT REVENUE CHART */}

<ClientRevenueChart />

{/* MODAL */}

{selected && <RFQModal client={selected} close={()=>setSelected(null)} />}

</div>

)

}

export default ClientDetails