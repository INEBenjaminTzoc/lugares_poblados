SELECT
  `d`.`nombre` AS `Depto2022`,
  `m`.`id` AS `IDMupio2022`,
  `m`.`nombre` AS `Mupio2022`,
  sum(
    IF(
      `cat`.`idcategoria` = '4'
      AND (
        `lp`.`cod_estado` IN (1, 2, 6, 8, 9)
        OR `lp`.`cod_estado` = 5
        AND `lp`.`estado` = 'Y'
      ),
      1,
      0
    )
  ) AS `ALDEA2022`,
  sum(
    IF(
      `cat`.`idcategoria` = '6'
      AND (
        `lp`.`cod_estado` IN (1, 2, 6, 8, 9)
        OR `lp`.`cod_estado` = 5
        AND `lp`.`estado` = 'Y'
      ),
      1,
      0
    )
  ) AS `CASERIO2022`,
  sum(
    IF(`lp`.`cod_estado` = '1', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A1`,
  sum(
    IF(`lp`.`cod_estado` = '1', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C1`,
  sum(
    IF(`lp`.`cod_estado` = '2', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A2`,
  sum(
    IF(`lp`.`cod_estado` = '2', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C2`,
  sum(
    IF(`lp`.`cod_estado` = '3', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A3`,
  sum(
    IF(`lp`.`cod_estado` = '3', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C3`,
  sum(
    IF(`lp`.`cod_estado` = '4', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A4`,
  sum(
    IF(`lp`.`cod_estado` = '4', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C4`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `cat`.`idcategoria` = '4'
    AND `lp`.`estado` = 'Y'
  ) AS `A5Y`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `cat`.`idcategoria` = '6'
    AND `lp`.`estado` = 'Y'
  ) AS `C5Y`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `cat`.`idcategoria` = '4'
    AND `lp`.`estado` = 'T'
  ) AS `A5T`,
  sum(
    IF(`lp`.`cod_estado` = '5', 1, 0)
    AND `cat`.`idcategoria` = '6'
    AND `lp`.`estado` = 'T'
  ) AS `C5T`,
  sum(
    IF(`lp`.`cod_estado` = '6', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A6`,
  sum(
    IF(`lp`.`cod_estado` = '6', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C6`,
  sum(
    IF(`lp`.`cod_estado` = '7', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A7`,
  sum(
    IF(`lp`.`cod_estado` = '7', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C7`,
  sum(
    IF(`lp`.`cod_estado` = '8', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A8`,
  sum(
    IF(`lp`.`cod_estado` = '8', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C8`,
  sum(
    IF(`lp`.`cod_estado` = '9', 1, 0)
    AND `cat`.`idcategoria` = '4'
  ) AS `A9`,
  sum(
    IF(`lp`.`cod_estado` = '9', 1, 0)
    AND `cat`.`idcategoria` = '6'
  ) AS `C9`,
  sum(
    IF(
      `cat`.`idcategoria` = '4'
      AND (
        `lp`.`cod_estado` IN (1, 2, 6, 8, 9)
        OR `lp`.`cod_estado` = 5
        AND `lp`.`estado` = 'Y'
      ),
      1,
      0
    )
  ) + sum(
    IF(
      `cat`.`idcategoria` = '6'
      AND (
        `lp`.`cod_estado` IN (1, 2, 6, 8, 9)
        OR `lp`.`cod_estado` = 5
        AND `lp`.`estado` = 'Y'
      ),
      1,
      0
    )
  ) AS `Total2022`
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