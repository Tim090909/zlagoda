"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from './data-table'
import { StoreProduct, columns } from "./columns";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FiltersProps {
    role: string;
    allProd: StoreProduct[]
    promProd: StoreProduct[]
    notPromProd: StoreProduct[]
  }  

export default function Filters({role, allProd, promProd, notPromProd}: FiltersProps) { 
    const [tableData, setTableData] = useState<StoreProduct[]>([]);
    const [activeTable, setActiveTable] = useState<'all' | 'prom' | 'notProm'>('all');

  useEffect(() => {
    setTableData(allProd);
    setActiveTable('all');
  }, [allProd]);

  const handleShowAllProducts = () => {
    setTableData(allProd);
    setActiveTable('all');
  };

  const handleShowPromProducts = () => {
    setTableData(promProd);
    setActiveTable('prom');
  };

  const handleShowNotPromProducts = () => {
    setTableData(notPromProd);
    setActiveTable('notProm');
  };

  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <h2 className='hidden print:block text-2xl font-semibold my-8'>Store products report</h2>
      <div className='w-full my-4 flex justify-between print:hidden'>
        <Button className={`bg-slate-700 text-slate-200 ${activeTable === 'all' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleShowAllProducts} disabled={activeTable === 'all'}>All Products</Button>
        <Button className={`bg-slate-700 text-slate-200 ${activeTable === 'prom' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleShowPromProducts} disabled={activeTable === 'prom'}>Promotional Products</Button>
        <Button className={`bg-slate-700 text-slate-200 ${activeTable === 'notProm' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleShowNotPromProducts} disabled={activeTable === 'notProm'}>Not Promotional Products</Button>
        <Button className='bg-slate-400'><Link href='/'>Back</Link></Button>
      </div>
      <DataTable columns={columns} data={tableData} role={role} />
    </div>
  );
  }