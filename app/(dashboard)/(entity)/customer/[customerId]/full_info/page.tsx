import { getCustomerById } from '@/actions/get_customer_by_id';
import React from 'react'

const CustomerIdPage = async ({params} : {params: {customerId: string}}) => {
  const customer = await getCustomerById(params.customerId);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-zinc-950 text-slate-200'>
        <div className='w-96 h-96 border-2 rounded-xl p-8 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Customer {customer[0].id}</h2>
            <h2  className='font-semibold'>{customer[0].name + " " + customer[0].surname + " " + customer[0].patronimic}</h2>
            <p>Phone: {customer[0].phone}</p>
            <p>Percent: {customer[0].percent}%</p>
            <p>Address: {customer[0].city + ", St. " + customer[0].street + ", Zip " + customer[0].zip_code}</p>
        </div>
      
    </div>
  )
}

export default CustomerIdPage
