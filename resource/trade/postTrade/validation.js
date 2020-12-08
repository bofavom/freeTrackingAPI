import { body } from 'express-validator'

export default [
  body('buyAmount').exists(),
  body('buyCurrency').exists(),
  body('sellAmount').exists(),
  body('sellCurrency').exists(),
  body('feeAmount').exists(),
  body('feeCurrency').exists(),
  body('datetime').exists(),
]