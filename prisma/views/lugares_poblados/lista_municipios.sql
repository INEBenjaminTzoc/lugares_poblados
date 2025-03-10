SELECT
  `d`.`nombre` AS `departamento`,
  `m`.`id` AS `idMunicipio`,
  `m`.`nombre` AS `municipio`,
  `m`.`estado` AS `estado`
FROM
  (
    `lugares_poblados`.`municipio` `m`
    JOIN `lugares_poblados`.`departamento` `d` ON(`d`.`id` = `m`.`departamento_id`)
  )