import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

import { ArrowLeft, Star } from "lucide-react"

const EmployeePerformance = () => {

const chartData = [

{name:"Ahmed",achievement:98},
{name:"John",achievement:95},
{name:"Sarah",achievement:90},
{name:"Ravi",achievement:83},
{name:"Omar",achievement:78},
{name:"Fatima",achievement:73},
{name:"Priya",achievement:60}

]

const employees = [

{
rank:1,
name:"Ahmed Khan",
role:"Sales Director",
deals:24,
revenue:"$1.2M",
achievement:95,
rating:4.9
},

{
rank:2,
name:"John Peters",
role:"Regional Head",
deals:12,
revenue:"$1.5M",
achievement:92,
rating:4.8
},

{
rank:3,
name:"Sarah Ali",
role:"Business Dev",
deals:19,
revenue:"$980K",
achievement:88,
rating:4.7
},

{
rank:4,
name:"Ravi Menon",
role:"Account Manager",
deals:17,
revenue:"$850K",
achievement:82,
rating:4.5
},

{
rank:5,
name:"Omar Khalid",
role:"Tender Specialist",
deals:15,
revenue:"$720K",
achievement:78,
rating:4.3
},

{
rank:6,
name:"Fatima Hassan",
role:"Sales Executive",
deals:14,
revenue:"$650K",
achievement:74,
rating:4.2
},

{
rank:7,
name:"Priya Sharma",
role:"Marketing Lead",
deals:8,
revenue:"$320K",
achievement:60,
rating:4.0
}

]

return(

<div className="p-6 space-y-6">

{/* HEADER */}

<div className="flex items-start gap-3">

<ArrowLeft className="mt-1 text-gray-500"/>

<div>

<h1 className="text-2xl font-bold">
Employee Performance
</h1>

<p className="text-gray-500">
Revenue & performance metrics
</p>

</div>

</div>

{/* CHART */}

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="text-lg font-semibold mb-4">
Target Achievement (%)
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<XAxis dataKey="name" />
<YAxis />
<Tooltip />

<Bar
dataKey="achievement"
radius={[6,6,0,0]}
fill="#2f5d46"
/>

</BarChart>

</ResponsiveContainer>

</div>


{/* PERFORMANCE TABLE */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="min-w-full">

<thead className="border-b text-sm text-gray-500">

<tr>

<th className="p-4 text-left">RANK</th>
<th className="p-4 text-left">EMPLOYEE</th>
<th className="p-4 text-left">ROLE</th>
<th className="p-4 text-left">DEALS</th>
<th className="p-4 text-left">REVENUE</th>
<th className="p-4 text-left">ACHIEVEMENT</th>
<th className="p-4 text-left">RATING</th>

</tr>

</thead>

<tbody>

{employees.map((e)=>(
<tr key={e.rank} className="border-b hover:bg-gray-50">

<td className="p-4">

<div className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold
${e.rank===1 && "bg-green-800 text-white"}
${e.rank===2 && "bg-green-100 text-green-800"}
${e.rank>2 && "bg-gray-100 text-gray-600"}
`}>

{e.rank}

</div>

</td>

<td className="p-4 font-semibold">{e.name}</td>

<td className="p-4 text-gray-600">{e.role}</td>

<td className="p-4">{e.deals}</td>

<td className="p-4 font-semibold">{e.revenue}</td>

<td className="p-4">

<div className="flex items-center gap-3">

<div className="w-32 h-2 bg-gray-200 rounded">

<div
className="h-2 bg-green-800 rounded"
style={{width:`${e.achievement}%`}}
></div>

</div>

<span className="text-sm font-semibold">
{e.achievement}%
</span>

</div>

</td>

<td className="p-4 flex items-center gap-1 text-yellow-500">

<Star size={16} fill="orange"/>

<span className="font-semibold text-gray-700">
{e.rating}
</span>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default EmployeePerformance