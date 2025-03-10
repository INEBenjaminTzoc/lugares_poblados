import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamentos, municipios, estados } = await request.json();
    console.log(departamentos, municipios, estados)
    try {
        const results = await prisma.municipio.findMany({
            where: {
                id: { in: municipios },
                departamento: {
                    id: { in: departamentos }
                },
                lugares_poblados: {
                    some: {
                         cod_estado: { in: estados }
                    }
                }
            },
            select: {
                id: true,
                nombre: true,
                departamento: {
                    select: {
                        id: true,
                        nombre: true
                    }
                },
                lugares_poblados: {
                    select: {
                        id: true,
                        nombre: true,
                        cod_estado: true,
                        observacion: true,
                        estado: true,
                        pertenencia: true,
                        categoria: {
                            select: {
                                idcategoria: true,
                                etiqueta: true
                            }
                        }
                    }
                }
            }
        });

        const formattedResults = results.flatMap(municipio => 
            municipio.lugares_poblados.map(lp => ({
                IDLP: lp.id,
                ID: municipio.departamento.id,
                Depto: municipio.departamento.nombre,
                NombreD: municipio.departamento.nombre,
                IDMupio: municipio.id,
                Mupio: municipio.nombre,
                Nombre: lp.nombre,
                Categoria: lp.categoria?.etiqueta,
                Estado: lp.cod_estado,
                Observacion: lp.observacion,
                EstadoMupio: lp.estado,
                Pertenencia: lp.pertenencia
            }))
        );

        return NextResponse.json({ code: 200, aldeasCaseriosTotales: formattedResults });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}