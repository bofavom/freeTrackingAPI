import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Trade from './../../../model/trade'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const { buyAmount, buyCurrency } = matchedData(req)
  const { sellAmount, sellCurrency } = matchedData(req)
  const { feeAmount, feeCurrency } = matchedData(req)
  const { datetime } = matchedData(req)

  const trade = new Trade({
    buyAmount: buyAmount,
    buyCurrency: buyCurrency,
    sellAmount: sellAmount,
    sellCurrenty: sellCurrency,
    feeAmount: feeAmount,
    feeCurrenty: feeCurrency,
    date: new Date(datetime)
  })

  trade.save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(404).json({'error': err.message}))
}