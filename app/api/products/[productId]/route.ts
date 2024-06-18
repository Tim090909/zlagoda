import { sql } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(req: Request,
    { params }: { params: { productId: string } }) {
    try{
        //console.log(params.productId);

        await sql`
        DELETE FROM product
        WHERE id_product = ${params.productId};
      `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[product_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}