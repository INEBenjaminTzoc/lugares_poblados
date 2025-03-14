import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const [rows] = await pool.execute<RowDataPacket[]>(`
            SELECT ArchivopdfDictamen AS ArchivoBase64 
            FROM archivos_municipio 
            WHERE idarchivos_mupio = ${id}
        `);
        const fileBuffer = rows[0].ArchivoBase64;
        const base64 = fileBuffer.toString('base64');

        return NextResponse.json({ code: 200, ArchivoBase64: base64 });
    } catch (error) {
        return NextResponse.json({ code: 500, error });
    }
}