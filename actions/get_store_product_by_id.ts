import { sql } from '@/lib/db';

export const getStoreProductById = async (id: string) => {
  try {
    console.log(id)
    const result = await sql`SELECT upc, id_product, selling_price, products_number, promotional_product FROM Store_product WHERE upc=${id};`;
    return result.map((row: any) => ({
      upc: row.upc,
      price: parseFloat(row.selling_price),
      amount: parseInt(row.products_number),
      productId: row.id_product,
      promotional: row.promotional_product
    }));
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw new Error('Failed to fetch products');
  }
};