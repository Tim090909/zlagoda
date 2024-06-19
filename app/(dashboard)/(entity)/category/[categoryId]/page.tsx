import React from 'react'
import CategoryForm from './form'
import { getCategoryById } from '@/actions/get_category_by_id';

const EditCategoryPage = async ({params} : {params: { categoryId: number}}) => {
  const category = await getCategoryById(params.categoryId);
  //const catTirle = category[0].title;
  return (
    <CategoryForm category={category[0]}/>
  )
}

export default EditCategoryPage
