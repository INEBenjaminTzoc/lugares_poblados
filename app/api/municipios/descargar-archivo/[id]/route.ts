import prisma from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const archivo = await prisma.$queryRaw`
            SELECT TO_BASE64(ArchivopdfDictamen) AS ArchivoBase64
            FROM archivos_municipio
			WHERE idarchivos_mupio = ${id}
        `;

        return NextResponse.json({ code: 200, archivo });
    } catch (error) {
        return NextResponse.json({ code: 500, error });
    }
}