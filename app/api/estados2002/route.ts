import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [estados] = await pool.execute(`
            SELECT *
            FROM estado2002
        `);

        return NextResponse.json({ code: 200, estados })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}