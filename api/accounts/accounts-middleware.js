const db = require('../../data/db-config')
const Account = require('./accounts-model')

module.exports = {
  checkAccountPayload, checkAccountNameUnique, checkAccountId
}

function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const errorStat = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    errorStat.message = "name and budget are required"
    next(errorStat)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorStat.message = "name of account must be between 3 and 100"
    next(errorStat)
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    errorStat.message = "budget of account must be a number"
    next(errorStat)
  } else if (budget < 0 || budget > 1000000) {
    errorStat.message = "budget of account is too large or too small"
    next(errorStat)
  }
  if (errorStat.message) {
    next(errorStat)
  } else {
    next()
  }
}
async function checkAccountNameUnique(req, res, next) {
  // DO YOUR MAGIC
    const trimName = req.body.name.trim()

    const nameExist = await db('accounts')
      .where('name', trimName)
      .first()

    if (nameExist) {
      next({
        status: 400,
        message: 'that name is taken'
      })
    } else {
      next()
    }
  } 

async function checkAccountId(req, res, next) {
  // DO YOUR MAGIC
  const account = await Account.getById(req.params.id)
  if (!account) {
    next({
      status: 404, message: "account not found"
    })
  } else {
    req.account = account
    next()
  }
}
