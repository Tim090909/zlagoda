import { sql } from '@/lib/db';

export const req1Nazar = async (id: string) => {
  try {
    const result = await sql
                `SELECT Employee.id_employee, Employee.empl_surname, Employee.empl_name, Employee.empl_role, 
                Sum(Checks.vat) AS total_taxes, Count(UPC) AS total_prod
                FROM Employee LEFT JOIN (Checks LEFT JOIN Sale ON Checks.check_number = Sale.check_number) 
                ON Employee.id_employee = Checks.id_employee 
                Where Employee.id_employee=${id}
                GROUP BY Employee.id_employee, Employee.empl_surname, Employee.empl_name, Employee.empl_role`;
    return result.map((row: any) => ({
      emplId: row.id_employee,
      emplName: row.empl_name,
      emplSurname: row.empl_surname,
      emplRole: row.empl_role,
      totalTaxes: row.total_taxes,
      totalProducts: row.total_prod
    }));
  } catch (error) {
    console.error('Error Request 1 Nazar:', error);
    throw new Error('Failed Request 1 Nazar');
  }
};