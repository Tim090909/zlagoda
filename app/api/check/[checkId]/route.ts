import { sql } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(req: Request,
    { params }: { params: { checkId: string } }) {
    try{
        
        //TODO "login"
        console.log(params.checkId);

        await sql`
        DELETE FROM Sale
        WHERE check_number = ${params.checkId};
      `;

      const deletedCheck = await sql`
      DELETE FROM Checks
      WHERE check_number = ${params.checkId}
      RETURNING *;
    `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[CHECK_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}