import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows] = await pool.execute(`
            SELECT 
            d.id AS Codigo_Depto2018, 
            m.id AS Codigo_Mupio2018, 
            m.nombre AS Mupio2018,
            sum(if(lp.cod_estado= '1', 1,0)) AS 'a1' ,
            sum(if(lp.cod_estado= '2', 1,0)) AS 'a2',
            sum(if(lp.cod_estado= '3', 1,0)) AS 'a3',               
            sum(if(lp.cod_estado= '4', 1,0)) AS 'a4',
            sum(if(lp.cod_estado= '5', 1,0) and lp.estado = 'Y') AS '5Y',
            sum(if(lp.cod_estado= '5', 1,0) and lp.estado = 'T') AS '5T',
            sum(if(lp.cod_estado= '6', 1,0)) AS 'a6', 
            sum(if(lp.cod_estado= '7', 1,0)) AS 'a7',
            (sum(if(lp.cod_estado= '1', 1,0)) +sum(if(lp.cod_estado= '2', 1,0)) + sum(if(lp.cod_estado= '3', 1,0)) 
            + sum(if(lp.cod_estado= '4', 1,0)) + sum(if(lp.cod_estado= '5', 1,0) and lp.estado = 'Y') ) 
            + sum(if(lp.cod_estado= '5', 1,0) and lp.estado = 'T') + sum(if(lp.cod_estado= '6', 1,0))+ sum(if(lp.cod_estado= '7', 1,0)) as Total2018
                                            
            FROM municipio AS m INNER JOIN departamento AS d
            ON d.id=m.departamento_id INNER JOIN lugar_poblado AS lp
            ON m.id=lp.cod_municipio INNER JOIN categoria AS cat
            ON cat.idcategoria=lp.cod_categoria            
            GROUP BY m.id    
        `);

        return NextResponse.json({ code: 200, detalleTodasCategorias: rows });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}