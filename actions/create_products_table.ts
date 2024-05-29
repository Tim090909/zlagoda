import {sql} from '@/lib/db';
import { NextResponse } from 'next/server';

export const createProductsTable = async () => {
    try{
        await sql`CREATE TABLE IF NOT EXISTS Products (
            id SERIAl PRIMARY KEY,
            title varchar(255),
            amount integer,
            status varchar(50),
            price integer
          );
        `;
        const products = [
          {
            title: "Cakeere",
            amount: 100,
            status: "available",
            price: 100,
          },
          {
            title: "Grilll",
            amount: 125,
            status: "available",
            price: 1100,
          },
          {
            title: "Phonertr",
            amount: 12,
            status: "available",
            price: 1500,
          },
          {
            title: "Cornnnn",
            amount: 1250,
            status: "available",
            price: 5,
          },
        ];
      
        // Insert data into the Products table
        const insertPromises = products.map(product => 
          sql`
            INSERT INTO Products ( title, amount, status, price)
            VALUES ( ${product.title}, ${product.amount}, ${product.status}, ${product.price})
            ON CONFLICT (id) DO NOTHING;
          `
        );
        await Promise.all(insertPromises);

        return []//NextResponse.json({ status: 200 });
    }catch (error) {
        console.log("CREATE_PRODUCTS_TABLE", error)
        return [];
    }
}