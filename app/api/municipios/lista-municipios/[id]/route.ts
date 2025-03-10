import prisma from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;

    try {
        const municipios = await prisma.municipio.findMany({
            where: { departamento_id: parseInt(id) },
            include: { departamento: true }
        });

        const res = municipios.map(municipio => ({
            municipio: municipio.nombre,
            estado: municipio.estado,
            idMunicipio: municipio.id,
            departamento: municipio.departamento.nombre
        }))

        return NextResponse.json({ code: 200, municipios: res });
    } catch (error) {
        return NextResponse.json({ code: 500 })
    }
}