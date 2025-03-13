import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows] = await pool.execute(`
            SELECT * 
            FROM departamento    
        `);

        return NextResponse.json({ code: 200, departamentos: rows })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}