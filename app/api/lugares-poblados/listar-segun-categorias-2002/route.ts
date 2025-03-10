import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamento, municipio } = await request.json();
    console.log("request: ", departamento, municipio);

    try {
        const lugaresPoblados = await prisma.lugar_poblado2002.findMany({
            where: {
                municipio: {
                    id: { in: municipio },
                    departamento: {
                        id: { in: departamento }
                    }
                }
            },
            include: {
                municipio: {
                    include: {
                        departamento: true
                    }
                },
                categoria: true
            },
            orderBy: [
                { cod_categoria: 'asc' },
                { cod_estado: 'asc' },
                { nombre: 'asc' }
            ]
        });

        const res = lugaresPoblados.map(lugarPoblado => ({
            ID_Departamento: lugarPoblado.municipio?.departamento?.id,
            Departamento: lugarPoblado.municipio?.departamento?.nombre,
            ID_Municipio: lugarPoblado.municipio?.id,
            Municipio: lugarPoblado.municipio?.nombre,
            ID_Lugar_Poblado: lugarPoblado.id,
            Nombre: lugarPoblado.nombre,
            ID_Categoria: lugarPoblado.categoria?.idcategoria,
            Categoria: lugarPoblado.categoria?.etiqueta,
            Observacion: lugarPoblado.observacion,
          }));

        return NextResponse.json({ code: 200, lugaresPoblados: res });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}