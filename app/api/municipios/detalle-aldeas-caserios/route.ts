import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows] = await pool.execute(`
            SELECT 
            d.id AS Depto2022, m.id AS IDMupio2022, 
            m.nombre AS Mupio2022,
            sum(if((cat.idcategoria= '4') and (lp.cod_estado in (1,2,6,8,9) or (lp.cod_estado=5 and lp.estado = 'Y')), 1,0)  ) AS ALDEA2022,
            sum(if((cat.idcategoria= '6') and (lp.cod_estado in (1,2,6,8,9) or (lp.cod_estado=5 and lp.estado = 'Y')), 1,0)  ) AS CASERIO2022,
            sum(if(lp.cod_estado= '1', 1,0) and cat.idcategoria= '4') AS 'A1',
            sum(if(lp.cod_estado= '1', 1,0) and cat.idcategoria= '6') AS 'C1',
            sum(if(lp.cod_estado= '2', 1,0) and cat.idcategoria= '4') AS 'A2',
            sum(if(lp.cod_estado= '2', 1,0) and cat.idcategoria= '6') AS 'C2',
            sum(if(lp.cod_estado= '3', 1,0) and cat.idcategoria= '4') AS 'A3',
            sum(if(lp.cod_estado= '3', 1,0) and cat.idcategoria= '6') AS 'C3',
            sum(if(lp.cod_estado= '4', 1,0) and cat.idcategoria= '4') AS 'A4',
            sum(if(lp.cod_estado= '4', 1,0) and cat.idcategoria= '6') AS 'C4',
            sum(if(lp.cod_estado= '5', 1,0) and cat.idcategoria= '4' and lp.estado='Y') AS 'A5Y',
            sum(if(lp.cod_estado= '5', 1,0) and cat.idcategoria= '6' and lp.estado='Y') AS 'C5Y',
            sum(if(lp.cod_estado= '5', 1,0) and cat.idcategoria= '4' and lp.estado='T') AS 'A5T',
            sum(if(lp.cod_estado= '5', 1,0) and cat.idcategoria= '6' and lp.estado='T') AS 'C5T',
            sum(if(lp.cod_estado= '6', 1,0) and cat.idcategoria= '4') AS 'A6', 
            sum(if(lp.cod_estado= '6', 1,0) and cat.idcategoria= '6') AS 'C6', 
            sum(if(lp.cod_estado= '7', 1,0) and cat.idcategoria= '4') AS 'A7',
            sum(if(lp.cod_estado= '7', 1,0) and cat.idcategoria= '6') AS 'C7',
            sum(if(lp.cod_estado= '8', 1,0) and cat.idcategoria= '4') AS 'A8',
            sum(if(lp.cod_estado= '8', 1,0) and cat.idcategoria= '6') AS 'C8',
            sum(if(lp.cod_estado= '9', 1,0) and cat.idcategoria= '4') AS 'A9',
            sum(if(lp.cod_estado= '9', 1,0) and cat.idcategoria= '6') AS 'C9',
            (sum(if((cat.idcategoria= '4') and (lp.cod_estado in (1,2,6,8,9) or (lp.cod_estado=5 and lp.estado = 'Y')), 1,0)  )+ sum(if((cat.idcategoria= '6') and (lp.cod_estado in (1,2,6,8,9) or (lp.cod_estado=5 and lp.estado = 'Y')), 1,0)  )) AS Total2022

            FROM municipio AS m INNER JOIN departamento AS d
            ON d.id=m.departamento_id INNER JOIN lugar_poblado AS lp
            ON m.id=lp.cod_municipio INNER JOIN categoria AS cat
            ON cat.idcategoria=lp.cod_categoria
            GROUP BY m.id    
        `);

        return NextResponse.json({ code: 200, detalleAldeasCaserios: rows });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}