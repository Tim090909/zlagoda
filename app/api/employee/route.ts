import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from '@/lib/hash';
import generateUniqueEmployeeId from "@/lib/id_generator";

export async function POST(req: Request) {
    try{
        const {name, surname, patronimic, role, salary, dob, dos, phone, city, street, zip_code, login} = await req.json();
        const id_employee = await generateUniqueEmployeeId();
        const newEmployee = await sql`
            INSERT INTO Employee (id_employee, empl_surname, empl_name, empl_patronimic, empl_role, salary, date_of_birth, date_of_start, phone_number, city, street, zip_code)
            VALUES (${id_employee}, ${surname}, ${name}, ${patronimic}, ${role}, ${salary}, ${dob}, ${dos}, ${phone}, ${city}, ${street}, ${zip_code});
            `;
        const first_password = "zlagoda12345"; 
        const hashedPassword = await hashPassword(first_password);
        await sql`INSERT INTO Passwords (login, pas_hash, id_employee)
        VALUES (${login}, ${hashedPassword}, ${id_employee})`;
        return NextResponse.json(newEmployee);

    }catch(error){
        console.log("[EMPLOYEE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}