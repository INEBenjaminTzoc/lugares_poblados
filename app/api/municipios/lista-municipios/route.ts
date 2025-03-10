import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const municipios = await prisma.municipio.findMany({
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
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}