import { sql } from '@/lib/db';

export const getCategories = async () => {
  try {
    const result = await sql`SELECT category_number, category_name FROM category;`;
    return result.map((row: any) => ({
      id: row.category_number,
      title: row.category_name
    }));
  } catch (error) {
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch categories');
  }
};