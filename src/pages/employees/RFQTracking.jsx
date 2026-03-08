import { useState } from "react"
import { Search, ArrowLeft } from "lucide-react"

const RFQTracking = () => {

const [search,setSearch] = useState("")

const rfqs = [

{
id:"RFQ-001",
title:"Steel Supply Contract",
client:"Al Futtaim",
employee:"Ahmed Khan",
value:450000,
stage:"Submitted",
date:"2026-02-15"
},

{
id:"RFQ-002",
title:"HVAC Installation",
client:"Emaar",
employee:"Sarah Ali",
value:280000,
stage:"Under Review",
date:"2026-02-20"
},

{
id:"RFQ-003",
title:"IT Infrastructure Setup",
client:"DEWA",
employee:"Ravi Menon",
value:620000,
stage:"Won",
date:"2026-01-10"
},

{
id:"RFQ-004",
title:"Building Materials",
client:"Nakheel",
employee:"Fatima Hassan",
value:180000,
stage:"Lost",
date:"2026-01-25"
},

{
id:"RFQ-005",
title:"Electrical Systems",
client:"Dubai Municipality",
employee:"John Peters",
value:890000,
stage:"Won",
date:"2026-02-05"
},

{
id:"RFQ-006",
title:"Safety Equipment",
client:"ADNOC",
employee:"Omar Khalid",
value:150000,
stage:"Submitted",
date:"2026-03-01"
}

]

const filtered = rfqs.filter(r =>
r.title.toLowerCase().includes(search.toLowerCase()) ||
r.client.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="p-6 space-y-6">

{/* HEADER */}

<div className="flex items-start gap-3">

<ArrowLeft className="mt-1 text-gray-500"/>

<div>

<h1 className="text-2xl font-bold">
RFQ Tracking
</h1>

<p className="text-gray-500">
Track RFQ activity by employees
</p>

</div>

</div>


{/* SEARCH */}

<div className="relative max-w-md">

<Search
size={18}
className="absolute left-3 top-3 text-gray-400"
/>

<input
type="text"
placeholder="Search RFQs..."
className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-700 outline-none"
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


{/* TABLE */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="min-w-full">

<thead className="border-b text-sm text-gray-500">

<tr>

<th className="p-4 text-left">RFQ ID</th>
<th className="p-4 text-left">TITLE</th>
<th className="p-4 text-left">CLIENT</th>
<th className="p-4 text-left">EMPLOYEE</th>
<th className="p-4 text-left">VALUE</th>
<th className="p-4 text-left">STAGE</th>
<th className="p-4 text-left">DATE</th>

</tr>

</thead>

<tbody>

{filtered.map((r,i)=>(

<tr key={i} className="border-b hover:bg-gray-50">

<td className="p-4 text-gray-600">
{r.id}
</td>

<td className="p-4 font-semibold text-gray-800">
{r.title}
</td>

<td className="p-4 text-gray-600">
{r.client}
</td>

<td className="p-4 text-gray-600">
{r.employee}
</td>

<td className="p-4 font-semibold">
${(r.value/1000).toFixed(0)}K
</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm
${r.stage==="Submitted" && "bg-blue-100 text-blue-700"}
${r.stage==="Under Review" && "bg-yellow-100 text-yellow-700"}
${r.stage==="Won" && "bg-green-100 text-green-700"}
${r.stage==="Lost" && "bg-red-100 text-red-700"}
`}>

{r.stage}

</span>

</td>

<td className="p-4 text-gray-600">
{r.date}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

export default RFQTracking