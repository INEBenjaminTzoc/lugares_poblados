import prisma from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const archivosDisponibles = await prisma.$queryRaw`
            SELECT 
                D.id AS ID_Departamento,
                D.nombre AS Departamento,
                AM.id_mupio AS ID_Municipio,
                M.nombre AS Municipio,
                AM.idarchivos_mupio AS ID_Archivo,
                AM.tipo_archivo AS Tipo_Archivo, 
                AM.numero AS Numero, 
                AM.fecha AS Fecha,
                AM.observaciones AS Observacion
            FROM archivos_municipio AM
            JOIN municipio M ON AM.id_mupio = M.id
            JOIN departamento D ON M.departamento_id = D.id
            WHERE AM.id_mupio = ${id}
        `;

        return NextResponse.json({ code: 200, archivosDisponibles });
    } catch (error) {
        return NextResponse.json({ code: 500, error })
    }
}