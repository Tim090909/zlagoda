import { req2Andrii } from '@/actions/(custom_requests)/req2_andrii';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const AndriiRequests = async ({ params }: { params: { custId: string } }) => {
    const req2 = await req2Andrii(params.custId);
  return (
    <div className='w-full h-screen flex justify-center mt-20'>
      <div className='max-w-[800px]'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Request 2 Andrii</h2>
          <p>Знайти усіх клієнтів, що купували тільки ті продукти, що купував умовний Петренко. </p>
        </div>
        <DataTable columns={columns} data={req2}/>
      </div>
    </div>
  )
}

export default AndriiRequests
