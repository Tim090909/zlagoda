import { sql } from '@/lib/db';

export const getCustomerById = async (id: string) => {
  try {
    const result = await sql`SELECT card_number, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip_code, percent
  FROM Customer_Card WHERE card_number=${id};`;
    return result.map((row: any) => ({
        id: row.card_number,
        name: row.cust_name,
        surname: row.cust_surname,
        patronimic: row.cust_patronymic,
        percent: row.percent,
        phone: row.phone_number,
        city: row.city,
        street: row.street,
        zip_code: row.zip_code
    }));
  } catch (error) {
    console.error('Error fetching customers by id:', error);
    throw new Error('Failed to fetch customers by id');
  }
};