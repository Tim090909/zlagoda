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