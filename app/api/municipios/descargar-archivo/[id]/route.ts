import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise'

interface Params {
    params: { id: string }
}

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lugares_poblados',
    port: 3306
});

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const [rows]: any = await connection.execute(`
            SELECT ArchivopdfDictamen AS ArchivoBase64 
            FROM archivos_municipio 
            WHERE idarchivos_mupio = ${id}
        `);
        const fileBuffer = rows[0].ArchivoBase64;
        const base64 = fileBuffer.toString('base64');
        // await connection.end();

        return NextResponse.json({ code: 200, ArchivoBase64: base64 });
    } catch (error) {
        return NextResponse.json({ code: 500, error });
    }
}