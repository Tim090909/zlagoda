import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
    { params }: { params: { customerId: string } }) {
    try{
        //console.log(params.customerId);

        await sql`
        DELETE FROM Customer_card
        WHERE card_number = ${params.customerId};
      `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[CUSTOMER_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PATCH(req: Request,
    { params }: { params: { customerId: string } }) {
    try{
        const {name,
            surname,
            patronimic,
            percent,
            phone,
            city,
            street,
            zip_code} = await req.json();
        await sql`UPDATE customer_card 
            SET cust_name = ${name},               
                cust_surname = ${surname},
                cust_patronymic = ${patronimic},
                percent = ${percent},
                phone_number = ${phone},
                city = ${city},                
                street = ${street},
                zip_code = ${zip_code} 
            WHERE card_number=${params.customerId}; 
      `
        return NextResponse.json(200);

    }catch(error){
        console.log("[customer_UPDATE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}