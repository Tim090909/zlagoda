import { req1Tymofii } from '@/actions/(custom_requests)/req1_tymofii'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const TymofiiRequests = async () => {
  const req1 = await req1Tymofii();

  return (
    <div className='w-full h-screen flex justify-center mt-20'>
      
      <div className='max-w-[800px]'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>Request 1 Tymofii</h2>
          <p>Порахувати скільки кожен Seller продав кожного товару, якого він продавав(тобто не виводити товари які продавець не продавав).</p>
        </div>
        <DataTable columns={columns} data={req1}/>
      </div>
    </div>
  )
}

export default TymofiiRequests
