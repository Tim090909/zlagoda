import { req2Andrii } from '@/actions/(custom_requests)/req2_andrii';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { req1Andrii } from '@/actions/(custom_requests)/req1_andrii';

const AndriiRequests = async ({ params }: { params: { custId: string } }) => {
    const req2 = await req1Andrii();
  return (
    <div className='w-full h-screen flex justify-center mt-20'>
      <div className='max-w-[800px]'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Request 1 Andrii</h2>
          <p>Для кожного клієнта, знайти загальну кількість продуктів, що вони придбали </p>
        </div>
        <DataTable columns={columns} data={req2}/>
      </div>
    </div>
  )
}

export default AndriiRequests

