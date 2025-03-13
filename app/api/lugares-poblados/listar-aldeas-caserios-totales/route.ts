import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { filtro, estados } = await request.json();

    try {
        let results = null;
        switch (filtro) {
            case 1:
                const [result] = await pool.execute(`
                    SELECT 
                        d.id AS ID_Departamento,
                        d.nombre AS Departamento,
                        m.id AS ID_Municipio,
                        m.nombre AS Municipio,
                        sum(if(cat.idcategoria= '4', 1,0)) AS Aldeas, 
                        sum(if(cat.idcategoria= '6', 1,0)) AS Caserios
                    FROM municipio AS m
                    INNER JOIN departamento AS d ON d.id = m.departamento_id
                    INNER JOIN lugar_poblado AS lp ON m.id = lp.cod_municipio
                    INNER JOIN categoria AS cat ON cat.idcategoria = lp.cod_categoria
                    WHERE (cat.idcategoria IN (4,6)) 
                    AND (lp.cod_estado IN (${estados}))
                    GROUP BY d.id, d.nombre, m.id, m.nombre    
                `);

                results = result;
            break;
            case 2:
                const [result2] = await pool.execute(`
                    SELECT 
                        d.id AS ID_Departamento,
                        d.nombre AS Departamento,
                        m.id AS ID_Municipio,
                        m.nombre AS Municipio,
                        COUNT(*) as Total
                    FROM municipio AS m 
                    INNER JOIN departamento AS d ON d.id = m.departamento_id
                    INNER JOIN lugar_poblado AS lp ON m.id = lp.cod_municipio
                    INNER JOIN categoria AS cat ON cat.idcategoria = lp.cod_categoria
                    WHERE (cat.idcategoria NOT IN (4,6)) 
                    AND (lp.cod_estado IN (${estados}))
                    GROUP BY d.id, d.nombre, m.id, m.nombre
                `);

                results = result2;
            break;
            case 3:
                const [result3] = await pool.execute(`
                    SELECT 
                        d.id AS ID_Departamento,
                        d.nombre AS Departamento,
                        m.id AS ID_Municipio,
                        m.nombre AS Municipio,
                        COUNT(*) as Total
                    FROM municipio AS m
                    INNER JOIN departamento AS d ON d.id = m.departamento_id
                    INNER JOIN lugar_poblado AS lp ON m.id = lp.cod_municipio
                    INNER JOIN categoria AS cat ON cat.idcategoria = lp.cod_categoria
                    WHERE (lp.cod_estado IN (${estados}))
                    GROUP BY d.id, d.nombre, m.id, m.nombre
                `);

                results = result3;
            break;
        }

        return NextResponse.json({ code: 200, aldeasCaseriosTotales: results });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}