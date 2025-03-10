import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { filtro, estados } = await request.json();

    try {
        let results = null;
        switch (filtro) {
            case 1:
                const result = await prisma.municipio.findMany({
                    where: {
                        lugares_poblados: {
                            some: {
                                cod_estado: { in: estados },
                                categoria: { idcategoria: { in: [ 4, 6 ] } }
                            }
                        }
                    },
                    select: {
                        id: true,
                        nombre: true,
                        departamento: {
                            select: { id: true, nombre: true }
                        },
                        lugares_poblados: {
                            select: { cod_categoria: true }
                        }
                    }
                });

                results = result.map(municipio => {
                  const aldeas = municipio.lugares_poblados.filter(lp => lp.cod_categoria === 4).length;
                  const caserios = municipio.lugares_poblados.filter(lp => lp.cod_categoria === 6).length;
            
                  return {
                    ID_Departamento: municipio.departamento.id,
                    Departamento: municipio.departamento.nombre,
                    ID_Municipio: municipio.id,
                    Municipio: municipio.nombre,
                    Aldeas: aldeas,
                    Caserios: caserios
                  };
                });
            break;
            case 2:
                const result2 = await prisma.municipio.findMany({
                    where: {
                        lugares_poblados: {
                            some: {
                                cod_estado: { in: estados },
                                categoria: { idcategoria: { notIn: [ 4, 6 ] } }
                            }
                        }
                    },
                    select: {
                        id: true,
                        nombre: true,
                        departamento: {
                            select: { id: true, nombre: true }
                        },
                        lugares_poblados: {
                            select: { id: true }
                        }
                    }
                });

                results = result2.map(municipio => {
                    const total = municipio.lugares_poblados.length;

                    return {
                        ID_Departamento: municipio.departamento.id,
                        Departamento: municipio.departamento.nombre,
                        ID_Municipio: municipio.id,
                        Municipio: municipio.nombre,
                        Total: total
                    };
                });
            break;
            case 3:
                const result3 = await prisma.municipio.findMany({
                    where: {
                        lugares_poblados: {
                            some: { cod_estado: { in: estados } }
                        }
                    },
                    select: {
                        id: true,
                        nombre: true,
                        departamento: {
                            select: { id: true, nombre: true }
                        },
                        lugares_poblados: {
                            select: { id: true }
                        }
                    }
                });

                results = result3.map(municipio => {
                    const total = municipio.lugares_poblados.length;

                    return {
                        ID_Departamento: municipio.departamento.id,
                        Departamento: municipio.departamento.nombre,
                        ID_Municipio: municipio.id,
                        Municipio: municipio.nombre,
                        Total: total
                    };
                });
            break;
        }

        return NextResponse.json({ code: 200, aldeasCaseriosTotales: results });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}