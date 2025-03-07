import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { user, password } = await request.json();

    try {
        const existingUser = await prisma.usuario.findUnique({ where: { usuario: user, estado: "Activo" } });

        if (!existingUser)
            return NextResponse.json({ code: 404, error: "Usuario no encontrado" });
        
        if (existingUser.clave !== password)
            return NextResponse.json({ code: 401, error: "Credenciales inválidas" });

        return NextResponse.json({ code: 200, userData: existingUser })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }

}