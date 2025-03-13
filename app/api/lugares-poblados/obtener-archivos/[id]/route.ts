import pool from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;
	console.log(id);

    try {
        const [rows] = await pool.execute(`
            SELECT 
				P.id AS ID_LugarPoblado,
				P.nombre AS Lugar_Poblado,
				D.id AS ID_Departamento,
				D.nombre AS Departamento,
				M.id AS ID_Municipio,
				M.nombre AS Municipio,
				AL.idarchivos_lug_pob AS ID_Archivo,
				AL.tipo_archivo AS Tipo_Archivo,
				AL.numero AS Numero,
				AL.fecha AS Fecha,
				AL.observaciones AS Observacion
			FROM archivos_lug_pob AL
			JOIN lugar_poblado P ON AL.id_lug_pob = P.id
			JOIN municipio M ON P.cod_municipio = M.id
            JOIN departamento D ON M.departamento_id = D.id
			WHERE AL.id_lug_pob =${id}
        `);

        return NextResponse.json({ code: 200, archivosDisponibles: rows });
    } catch (error) {
        return NextResponse.json({ code: 500, error })
    }
}