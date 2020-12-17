import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Price from './../../../model/price'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const { pair } = matchedData(req)

  const convertedPair = pair.toUpperCase() === 'BTCEUR' ? 'XXBTZEUR' : pair.toUpperCase()

  return Price.getCurrentPrice(convertedPair)
    .then(result => res.status(200).json({ price: result }))
    .catch(err => res.status(404).json({'error': err.message}))
}