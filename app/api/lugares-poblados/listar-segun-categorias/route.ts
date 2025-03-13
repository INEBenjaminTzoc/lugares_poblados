import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { departamento, municipio, estado } = await request.json();
    console.log(municipio);
    
    try {
        const [rows] = await pool.execute(`
            SELECT 
                lp.id as ID_Lugar_Poblado,
                d.id as ID_Departamento, 
                d.nombre AS Departamento, 
                m.id AS ID_Municipio, 
                m.nombre AS Municipio, 
                lp.nombre AS Nombre, 
                cat.etiqueta AS Categoria, 
                lp.cod_estado AS Estado, 
                lp.observacion AS Observacion,
                lp.estado AS EstadoMunicipio, 
                lp.pertenencia as Pertenencia

            FROM municipio AS m 
            INNER JOIN departamento AS d ON d.id = m.departamento_id 
            INNER JOIN lugar_poblado AS lp ON m.id = lp.cod_municipio 
            INNER JOIN categoria AS cat ON cat.idcategoria = lp.cod_categoria
            WHERE d.id IN (${departamento}) 
            AND m.id IN (${municipio}) 
            AND lp.cod_estado in (${estado})
            ORDER BY lp.cod_categoria, lp.cod_estado, lp.nombre ASC    
        `);

        return NextResponse.json({ code: 200, lugaresPoblados: rows });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ code: 500, error });
    }
}