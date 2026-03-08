const RFQModal = ({client,close}) => {

return(

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96">

<h2 className="text-xl font-bold mb-2">
{client.client}
</h2>

<p className="text-gray-500 mb-4">
RFQ History
</p>

<ul className="space-y-2">

<li>RFQ-101 • Tender Submission</li>
<li>RFQ-102 • Price Negotiation</li>
<li>RFQ-103 • Project Award</li>

</ul>

<button onClick={close} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">

Close

</button>

</div>

</div>

)

}

export default RFQModal