import { query } from 'express-validator'

export default [
  query('currency').optional(),
]