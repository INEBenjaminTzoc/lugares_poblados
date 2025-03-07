import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const detalleTodasCategorias = await prisma.detalle_todas_categorias.findMany();

        return NextResponse.json({ code: 200, detalleTodasCategorias });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}