import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamentos, municipios, estados, estadosMunicipio } = await request.json();
    console.log(departamentos, municipios, estados)
    try {
        const result = await prisma.$queryRaw`
          SELECT  
                d.id AS Depto2018, m.id AS IDMupio2018, m.nombre AS Mupio2018,
                sum(if(cat.idcategoria= '4', 1,0)) AS ALDEA2018, 
                sum(if(cat.idcategoria= '6', 1,0)) AS CASERIO2018,
                (sum(if(cat.idcategoria= '4', 1,0)) + sum(if(cat.idcategoria= '6', 1,0)) ) as Total2018
            FROM municipio AS m 
            LEFT JOIN departamento AS d ON d.id=m.departamento_id 
            LEFT JOIN lugar_poblado AS lp ON m.id=lp.cod_municipio 
            LEFT JOIN categoria AS cat ON cat.idcategoria=lp.cod_categoria
            WHERE d.id IN (${departamentos}) 
            AND m.id IN (${municipios}) 
            AND lp.cod_estado IN (${estados})
            AND lp.estado IN (${estadosMunicipio})
            AND lp.id NOT IN (
                SELECT id FROM lugar_poblado 
                WHERE lugar_poblado.cod_estado='5' 
                AND lugar_poblado.estado='T'
            )
            GROUP BY m.id;  
        `;
        return NextResponse.json({ code: 200, result });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}