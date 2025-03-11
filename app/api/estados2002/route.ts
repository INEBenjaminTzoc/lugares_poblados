import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const estados = await prisma.estado2002.findMany();

        return NextResponse.json({ code: 200, estados })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}