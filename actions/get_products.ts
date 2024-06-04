import { sql } from '@/lib/db';

export const getProducts = async () => {
  try {
    const result = await sql`SELECT id_product, product_name FROM Product`;
    return result.map((row: any) => ({
      id: row.id_product,
      title: row.product_name
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};