import { NextResponse } from "next/server";
import pool from "@/lib/db";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const [rows]: any = await pool.execute(`
            SELECT ArchivopdfCertificacion AS ArchivoBase64 
            FROM archivos_lug_pob 
            WHERE idarchivos_lug_pob = ${id}
        `);
        const fileBuffer = rows[0].ArchivoBase64;
        const base64 = fileBuffer.toString('base64');

        return NextResponse.json({ code: 200, ArchivoBase64: base64 });
    } catch (error) {
        return NextResponse.json({ code: 500, error });
    }
}