import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Trade from './../../../model/trade'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const { buyCurrency, sellCurrency } = matchedData(req)

  Trade.getSpent(buyCurrency.toUpperCase(), sellCurrency.toUpperCase())
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({'error': err.message}))
}