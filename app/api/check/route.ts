import { sql } from "@/lib/db";
import { generateUniqueCheckId } from "@/lib/id_generator";
import { NextResponse } from "next/server";

interface Product {
    upc: string;
    price: number;
    amount: number;
  }

export async function POST(req: Request) {
    try{
        const {client_id, products} = await req.json();
        
        //TODO "login"
        const emplId = "4qHl4PMiVT";

        const sumTotal = products.reduce((total: number, product: Product) => {
            return total + product.price * product.amount;
        }, 0);
        const custId = client_id || null;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const checkId = await generateUniqueCheckId();
        const newProduct = await sql`INSERT INTO Checks (check_number, id_employee, card_number, print_date, sum_total)
        VALUES ( ${checkId}, ${emplId}, ${custId}, ${currentDate}, ${sumTotal})
      `

        const insertPromises = products.map((product: Product) => 
            sql`
            INSERT INTO Sale ( upc, check_number, product_number, selling_price)
            VALUES ( ${product.upc}, ${checkId}, ${product.amount}, ${product.price});
            `
        );
        await Promise.all(insertPromises);

        return NextResponse.json(newProduct);

    }catch(error){
        console.log("[CHECK]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}