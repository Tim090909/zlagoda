import { sql } from '@/lib/db';

export const req2Andrii = async (id: string) => {
  try {
    const result = await sql
                `SELECT card_number, cust_surname , cust_name
                FROM customer_card AS cc
                WHERE NOT EXISTS (SELECT UPC
                FROM sale AS s INNER JOIN checks AS c ON c.check_number=s.check_number
                                                    WHERE card_number = cc.card_number
                                                    AND UPC NOT IN (SELECT UPC
                FROM sale AS s2 INNER JOIN checks AS c2 ON c2.check_number=s2.check_number
                WHERE card_number =
                (SELECT card_number
                FROM customer_card
                WHERE card_number=${id})))
                AND EXISTS (SELECT *
                FROM checks
                WHERE card_number=cc.card_number);`;
    return result.map((row: any) => ({
      id: row.card_number,
      name: row.cust_name,
      surname: row.cust_surname,
    }));
  } catch (error) {
    console.error('Error Request 2 Andrii:', error);
    throw new Error('Failed Request 2 Andrii');
  }
};