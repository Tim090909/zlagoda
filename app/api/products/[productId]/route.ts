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


export async function PATCH(req: Request,
    { params }: { params: { productId: string } }) {
    try{
        const {title,
            category_id,
            characteristics} = await req.json();
        await sql`UPDATE product
        SET category_number=${category_id}, product_name=${title}, characteristics=${characteristics} 
        WHERE id_product=${params.productId};`;
        return NextResponse.json(200);

    }catch(error){
        console.log("[product_UPDATE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}