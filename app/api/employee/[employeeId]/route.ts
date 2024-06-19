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


export async function PATCH(req: Request,
    { params }: { params: { employeeId: string } }) {
    try{
        const {
            name,
            surname,
            patronimic,
            role,
            salary,
            dob,
            dos,
            phone,
            city,
            street,
            zip_code
        } = await req.json();
        await sql`
            UPDATE employee
            SET
                empl_name = ${name},
                empl_surname = ${surname},
                empl_patronimic = ${patronimic},
                empl_role = ${role},
                salary = ${salary},
                date_of_birth = ${dob},
                date_of_start = ${dos},
                phone_number = ${phone},
                city = ${city},
                street = ${street},
                zip_code = ${zip_code}
            WHERE id_employee = ${params.employeeId};
        `;
        return NextResponse.json(200);

    }catch(error){
        console.log("[employee_UPDATE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}