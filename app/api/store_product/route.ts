import { sql } from "@/lib/db";
import { generateUniqueUPC } from "@/lib/id_generator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {id, price, amount, promotional} = await req.json();
        //console.log(id, price, amount, promotional)

        const upc = await generateUniqueUPC();
        const oldUpcReq = await sql`SELECT upc
                                FROM store_product
                                WHERE id_product=${id} AND NOT promotional_product;`;
        let oldUpc = "";
        if (oldUpcReq.length > 0 && oldUpcReq[0]) {
            oldUpc = oldUpcReq[0].upc;
        }

        if(oldUpc){
            const newProduct = await sql`INSERT INTO Store_product (upc, upc_prom, id_product, selling_price, products_number, promotional_product )
            VALUES ( ${upc}, ${oldUpc}, ${id}, ${price}, ${amount}, ${promotional});`;
        
            await sql`UPDATE store_product
                SET promotional_product = TRUE,
                selling_price = selling_price*0.8
                WHERE upc=${oldUpc};`;
        }else{
            const newProduct = await sql`INSERT INTO Store_product (upc, id_product, selling_price, products_number, promotional_product )
            VALUES ( ${upc}, ${id}, ${price}, ${amount}, ${promotional});`;
        }

        return NextResponse.json(200);

    }catch(error){
        console.log("[PRODUCT]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}