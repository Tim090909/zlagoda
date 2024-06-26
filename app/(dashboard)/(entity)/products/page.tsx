"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Product, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCategories } from '@/actions/get_categories';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Page() { 
  const session = await getServerSession(options);
  const role = session?.user.role || "";

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
      <h2 className='hidden print:block text-2xl font-semibold my-8'>Products report</h2>
      <div className='w-full my-4 flex justify-end print:hidden'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={products_fdb} categories={categories} role={role}/>
    </div>
  )
}