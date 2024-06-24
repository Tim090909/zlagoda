import { sql } from '@/lib/db';

export const getChecksByEmplId = async (id : string) => {
  try {
    const result = await sql`SELECT check_number, id_employee, card_number, print_date, sum_total, vat
    FROM checks
    WHERE id_employee=${id};
    `;
    return result.map((row: any) => ({
      id: row.check_number,
      empl_id: row.id_employee,
      cust_nam: row.card_number,
      cd: new Date(row.print_date),
      sum: row.sum_total,
      vat: row.vat,
    }));
  } catch (error) {
    console.error('Error fetching check by emplId:', error);
    throw new Error('Failed to fetch check by emplId');
  }
};