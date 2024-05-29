"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Product, columns } from "./_components/columns";

import {sql} from '@/lib/db';
export default async function Page() { 
    
  const result = await sql`SELECT id, title, amount, status, price FROM Products;`;

  const products_fdb: Product[] = result.map(row => ({
  id: row.id,
  title: row.title,
  amount: row.amount,
  status: row.status,
  price: row.price,
  }));


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <DataTable columns={columns} data={products_fdb} />
    </div>
  )
}