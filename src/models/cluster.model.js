const db = require('../helpers/db.helpers')

exports.findAllCluster = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit

  const query =`
  SELECT c.*, sp.name AS payment_status, sh.name AS status_huni
  FROM "cluster" AS c
  LEFT JOIN "status_payment" AS sp ON c.status_payment_id = sp.id
  LEFT JOIN "status_huni" AS sh ON c.status_huni_id = sh.id
  WHERE c."name" ILIKE $3
  ORDER BY c."${sort}" ${sortBy}
  LIMIT $1 OFFSET $2
`
const values = [limit,offset,`%${search}%`]
const { rows } = await db.query(query, values)
return rows
}

exports.findOne = async function (id) {
  const query =  `
  SELECT c.*, sp.name AS payment_status, sh.name AS status_huni
  FROM "cluster" AS c
  LEFT JOIN "status_payment" AS sp ON c.status_payment_id = sp.id
  LEFT JOIN "status_huni" AS sh ON c.status_huni_id = sh.id
  WHERE c.id = $1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.insert = async function (data) {
    const query = `
  INSERT INTO "cluster" ("name", "cluster_nomer", "status_payment_id", "status_huni_id") 
  VALUES ($1,$2,$3,$4) RETURNING *
  `
    const values = [data.name, data.cluster_nomer, data.status_payment_id, data.status_huni_id]
    const { rows } = await db.query(query, values)
    return rows[0]
  }

  exports.update = async function (id, data) {
    const query = `
  UPDATE "cluster" 
  SET 
  "name"=COALESCE(NULLIF($2, ''), "name"),
  "cluster_nomer"=COALESCE(NULLIF($3:: INTEGER, NULL), "cluster_nomer"),
  "status_payment_id"=COALESCE(NULLIF($4:: INTEGER, NULL), "status_payment_id"),
  "status_huni_id"=COALESCE(NULLIF($5:: INTEGER, NULL), "status_huni_id")
  WHERE "id"=$1
  RETURNING *
  `
    const values = [id, data.name, data.cluster_nomer, data.status_payment_id, data.status_huni_id]
    const { rows } = await db.query(query, values)
    return rows[0]
  }

  exports.destroy = async function(id){
    const query = `
  DELETE FROM "cluster" WHERE "id"=$1
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows [0]
}
  