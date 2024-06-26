import { sql } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(req: Request,
    { params }: { params: { categoryId: string } }) {
    try{
        //console.log(params.categoryId);

        await sql`
        DELETE FROM Category
        WHERE category_number = ${params.categoryId};
      `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}


export async function PATCH(req: Request,
    { params }: { params: { categoryId: string } }) {
    try{
        const {title} = await req.json();
        await sql`UPDATE category SET category_name=${title} WHERE category_number=${params.categoryId}; 
      `
        return NextResponse.json(200);

    }catch(error){
        console.log("[CATEGORY_UPDATE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}