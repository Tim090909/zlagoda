import { req2Tymofii } from '@/actions/(custom_requests)/req2_tymofii';
import React from 'react'
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const TymofiiRequests = async ({ params }: { params: { catId: number } }) => {
    const req2 = await req2Tymofii(params.catId);
  return (
    <div className='w-full h-screen flex justify-center mt-20'>
      <div className='max-w-[800px]'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Request 2 Tymofii</h2>
          <p>Знайти продавців, у кожній продажі(чеку) яких є товари з обраної категорії.</p>
        </div>
        <DataTable columns={columns} data={req2}/>
      </div>
    </div>
  )
}

export default TymofiiRequests
