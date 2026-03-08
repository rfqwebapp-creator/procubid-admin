import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

const data = [

{name:"Jan",revenue:400000},
{name:"Feb",revenue:600000},
{name:"Mar",revenue:900000},
{name:"Apr",revenue:1200000},
{name:"May",revenue:800000}

]

const ClientRevenueChart = () => {

return(

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">
Client Revenue Trend
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Bar dataKey="revenue"/>

</BarChart>

</ResponsiveContainer>

</div>

)

}

export default ClientRevenueChart