import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamento, municipio } = await request.json();
    console.log("request: ", departamento, municipio);

    try {
        const lugaresPoblados = await prisma.lugar_poblado2002.findMany({
            where: {
                municipio2002: {
                    id: { in: municipio },
                    departamento2002: {
                        id: { in: departamento }
                    }
                }
            },
            include: {
                municipio2002: {
                    include: {
                        departamento2002: true
                    }
                },
                categoria2002: true
            },
            orderBy: [
                { cod_categoria: 'asc' },
                { cod_estado: 'asc' },
                { nombre: 'asc' }
            ]
        });

        const res = lugaresPoblados.map(lugarPoblado => ({
            ID_Departamento: lugarPoblado.municipio2002?.departamento2002.id,
            Departamento: lugarPoblado.municipio2002?.departamento2002?.nombre,
            ID_Municipio: lugarPoblado.municipio2002?.id,
            Municipio: lugarPoblado.municipio2002?.nombre,
            ID_Lugar_Poblado: lugarPoblado.id,
            Nombre: lugarPoblado.nombre,
            ID_Categoria: lugarPoblado.categoria2002?.idcategoria,
            Categoria: lugarPoblado.categoria2002?.etiqueta,
            Observacion: lugarPoblado.observacion,
          }));

        return NextResponse.json({ code: 200, lugaresPoblados: res });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}