"use server"

import { getProducts } from "@/actions/get_products"
import AddForm from "./_components/form";

export default async function CreatePage(){
    const products = await getProducts();
  return (
    <AddForm products={products} />
  )
}
