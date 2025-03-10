import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamento, municipio, estado } = await request.json();
    console.log("request: ", departamento, municipio, estado);
    try {
        const lugaresPoblados = await prisma.lugar_poblado.findMany({
            where: {
                cod_municipio: { in: municipio },
                cod_estado: { in: estado },
                municipio: {
                    departamento: {
                        id: { in: departamento }
                    }
                }
            }, 
            include:{
                municipio: {
                    select: {
                        id: true, nombre: true, departamento: { select: { id: true, nombre: true } }
                    }
                },
                categoria: {
                    select: {
                        etiqueta: true
                    }
                }
            },
            orderBy: [
                { cod_categoria: 'asc' },
                { cod_estado: 'asc' },
                { nombre: 'asc' }
            ]
        });

        const res = lugaresPoblados.map(lugarPoblado => ({
            ID_Lugar_Poblado: lugarPoblado.id,
            ID_Departamento: lugarPoblado.municipio?.departamento?.id,
            Departamento: lugarPoblado.municipio?.departamento?.nombre,
            ID_Municipio: lugarPoblado.municipio?.id,
            Municipio: lugarPoblado.municipio?.nombre,
            Nombre: lugarPoblado.nombre,
            Categoria: lugarPoblado.categoria?.etiqueta,
            Estado: lugarPoblado.cod_estado,
            Observacion: lugarPoblado.observacion,
            EstadoMunicipio: lugarPoblado.estado,
            Pertenencia: lugarPoblado.pertenencia,
          }));

        return NextResponse.json({ code: 200, lugaresPoblados: res });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}