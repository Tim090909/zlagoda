import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UseFormSetValue } from 'react-hook-form';
import { StoreProduct } from '../app/(dashboard)/(add)/add_check/_components/columns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleAddProduct = (
  product: StoreProduct,
  selectedProducts: { upc: string, amount: number }[],
  setSelectedProducts: (products: { upc: string, amount: number }[]) => void,
  setValue: UseFormSetValue<any> // Replace `any` with the appropriate form schema type
) => {
  const updatedProducts = [...selectedProducts, { upc: product.upc, amount: 1 }];
  setSelectedProducts(updatedProducts);
  setValue("products", updatedProducts);
};