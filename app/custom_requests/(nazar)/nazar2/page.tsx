import { req1Nazar } from '@/actions/(custom_requests)/req1_nazar'
import React from 'react'

const NazarRequests = async () => {
    const req1 = await req1Nazar("4qHl4PMiVT");
  return (
    <div>
      <div>
        <h2>Request 1</h2>
        <p>Kількість проданих товарів та загальну суму податків сплачених в наслідок продажів. </p>
        <p>Employee: {req1[0].emplId + " " + req1[0].emplName + " " + req1[0].emplSurname}</p>
        <p>Employee role: {req1[0].emplRole}</p>
        <p>Total taxes: {req1[0].totalTaxes}</p>
        <p>Total products: {req1[0].totalProducts}</p>
      </div>
    </div>
  )
}

export default NazarRequests
