import { CheckProduct } from '@/app/(dashboard)/(entity)/check/[checkId]/_components/columns';
import { sql } from '@/lib/db';

export const getProductsInCheck = async (id : string) => {
  try {
    const result = await sql`SELECT product.id_product, product.product_name, sale.product_number, sale.selling_price
    FROM (sale INNER JOIN store_product on store_product.upc = sale.upc)
    INNER JOIN product ON store_product.id_product = product.id_product
    WHERE sale.check_number=${id}`;
    const prodInCheck: CheckProduct[] = result.map((row: any) => ({
      upc: row.id_product,
      title: row.product_name,
      amount: row.product_number,
      price: row.selling_price
    }));
    return prodInCheck;
  } catch (error) {
    console.error('Error fetching products in check:', error);
    throw new Error('Failed to fetch products in check');
  }
};