"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Check, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function Page() { 
    
  const result = await sql`SELECT check_number, id_employee, card_number, print_date, sum_total, vat
  FROM checks;`;
  //console.log(result);

  const checks_fdb: Check[] = result.map(row => ({
    id: row.check_number,
    empl_id: row.id_employee,
    cust_nam: row.card_number,
    cd: row.print_date,
    sum: row.sum_total,
    vat: row.vat
  }));


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <div className='w-full my-4 flex justify-end'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={checks_fdb} />
    </div>
  )
}