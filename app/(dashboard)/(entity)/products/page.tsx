"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Product, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCategories } from '@/actions/get_categories';
export default async function Page() { 
    
  const result = await sql`SELECT id_product, product_name, category_name, characteristics 
  FROM product inner join category on Product.category_number=Category.category_number;`;

  const products_fdb: Product[] = result.map(row => ({
    id: row.id_product,
    title: row.product_name,
    category: row.category_name,
    characteristics: row.characteristics
  }));

  const categories = await getCategories();


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <div className='w-full my-4 flex justify-end'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={products_fdb} categories={categories}/>
    </div>
  )
}