"use server"

import { getProducts } from "@/actions/get_products"
import AddForm from "./_components/form";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function CreatePage(){
  const session = await getServerSession(options);
    const role = session?.user?.role;

    if (role !== "manager") {
        redirect("/");
    }

    const products = await getProducts();
  return (
    <AddForm products={products} />
  )
}

