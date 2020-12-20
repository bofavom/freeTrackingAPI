import { query } from 'express-validator'

export default [
  query(['buyCurrency', 'sellCurrency']).exists(),
]