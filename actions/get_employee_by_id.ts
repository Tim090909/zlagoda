import { sql } from '@/lib/db';

export const getEmployeeById = async (id: string) => {
  try {
    const result = await sql`SELECT id_employee, empl_surname, empl_name, empl_patronimic, empl_role, salary, date_of_birth, date_of_start, phone_number, city,street, zip_code
    FROM employee WHERE id_employee=${id};`;
    return result.map((row: any) => ({
        id: row.id_employee,
        name: row.empl_name,
        surname: row.empl_surname,
        patronimic: row.empl_patronimic,
        role: row.empl_role,
        salary: row.salary,
        dob: row.date_of_birth,
        dos: row.date_of_start,
        phone: row.phone_number,
        city: row.city,
        street: row.street,
        zip_code: row.zip_code,
    }));
  } catch (error) {
    console.error('Error fetching employee by id:', error);
    throw new Error('Failed to fetch employee by id');
  }
};