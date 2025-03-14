import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamentos, municipios } = await request.json();
    
    try {
        const [aldeasCaserios2002] = await pool.execute<RowDataPacket[]>(`
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

        return NextResponse.json({ code: 200, aldeasCaserios2002 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}