"use server";
import React, { useState, useEffect } from 'react';
import { DataTable } from './_components/data-table'
import { StoreProduct, columns } from "./_components/columns";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getAllStoreProducts } from '@/actions/get_all_store_products';
import { getPromotionalStoreProducts } from '@/actions/get_promotional_store_products';
import { getNotPromotionalStoreProducts } from '@/actions/get_not_promotional_store_products';
import Filters from './_components/filters';

export default async function Page() { 
  const session = await getServerSession(options);
  const role = session?.user.role || "";

  const products = await getAllStoreProducts();
  const promProducts = await getPromotionalStoreProducts();
  const notPromProducts = await getNotPromotionalStoreProducts();

  return (
    <Filters role={role} allProd={products} promProd={promProducts} notPromProd={notPromProducts}/>
  )
}