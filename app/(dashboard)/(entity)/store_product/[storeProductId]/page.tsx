import React from 'react'
import ProductForm from './form';
import { getCategories } from '@/actions/get_categories';
import { getStoreProductById } from '@/actions/get_store_product_by_id';
import { getProducts } from '@/actions/get_products';

const EditStoreProductPage = async ({params} : {params: { storeProductId: string}}) => {
  const storeProduct = await getStoreProductById(params.storeProductId);
  const products = await getProducts();
  return (
    <ProductForm products={products} storeProduct={storeProduct[0]}/>
  )
}

export default EditStoreProductPage

