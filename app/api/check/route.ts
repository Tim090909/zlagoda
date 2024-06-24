import { sql } from "@/lib/db";
import { generateUniqueCheckId } from "@/lib/id_generator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

interface Product {
    upc: string;
    price: number;
    amount: number;
  }

export async function POST(req: Request) {
    try{
        const {client_id, products} = await req.json();
        
        const session = await getServerSession(options);
        const emplId = session?.user.id || "4qHl4PMiVT";

        const sumTotal = products.reduce((total: number, product: Product) => {
            return total + product.price * product.amount;
        }, 0);
        const custId = client_id || null;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const checkId = await generateUniqueCheckId();
        const newCheck = await sql`INSERT INTO Checks (check_number, id_employee, card_number, print_date, sum_total)
        VALUES ( ${checkId}, ${emplId}, ${custId}, ${currentDate}, ${sumTotal})
      `

        const insertPromises = products.map((product: Product) => 
            sql`
            INSERT INTO Sale ( upc, check_number, product_number, selling_price)
            VALUES ( ${product.upc}, ${checkId}, ${product.amount}, ${product.price});`
        );

        await Promise.all(insertPromises);

        const updatePromises = products.map((product: Product) =>  sql`update store_product
        set products_number=products_number-${product.amount}
        where upc=${product.upc};`);

        await Promise.all(updatePromises);
        
        //const deleteZero = await sql`delete from store_product where products_number=0;`

        return NextResponse.json(200);

    }catch(error){
        console.log("[CHECK]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}