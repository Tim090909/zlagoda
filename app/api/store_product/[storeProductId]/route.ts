import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
    { params }: { params: { storeProductId: string } }) {
    try{
        //console.log(params.storeProductId);

        await sql`
        DELETE FROM store_product
        WHERE upc = ${params.storeProductId};
      `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[Store_Product_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}