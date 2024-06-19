import { sql } from '@/lib/db';

export const getProductById = async (id: number) => {
  try {
    const result = await sql`SELECT id_product, product_name, category_number, characteristics FROM product WHERE id_product=${id};`;
    return result.map((row: any) => ({
        id: row.id_product,
        title: row.product_name,
        categoryId: row.category_number,
        characteristics: row.characteristics
    }));
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw new Error('Failed to fetch product by id');
  }
};