import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const departamentos = await prisma.departamento.findMany();

        return NextResponse.json({ code: 200, departamentos })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}