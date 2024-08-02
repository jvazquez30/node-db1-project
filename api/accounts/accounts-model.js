const db = require('../../data/db-config')

async function getAll() {
  // DO YOUR MAGIC
  const result = await db('accounts')
  return result
}

async function getById(id) {
  const result = await db('accounts').where('id', id).first()
  return result
}

async function create (account) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

async function updateById(id, changes) {
  // DO YOUR MAGIC
  await db('accounts').update(changes).where('id', id)
  const result = await getById(id)
  return result
}

async function deleteById(id) {
  // DO YOUR MAGIC
  const getDeleted = await getById(id)
  await db('accounts').del().where('id', id)
  return getDeleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
