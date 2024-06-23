import React from 'react'
import { getEmployeeById } from '@/actions/get_employee_by_id';

const EmployeeIdPage = async ({params} : {params: {employeeId: string}}) => {
  const employee = await getEmployeeById(params.employeeId);
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };
  
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-zinc-950 text-slate-200'>
        <div className='w-96 h-96 border-2 rounded-xl px-8 py-6 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Employee {employee[0].id} </h2>
            <h2 className='font-semibold'>{employee[0].name + " " + employee[0].surname + " " + employee[0].patronimic}</h2>
            <p>Date of Birth: {formatDate(new Date(employee[0].dob))}</p>
            <p>Phone: {employee[0].phone}</p>
            <p>Address: {employee[0].city + ", St. " + employee[0].street + ", Zip " + employee[0].zip_code}</p>
            <p>Date of Start: {formatDate(new Date(employee[0].dos))}</p>
            <p>Role: {employee[0].role}</p>
            <p>Salary: ${employee[0].salary}</p>
        </div>
    </div>
  )
}

export default EmployeeIdPage
