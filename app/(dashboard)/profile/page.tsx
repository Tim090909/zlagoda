import { getEmployeeById } from '@/actions/get_employee_by_id';
import { getLoginById } from '@/actions/grt_login_by_id';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import React from 'react'

const ProfilePage = async () => {
  const session = await getServerSession(options);
  const id = session?.user.id;
  let employee = null;
  let login = null;
  if(id){
    employee = await getEmployeeById(id);
    login = await getLoginById(id);
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-zinc-950 text-slate-200'>
      {employee && login ? (
        <div className='w-full lg:w-[1024px] h-96 border-2 rounded-xl p-8 flex flex-col lg:flex-row lg:justify-between'>
          <div className='flex flex-col gap-4 w-1/2'>
            <h2 className='text-xl font-semibold'>Hello {employee[0].name + " " + employee[0].surname + " " + employee[0].patronimic}</h2>
            <p>Date of Birth: {formatDate(new Date(employee[0].dob))}</p>
            <p>Phone: {employee[0].phone}</p>
            <p>Address: {employee[0].city + ", St. " + employee[0].street + ", Zip " + employee[0].zip_code}</p>
            <p>Login: {login[0].login}</p>
            <p>Date of Start: {formatDate(new Date(employee[0].dos))}</p>
            <p>Role: {employee[0].role}</p>
            <p>Salary: ${employee[0].salary}</p>
          </div>
          <div className='flex flex-col gap-y-8 w-48'>
            <Button className='py-4 px-8 bg-slate-500'>Change login</Button>
            <Button className='py-4 px-8 bg-slate-500'>Change password</Button>
          </div>
        </div>
      ) : (
        <>Something went wrong!</>
      )}
      
    </div>
  )
}

export default ProfilePage
