import { sql } from '@/lib/db';

export const getLoginById = async (id: string) => {
  try {
    const result = await sql`SELECT login, pas_hash
    FROM passwords WHERE id_employee=${id};`;
    return result.map((row: any) => ({
        login: row.login,
        password: row.pas_hash,
    }));
  } catch (error) {
    console.error('Error fetching login by id:', error);
    throw new Error('Failed to fetch login by id');
  }
};