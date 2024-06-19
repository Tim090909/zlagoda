import { sql } from '@/lib/db';

export const req2Nazar = async () => {
  try {
    const result = await sql
                `SELECT Product.*
FROM Product
WHERE Product.id_product NOT IN (
    SELECT DISTINCT Store_Product.id_product
    FROM Store_Product
    WHERE Store_Product.id_product NOT IN ( 
        SELECT Store_Product.id_product
        FROM Store_Product
        WHERE Store_Product.UPC IN(
            SELECT Sale.UPC
            FROM Sale)));`;
    return result.map((row: any) => ({
      id: row.id_product,
      title: row.product_name,
      characteristics: row.characteristics
    }));
  } catch (error) {
    console.error('Error Request 1 Nazar:', error);
    throw new Error('Failed Request 1 Nazar');
  }
};