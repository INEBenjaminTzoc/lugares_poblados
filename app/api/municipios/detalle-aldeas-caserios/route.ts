import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const detalleAldeasCaserios = await prisma.detalle_aldeas_caserios.findMany();

        return NextResponse.json({ code: 200, detalleAldeasCaserios });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}