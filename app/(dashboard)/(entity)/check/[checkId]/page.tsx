import React from 'react'
import { DataTable } from './_components/data-table'

import { getProductsInCheck } from '@/actions/get_products_in_check'
import { useRouter } from 'next/navigation'
import { CheckProduct, columns } from './_components/columns'
import { getCheckInfo } from '@/actions/get_check_info'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CheckIdPage = async ({params} : {params: {checkId: string}}) => {
  const checkProducts = await getProductsInCheck(params.checkId);
  const checkInfo = await getCheckInfo(params.checkId);
  
  return (
    <div className='p-8 w-full lg:w-[1024px]'>
      <div className='w-full my-4 flex justify-end'>
        <Button className='bg-slate-700 text-slate-200 ml-auto'><Link href="/check">Back</Link></Button>
      </div>
      <div className="w-full h-52 flex flex-col gap-8 border-2 rounded-xl p-4">
        <div className='flex flex-col gap-4'>
        <h1 className="text-2xl font-semibold">
            Info about check {checkInfo[0].id}
        </h1>
        <p><span className='font-semibold'>Cashier:</span> {checkInfo[0].chSurname} {checkInfo[0].chName} &#10222;{checkInfo[0].chId}&#10223;</p> 
        <p><span className='font-semibold'>Customer:</span> {checkInfo[0].custId ? checkInfo[0].custSurname + " " + checkInfo[0].custName + " " + checkInfo[0].custPhone + " (" + checkInfo[0].custId + ")" : "No registered"} </p>
        </div>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl font-semibold'>Total: {checkInfo[0].sum}</h2>
          <p>VAT: {checkInfo[0].vat}</p>
          <p>Printed on: {checkInfo[0].date}</p>
        </div>
      </div>
      <div className='w-full'>
        <DataTable columns={columns} data={checkProducts}/>
      </div>
      
    </div>
  )
}

export default CheckIdPage
