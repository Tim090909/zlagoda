import { sql } from '@/lib/db';

export const getCategoryById = async (id: number) => {
  try {
    const result = await sql`SELECT category_number, category_name FROM category WHERE category_number=${id};`;
    return result.map((row: any) => ({
      id: row.category_number,
      title: row.category_name
    }));
  } catch (error) {
    console.error('Error fetching category bu id:', error);
    throw new Error('Failed to fetch categories');
  }
};