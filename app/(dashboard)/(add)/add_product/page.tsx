import { getCategories } from "@/actions/get_categories";
import AddProductForm from "./_components/form"
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function CreatePage(){
  const session = await getServerSession(options);
    const role = session?.user?.role;

    if (role !== "manager") {
        redirect("/");
    }
    const categories = await getCategories();
  return (
    <AddProductForm categories={categories} />
  )
}