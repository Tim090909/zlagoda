import { sql } from '@/lib/db';

export const req1Andrii = async () => {
  try {
    const result = await sql
                `SELECT cc.card_number, cust_name, cust_surname, COALESCE(SUM(s.product_number),0) AS products_bought
FROM (customer_card AS cc LEFT JOIN checks AS c ON cc.card_number = c.card_number) LEFT JOIN Sale AS s ON s.check_number = c.check_number
GROUP BY cc.card_number, cust_name;`;
    return result.map((row: any) => ({
      id: row.card_number,
      name: row.cust_name,
      surname: row.cust_surname,
      prodNumber: row.products_bought
    }));
  } catch (error) {
    console.error('Error Request 1 Andrii:', error);
    throw new Error('Failed Request 1 Andrii');
  }
};