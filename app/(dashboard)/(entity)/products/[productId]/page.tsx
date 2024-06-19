import React from 'react'
import { getProductById } from '@/actions/get_product_by_id';
import ProductForm from './form';
import { getCategories } from '@/actions/get_categories';

const EditProductPage = async ({params} : {params: { productId: number}}) => {
  const product = await getProductById(params.productId);
  const categories = await getCategories();
  return (
    <ProductForm product={product[0]} categories={categories}/>
  )
}

export default EditProductPage
