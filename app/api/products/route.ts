import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {title, amount, status, price} = await req.json();
        console.log(amount, status, price)
        const newProduct = await sql`INSERT INTO Products (title, amount, status, price)
        VALUES ( ${title}, ${amount}, ${status}, ${price})
        ON CONFLICT (id) DO NOTHING;
      `
        return NextResponse.json(newProduct);

    }catch(error){
        console.log("[ARTICLES]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}