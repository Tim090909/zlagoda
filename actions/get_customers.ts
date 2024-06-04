import { sql } from '@/lib/db';

export const getCustomers = async () => {
  try {
    const result = await sql`SELECT card_number, cust_name, cust_surname, phone_number FROM Customer_card;`;
    return result.map((row: any) => ({
      id: row.card_number,
      name: row.cust_name,
      surname: row.cust_surname,
      phone: row.phone_number
    }));
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw new Error('Failed to fetch products');
  }
};