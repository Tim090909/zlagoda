import { sql } from '@/lib/db';

export const req2Tymofii = async (id: number) => {
  try {
    const result = await sql
                `SELECT id_employee, empl_surname, empl_name
FROM Employee AS e
WHERE NOT EXISTS (SELECT *
                  FROM checks
                  WHERE id_employee = e.id_employee
                  AND NOT EXISTS (SELECT *
                                  FROM (store_product inner join sale ON sale.upc=store_product.upc) AS ss
                                  inner join product on product.id_product=ss.id_product
                                  where ss.check_number=checks.check_number
                                  AND product.category_number=${id}
                                  ))
AND EXISTS (SELECT * FROM checks where id_employee=e.id_employee)`;
    return result.map((row: any) => ({
      id: row.id_employee,
      name: row.empl_name,
      surname: row.empl_surname
    }));
  } catch (error) {
    console.error('Error Request 2 Tymofii:', error);
    throw new Error('Failed Request 2 Tymofii');
  }
};