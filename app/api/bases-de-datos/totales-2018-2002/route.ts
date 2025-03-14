import { AldeasCaserios2002, AldeasCaserios2018 } from "@/app/inicio/bases-de-datos/totales-2018-2002/columns";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamentos, municipios, estados, estadosMunicipio } = await request.json();
    console.log(departamentos, municipios, estados);

    try {
        const [aldeasCaserios2018]: any = await pool.execute(`
            SELECT  
                d.id AS ID_Departamento2018, 
                m.id AS ID_Municipio2018, 
                m.nombre AS Municipio2018,
                sum(if(cat.idcategoria= '4', 1,0)) AS Aldea2018, 
                sum(if(cat.idcategoria= '6', 1,0)) AS Caserio2018,
                (sum(if(cat.idcategoria= '4', 1,0)) + sum(if(cat.idcategoria= '6', 1,0)) ) as Total2018
            FROM municipio AS m  
            LEFT JOIN departamento AS d ON d.id = m.departamento_id 
            LEFT JOIN lugar_poblado AS lp ON m.id = lp.cod_municipio 
            LEFT JOIN categoria AS cat ON cat.idcategoria = lp.cod_categoria
            WHERE d.id IN (${departamentos}) 
            AND m.id IN (${municipios}) 
            AND lp.cod_estado in (${estados})
            AND lp.estado IN (?)
            AND lp.id NOT IN (
                SELECT id FROM lugar_poblado 
                WHERE lugar_poblado.cod_estado = '5'
                AND lugar_poblado.estado = 'T'
            )
            GROUP BY d.id, m.id, m.nombre
        `, estadosMunicipio);

        const [aldeasCaserios2002]: any = await pool.execute(`
            SELECT  
                d.id AS ID_Departamento2002, 
                m.id AS ID_Municipio2002, 
                m.nombre AS Municipio2002,
                sum(if(cat.idcategoria= '4', 1,0)) AS Aldea2002, 
                sum(if(cat.idcategoria= '6', 1,0)) AS Caserio2002,
                (sum(if(cat.idcategoria= '4', 1,0)) + sum(if(cat.idcategoria= '6', 1,0)) ) AS Total2002

            FROM municipio2002 AS m 
            INNER JOIN departamento2002 AS d ON d.id = m.departamento_id 
            INNER JOIN lugar_poblado2002 AS lp ON m.id = lp.cod_municipio 
            INNER JOIN categoria2002 AS cat ON cat.idcategoria = lp.cod_categoria
            WHERE d.id IN (${departamentos}) and m.id IN (${municipios}) 
            GROUP BY m.id
        `);

        const datos2018: AldeasCaserios2018[] = aldeasCaserios2018;
        const datos2002: AldeasCaserios2002[] = aldeasCaserios2002;

        const totalesCombinados = datos2018.map((item2018: AldeasCaserios2018) => {
            const item2002 = datos2002
                .find((item2002: AldeasCaserios2002) => 
                    item2002.ID_Municipio2002 === item2018.ID_Municipio2018);
            return {
                ID_Departamento: item2018.ID_Departamento2018,
                ID_Municipio: item2018.ID_Municipio2018,
                Municipio: item2018.Municipio2018,
                Total2002: item2002 ? item2002.Total2002 : 0,
                Total2018: item2018.Total2018
            }
        });

        return NextResponse.json({ code: 200, aldeasCaserios2018, aldeasCaserios2002, totalesCombinados });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}