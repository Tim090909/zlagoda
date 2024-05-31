import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {title} = await req.json();
        //console.log(category_name)
        const newProduct = await sql`INSERT INTO Category (category_name)
        VALUES (${title}) 
      `
        return NextResponse.json(newProduct);

    }catch(error){
        console.log("[CATEGORY]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}