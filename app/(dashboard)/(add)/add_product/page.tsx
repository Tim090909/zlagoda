import { getCategories } from "@/actions/get_categories";
import AddProductForm from "./_components/form"

export default async function CreatePage(){
    const categories = await getCategories();
  return (
    <AddProductForm categories={categories} />
  )
}