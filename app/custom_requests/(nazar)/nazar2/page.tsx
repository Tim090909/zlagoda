import { req1Nazar } from '@/actions/(custom_requests)/req1_nazar'
import { req2Nazar } from '@/actions/(custom_requests)/req2_nazar';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const NazarRequests = async () => {
    const req2 = await req2Nazar();
  return (
    <div className='w-full h-screen flex justify-center mt-20'>
      <div className='max-w-[800px]'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Request 2 Nazar</h2>
          <p>Вивести інформацію про усі товари (навіть ті, яких нема в магазині) окрім тих, які не продаються.</p>
        </div>
        <DataTable columns={columns} data={req2}/>
      </div>
    </div>
  )
}

export default NazarRequests
