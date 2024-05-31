import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {title, category_id, characteristics} = await req.json();
        //console.log(category_name, characteristics)
        const newProduct = await sql`INSERT INTO Product (product_name, category_number, characteristics)
        VALUES ( ${title}, ${category_id}, ${characteristics})
      `
        return NextResponse.json(newProduct);

    }catch(error){
        console.log("[PRODUCT]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}