import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows] = await pool.execute(`
            SELECT d.nombre AS departamento, m.id AS idMunicipio, m.nombre AS municipio, m.estado AS estado 
            FROM municipio AS m INNER JOIN departamento AS d
            ON d.id = m.departamento_id;
        `);

        return NextResponse.json({ code: 200, municipios: rows });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}