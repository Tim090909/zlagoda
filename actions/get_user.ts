import { sql } from '@/lib/db';

export const getUserPass = async (username: string) => {
  try {
    const result = await sql
                    `SELECT Passwords.id_employee, login, pas_hash, empl_role 
                        FROM Passwords 
                        LEFT JOIN Employee ON Passwords.id_employee = Employee.id_employee 
                        WHERE login = ${username};`;
    return result.map((row: any) => ({
      emplId: row.id_employee,
      username: row.login,
      password: row.pas_hash,
      emplRole: row.empl_role
    }));
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw new Error('Failed to fetch products');
  }
};