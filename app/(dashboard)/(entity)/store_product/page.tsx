"use server";
import React from 'react'
import { DataTable } from './_components/data-table'
import { StoreProduct, columns } from "./_components/columns";

import {sql} from '@/lib/db';
export default async function Page() { 
    
  const result = await sql`SELECT upc, upc_prom, product.id_product, product_name, selling_price, products_number, promotional_product 
  FROM store_product INNER JOIN product on Product.id_product=Store_product.id_product;`;
  //console.log(result);

  const products_fdb: StoreProduct[] = result.map(row => ({
    id: row.id_product,
    title: row.product_name,
    upc: row.upc,
    upcProm: row.upc_prom,
    sellingPrice: row.selling_price,
    productsNumber: row.products_number,
    promotionalProduct: row.promotional_product
  }));


  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <DataTable columns={columns} data={products_fdb} />
    </div>
  )
}