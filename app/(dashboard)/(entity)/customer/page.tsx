//"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Customer, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Page() { 
  const session = await getServerSession(options);
  const role = session?.user.role || "";
    
  const result = await sql`SELECT card_number, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip_code, percent
  FROM Customer_Card;`;

  const customer_fdb: Customer[] = result.map(row => ({
    id: row.card_number,
    name: row.cust_name,
    surname: row.cust_surname,
    patronimic: row.cust_patronymic,
    percent: row.percent,
    phone: row.phone_number,
    city: row.city,
    street: row.street,
    zip_code: row.zip_code
  }));


  return (
    <div className='p-6 w-full xl:w-[1280px] mx-auto '>
      <h2 className='hidden print:block text-2xl font-semibold my-8'>Customers report</h2>
      <div className='w-full my-4 flex justify-end print:hidden'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={customer_fdb} role={role}/>
    </div>
  )
}