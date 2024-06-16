"use server"

import { getStoreProducts } from "@/actions/get_store_products"
import { DataTable } from "./_components/data-table";
//import AddForm, { StoreProduct } from "./_components/form";
import { getCustomers } from "@/actions/get_customers";



export default async function CreatePage(){/*
    const products = await getStoreProducts();
    const products_fdb: StoreProduct[] = products.map(product => ({
      upc: product.upc,
      title: product.title,
      characteristics: product.characteristics,
      sellingPrice: product.sellingPrice,
      productsNumber: product.productsNumber,
    }));
    //console.log(products_fdb);
    const customers = await getCustomers();

    return (
      <div className='p-6 w-full 2xl:w-[1536px] mx-auto flex flex-row'>
        <AddForm customers={customers} products={products}/>
      </div>
    )*/
}
