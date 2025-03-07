import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const municipios = await prisma.lista_municipios.findMany();

        return NextResponse.json({ code: 200, municipios });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}