//"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { Check, columns } from "./_components/columns";

import {sql} from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getChecksByEmplId } from '@/actions/get_checks_by_emplId';

export default async function Page({params} : {params: { employeeId: string}}) { 
  const session = await getServerSession(options);
  const role = session?.user.role || "";
    
  const checks = await getChecksByEmplId(params.employeeId);


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <h2 className='hidden print:block text-2xl font-semibold my-8'>Check report</h2>
      <div className='w-full my-4 flex justify-end print:hidden'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/employee">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={checks} role={role}/>
    </div>
  )
}