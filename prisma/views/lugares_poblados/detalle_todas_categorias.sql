SELECT
  `d`.`nombre` AS `Codigo_Depto2018`,
  `m`.`id` AS `Codigo_Mupio2018`,
  `m`.`nombre` AS `Mupio2018`,
  sum(IF(`lp`.`cod_estado` = '1', 1, 0)) AS `a1`,
  sum(IF(`lp`.`cod_estado` = '2', 1, 0)) AS `a2`,
  sum(IF(`lp`.`cod_estado` = '3', 1, 0)) AS `a3`,
  sum(IF(`lp`.`cod_estado` = '4', 1, 0)) AS `a4`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `lp`.`estado` = 'Y'
  ) AS `5Y`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `lp`.`estado` = 'T'
  ) AS `5T`,
  sum(IF(`lp`.`cod_estado` = '6', 1, 0)) AS `a6`,
  sum(IF(`lp`.`cod_estado` = '7', 1, 0)) AS `a7`,
  sum(IF(`lp`.`cod_estado` = '1', 1, 0)) + sum(IF(`lp`.`cod_estado` = '2', 1, 0)) + sum(IF(`lp`.`cod_estado` = '3', 1, 0)) + sum(IF(`lp`.`cod_estado` = '4', 1, 0)) + sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `lp`.`estado` = 'Y'
  ) + sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `lp`.`estado` = 'T'
  ) + sum(IF(`lp`.`cod_estado` = '6', 1, 0)) + sum(IF(`lp`.`cod_estado` = '7', 1, 0)) AS `Total2018`
FROM
  (
    (
      (
        `lugares_poblados`.`municipio` `m`
        JOIN `lugares_poblados`.`departamento` `d` ON(`d`.`id` = `m`.`departamento_id`)
      )
      JOIN `lugares_poblados`.`lugar_poblado` `lp` ON(`m`.`id` = `lp`.`cod_municipio`)
    )
    JOIN `lugares_poblados`.`categoria` `cat` ON(`cat`.`idcategoria` = `lp`.`cod_categoria`)
  )
GROUP BY
  `m`.`id`