//"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Check, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Page() { 
  const session = await getServerSession(options);
  const role = session?.user.role || "";
    
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
      <h2 className='hidden print:block text-2xl font-semibold my-8'>Check report</h2>
      <div className='w-full my-4 flex justify-end print:hidden'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={checks_fdb} role={role}/>
    </div>
  )
}