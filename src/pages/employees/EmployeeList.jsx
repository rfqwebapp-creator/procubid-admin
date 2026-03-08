import { useState } from "react"
import { Search, Plus, ArrowLeft, Pencil, Trash2, Download } from "lucide-react"
import * as XLSX from "xlsx"

const EmployeeList = () => {

const [search,setSearch] = useState("")
const [employees,setEmployees] = useState([
{ id:"EMP001", name:"Procubid", role:"Sales Director", department:"Sales", commission:24500, status:"Active", joined:"2022-03-15"},
{ id:"EMP002", name:"Abijith Anil", role:"Business Development", department:"BD", commission:18200, status:"Active", joined:"2022-06-01"},
{ id:"EMP003", name:"Sarath", role:"Account Manager", department:"Sales", commission:15800, status:"Active", joined:"2021-11-20"},
{ id:"EMP004", name:"Anumol", role:"Sales Executive", department:"Sales", commission:12400, status:"Active", joined:"2023-01-10"},
{ id:"EMP005", name:"Neethu", role:"Regional Head", department:"Management", commission:32100, status:"Active", joined:"2020-08-05"},
{ id:"EMP006", name:"Niba", role:"Marketing Lead", department:"Marketing", commission:9600, status:"On Leave", joined:"2022-09-12"}
])

const [showModal,setShowModal] = useState(false)
const [edit,setEdit] = useState(null)
const [sort,setSort] = useState("none")

const [page,setPage] = useState(1)
const perPage = 4

const [form,setForm] = useState({
id:"",
name:"",
role:"",
department:"",
commission:"",
status:"Active",
joined:""
})

/* SEARCH */

let filtered = employees.filter(e =>
e.name.toLowerCase().includes(search.toLowerCase())
)

/* SORT */

if(sort==="high"){
filtered.sort((a,b)=>b.commission-a.commission)
}

if(sort==="low"){
filtered.sort((a,b)=>a.commission-b.commission)
}

/* PAGINATION */

const totalPages = Math.ceil(filtered.length/perPage)

const start = (page-1)*perPage
const paginated = filtered.slice(start,start+perPage)

/* ADD / EDIT SUBMIT */

const handleSubmit = ()=>{

if(edit){

setEmployees(employees.map(e =>
e.id===edit.id ? {...form, commission:Number(form.commission)} : e
))

}else{

setEmployees([...employees,{...form, commission:Number(form.commission)}])

}

setShowModal(false)
setEdit(null)

setForm({
id:"",
name:"",
role:"",
department:"",
commission:"",
status:"Active",
joined:""
})

}

/* EDIT */

const handleEdit = (emp)=>{
setEdit(emp)
setForm(emp)
setShowModal(true)
}

/* DELETE */

const handleDelete = (id)=>{
setEmployees(employees.filter(e=>e.id!==id))
}

/* EXPORT */

const exportExcel = ()=>{

const ws = XLSX.utils.json_to_sheet(employees)
const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Employees")

XLSX.writeFile(wb,"employees.xlsx")

}

return(

<div className="p-6 space-y-6">

{/* HEADER */}

<div className="flex justify-between">

<div className="flex gap-3">

<ArrowLeft className="text-gray-500 mt-1"/>

<div>

<h1 className="text-2xl font-bold">Employee List</h1>

<p className="text-gray-500">
View all employees and commission data
</p>

</div>

</div>

<div className="flex gap-3">

<button
onClick={exportExcel}
className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
>

<Download size={16}/>
Export

</button>

<button
onClick={()=>setShowModal(true)}
className="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg"
>

<Plus size={18}/>
Add Employee

</button>

</div>

</div>


{/* SEARCH + SORT */}

<div className="flex gap-4">

<div className="relative max-w-md">

<Search className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type="text"
placeholder="Search employees..."
className="pl-10 pr-4 py-2 border rounded-lg"
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<select
className="border px-4 py-2 rounded-lg"
onChange={(e)=>setSort(e.target.value)}
>

<option value="none">Sort Commission</option>
<option value="high">High → Low</option>
<option value="low">Low → High</option>

</select>

</div>


{/* TABLE */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="min-w-full">

<thead className="border-b text-sm text-gray-500">

<tr>

<th className="p-4">ID</th>
<th className="p-4">NAME</th>
<th className="p-4">ROLE</th>
<th className="p-4">DEPARTMENT</th>
<th className="p-4">COMMISSION</th>
<th className="p-4">STATUS</th>
<th className="p-4">JOINED</th>
<th className="p-4">ACTION</th>

</tr>

</thead>

<tbody>

{paginated.map(emp=>(

<tr key={emp.id} className="border-b hover:bg-gray-50">

<td className="p-4">{emp.id}</td>

<td className="p-4 font-semibold">{emp.name}</td>

<td className="p-4">{emp.role}</td>

<td className="p-4">{emp.department}</td>

<td className="p-4 font-semibold">
${emp.commission.toLocaleString()}
</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm
${emp.status==="Active" && "bg-green-100 text-green-700"}
${emp.status==="On Leave" && "bg-yellow-100 text-yellow-700"}
`}>

{emp.status}

</span>

</td>

<td className="p-4">{emp.joined}</td>

<td className="p-4 flex gap-3">

<button
onClick={()=>handleEdit(emp)}
className="text-blue-600"
>

<Pencil size={16}/>

</button>

<button
onClick={()=>handleDelete(emp.id)}
className="text-red-600"
>

<Trash2 size={16}/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* PAGINATION */}

<div className="flex gap-2">

{Array.from({length:totalPages},(_,i)=>(

<button
key={i}
onClick={()=>setPage(i+1)}
className={`px-3 py-1 rounded
${page===i+1 ? "bg-green-800 text-white":"bg-gray-200"}
`}
>

{i+1}

</button>

))}

</div>


{/* MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/30 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96 space-y-4">

<h2 className="text-xl font-bold">

{edit ? "Edit Employee":"Add Employee"}

</h2>

<input placeholder="ID"
className="border p-2 w-full"
value={form.id}
onChange={e=>setForm({...form,id:e.target.value})}
/>

<input placeholder="Name"
className="border p-2 w-full"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
/>

<input placeholder="Role"
className="border p-2 w-full"
value={form.role}
onChange={e=>setForm({...form,role:e.target.value})}
/>

<input placeholder="Department"
className="border p-2 w-full"
value={form.department}
onChange={e=>setForm({...form,department:e.target.value})}
/>

<input placeholder="Commission"
className="border p-2 w-full"
value={form.commission}
onChange={e=>setForm({...form,commission:e.target.value})}
/>

<input type="date"
className="border p-2 w-full"
value={form.joined}
onChange={e=>setForm({...form,joined:e.target.value})}
/>

<div className="flex gap-3 justify-end">

<button
onClick={()=>setShowModal(false)}
className="px-4 py-2 bg-gray-300 rounded"
>

Cancel

</button>

<button
onClick={handleSubmit}
className="px-4 py-2 bg-green-800 text-white rounded"
>

Save

</button>

</div>

</div>

</div>

)}

</div>

)

}

export default EmployeeList