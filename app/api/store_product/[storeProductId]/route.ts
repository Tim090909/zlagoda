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

export async function PATCH(req: Request,
    { params }: { params: { storeProductId: string } }) {
    try{
        const {id,
            amount,
            price, promotional} = await req.json();
        await sql`UPDATE store_product
            SET id_product=${id}, selling_price=${price}, products_number=${amount}, promotional_product=${promotional}
            WHERE upc=${params.storeProductId};`;
        return NextResponse.json(200);

    }catch(error){
        console.log("[store_product_UPDATE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}