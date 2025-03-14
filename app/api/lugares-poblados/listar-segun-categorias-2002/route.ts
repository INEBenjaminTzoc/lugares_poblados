import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamento, municipio } = await request.json();

    try {
        const [rows] = await pool.execute(`
            SELECT  
                d.id AS ID_Departamento,
                d.nombre AS Departamento, 
                m.id AS ID_Municipio,
                m.nombre AS Municipio, 
                lp.id AS ID_Lugar_Poblado,
                lp.nombre AS Nombre, 
                cat.idcategoria AS ID_Categoria,
                cat.etiqueta AS Categoria,
                lp.observacion AS Observacion
                
            FROM municipio2002 AS m 
            INNER JOIN departamento2002 AS d ON d.id = m.departamento_id 
            INNER JOIN lugar_poblado2002 AS lp ON m.id = lp.cod_municipio 
            INNER JOIN categoria2002 AS cat ON cat.idcategoria = lp.cod_categoria
            WHERE d.id IN (${departamento}) and m.id IN (${municipio}) 
            ORDER BY lp.cod_categoria, lp.cod_estado, lp.nombre ASC    
        `);

        return NextResponse.json({ code: 200, lugaresPoblados: rows });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}