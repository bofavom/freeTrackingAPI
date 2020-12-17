import { query } from 'express-validator'

export default [
  query('pair').exists(),
]