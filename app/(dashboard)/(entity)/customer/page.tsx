"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Customer, columns } from "./_components/columns";

import {sql} from '@/lib/db';
export default async function Page() { 
    
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
    <div className='p-6 w-full mx-2 lg:mx-8'>
      <DataTable columns={columns} data={customer_fdb} />
    </div>
  )
}