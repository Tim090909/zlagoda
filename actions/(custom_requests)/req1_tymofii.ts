import { sql } from '@/lib/db';

export const req1Tymofii = async () => {
  try {
    const result = await sql
                `SELECT employee.id_employee, 
       empl_surname || ' ' || empl_name AS empl, 
       product.id_product, 
       product_name, 
       COALESCE(SUM(product_number), 0) AS sold_number
FROM employee 
LEFT JOIN checks ON employee.id_employee = checks.id_employee 
LEFT JOIN Sale ON checks.check_number = Sale.check_number 
LEFT JOIN Store_Product ON Sale.UPC = Store_Product.UPC 
LEFT JOIN Product ON Store_Product.id_product = Product.id_product
WHERE empl_role = 'cashier'
GROUP BY employee.id_employee, empl_surname, empl_name, product.id_product, product_name;
`;
    return result.map((row: any) => ({
      emplId: row.id_employee,
      empl: row.empl,
      prodId: row.id_product,
      prodName: row.product_name,
      soldNumber: row.sold_number
    }));
  } catch (error) {
    console.error('Error Request 1 Tymofii:', error);
    throw new Error('Failed Request 1 Tymofii');
  }
};