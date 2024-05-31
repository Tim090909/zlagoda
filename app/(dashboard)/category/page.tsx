"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Category, columns } from "./_components/columns";

import {sql} from '@/lib/db';
export default async function Page() { 
    
  const result = await sql`SELECT category_number, category_name FROM category;`;

  const categories_fdb: Category[] = result.map(row => ({
    id: row.category_number,
    title: row.category_name,
  }));


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <DataTable columns={columns} data={categories_fdb} />
    </div>
  )
}