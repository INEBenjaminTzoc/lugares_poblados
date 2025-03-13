import pool from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;    //ID DEL DEPARTAMENTO SELECCIONADO

    try {
        const [rows] = await pool.execute(`
            SELECT 
                m.nombre AS municipio,
                m.estado AS estado,
                m.id AS idMunicipio,
                d.nombre AS departamento
            FROM municipio m
            INNER JOIN departamento d ON m.departamento_id = d.id
            WHERE departamento_id = ${id}
        `);

        return NextResponse.json({ code: 200, municipios: rows });
    } catch (error) {
        return NextResponse.json({ code: 500 })
    }
}