import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateUniqueCustomerId } from "@/lib/id_generator";

export async function POST(req: Request) {
    try{
        const {name, surname, patronimic, percent, phone, city, street, zip_code} = await req.json();
        const id_customer = await generateUniqueCustomerId();
        const newCustomer = await sql`
            INSERT INTO customer_card (card_number, cust_surname, cust_name, cust_patronymic, percent, phone_number, city, street, zip_code)
            VALUES (${id_customer}, ${surname}, ${name}, ${patronimic}, ${percent}, ${phone}, ${city}, ${street}, ${zip_code});`;
      
        return NextResponse.json(newCustomer);

    }catch(error){
        console.log("[CUSTOMER]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}