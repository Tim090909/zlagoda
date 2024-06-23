import { sql } from '@/lib/db';

export const getPromotionalStoreProducts = async () => {
  try {
    const result = await sql`SELECT upc, upc_prom, product.id_product, product_name, selling_price, products_number, promotional_product 
  FROM store_product INNER JOIN product on Product.id_product=Store_product.id_product
  WHERE promotional_product=true;`;
    return result.map((row: any) => ({
      id: row.id_product,
      title: row.product_name,
      upc: row.upc,
      upcProm: row.upc_prom,
      sellingPrice: row.selling_price,
      productsNumber: row.products_number,
      promotionalProduct: row.promotional_product
    }));
  } catch (error) {
    console.error('Error fetching promotional store products:', error);
    throw new Error('Failed to fetch promotional store products');
  }
};

