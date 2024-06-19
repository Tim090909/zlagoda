import { req1Nazar } from '@/actions/(custom_requests)/req1_nazar'
import React from 'react'

const NazarRequests = async ({ params }: { params: { emplId: string } }) => {
    const req1 = await req1Nazar(params.emplId);
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div>
        <h2 className='text-xl'>Request 1</h2>
        <p>Kількість проданих товарів та загальну суму податків сплачених в наслідок продажів. </p>
        <p>Employee: {req1[0].emplId + " " + req1[0].emplName + " " + req1[0].emplSurname}</p>
        <p>Employee role: {req1[0].emplRole}</p>
        <p>Total taxes: {req1[0].totalTaxes ? req1[0].totalTaxes : 0}</p>
        <p>Total products: {req1[0].totalProducts}</p>
      </div>
    </div>
  )
}

export default NazarRequests
