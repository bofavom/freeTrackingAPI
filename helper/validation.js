import { validationResult } from 'express-validator'

export const isValidRequest = (req) => {
  const result = validationResult(req)

  if (result.errors.length > 0) return false
  return true
}

export const throwRequestError = (req, res) => {
  const errors = validationResult(req).errors

  return res.status(422).json(errors)
}