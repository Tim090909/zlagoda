import { sql } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(req: Request,
    { params }: { params: { employeeId: string } }) {
    try{
        //console.log(params.employeeId);

        await sql`
        DELETE FROM employee
        WHERE id_employee = ${params.employeeId};
      `;

        return NextResponse.json(200);

    }catch(error){
        console.log("[employee_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}