import { sql } from "@/lib/db";
import { generateUniqueUPC } from "@/lib/id_generator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {id, price, amount, promotional} = await req.json();
        console.log(id, price, amount, promotional)

        const upc = await generateUniqueUPC();
        const newProduct = await sql`INSERT INTO Store_product (upc, id_product, selling_price, products_number, promotional_product)
        VALUES ( ${upc}, ${id}, ${price}, ${amount}, ${promotional})
      `
        return NextResponse.json(newProduct);

    }catch(error){
        console.log("[PRODUCT]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}