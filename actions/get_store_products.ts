import { sql } from '@/lib/db';

export const getStoreProducts = async () => {
  try {
    const result = await sql`SELECT upc, product_name, characteristics, selling_price, products_number FROM Store_product INNER JOIN Product ON Store_product.id_product = Product.id_product
WHERE NOT products_number=0;`;
    return result.map((row: any) => ({
      upc: row.upc,
      title: row.product_name,
      sellingPrice: parseFloat(row.selling_price),
      productsNumber: parseInt(row.products_number),
      characteristics: row.characteristics
    }));
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw new Error('Failed to fetch products');
  }
};