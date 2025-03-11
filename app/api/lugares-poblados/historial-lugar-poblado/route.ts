import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamentos, municipios, estados } = await request.json();
    console.log(departamentos, municipios, estados)
    try {
        const results = await prisma.lugar_poblado.findMany({
            where: {
                cod_estado: { in: estados },
                municipio: {
                    id: { in: municipios },
                    departamento: {
                        id: { in: departamentos }
                    }
                }
            },
            select: {
                id: true,
                nombre: true,
                cod_estado: true,
                observacion: true,
                estado: true,
                pertenencia: true,
                municipio: {
                    select: {
                        id: true,
                        nombre: true,
                        departamento: {
                            select: {
                                id: true,
                                nombre: true
                            }
                        }
                    }
                },
                categoria: {
                    select: {
                        idcategoria: true,
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

        const formattedResults = results.flatMap(lugarPoblado => ({ 
                ID_LugarPoblado: lugarPoblado.id,
                LugarPoblado: lugarPoblado.nombre,
                ID_Departamento: lugarPoblado.municipio?.departamento.id,
                Departamento: lugarPoblado.municipio?.departamento.nombre,
                ID_Municipio: lugarPoblado.municipio?.id,
                Municipio: lugarPoblado.municipio?.nombre,
                Categoria: lugarPoblado.categoria?.etiqueta,
                Estado: lugarPoblado.cod_estado,
                Observacion: lugarPoblado.observacion,
                EstadoMunicipio: lugarPoblado.estado,
                Pertenencia: lugarPoblado.pertenencia
        }));

        return NextResponse.json({ code: 200, lugaresPobladosHistorial: formattedResults });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}