import { sql } from '@/lib/db';

export const getCheckInfo = async (id : string) => {
  try {
    const result = await sql`SELECT check_number, checks.id_employee, empl_surname, empl_name, customer_card.card_number, customer_card.phone_number, cust_surname, cust_name, print_date, sum_total, vat
    FROM (checks INNER JOIN employee ON checks.id_employee = employee.id_employee) 
    LEFT JOIN customer_card ON customer_card.card_number=checks.card_number
    WHERE checks.check_number=${id}
    `;
    return result.map((row: any) => ({
      id: row.check_number,
      chId: row.id_employee,
      chName: row.empl_name,
      chSurname: row.empl_surname,
      custId: row.card_number,
      custName: row.cust_name,
      custSurname: row.cust_surname,
      custPhone: row.phone_number,
      date: new Date(row.print_date).toLocaleString(),
      sum: row.sum_total,
      vat: row.vat,


    }));
  } catch (error) {
    console.error('Error fetching check info:', error);
    throw new Error('Failed to fetch check info');
  }
};