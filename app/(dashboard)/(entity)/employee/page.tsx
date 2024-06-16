"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Employee, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page() { 
    
  const result = await sql`SELECT Employee.id_employee, empl_surname, empl_name, empl_patronimic, empl_role, salary, date_of_birth, date_of_start, phone_number, city,street, zip_code, login
  FROM employee LEFT JOIN Passwords on Employee.id_employee=Passwords.id_employee;`;

  const employee_fdb: Employee[] = result.map(row => ({
    id: row.id_employee,
    name: row.empl_name,
    surname: row.empl_surname,
    patronimic: row.empl_patronimic,
    role: row.empl_role,
    salary: row.salary,
    dob: row.date_of_birth,
    dos: row.date_of_start,
    phone: row.phone_number,
    city: row.city,
    street: row.street,
    zip_code: row.zip_code,
    login: row.login
  }));


  return (
    <div className='p-6 w-full mx-2 lg:mx-8'>
      <div className='w-full my-4 flex justify-end'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={employee_fdb} />
    </div>
  )
}