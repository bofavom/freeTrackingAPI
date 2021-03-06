import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Trade from './../../../model/trade'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const { buyAmount, buyCurrency } = matchedData(req)
  const { sellAmount, sellCurrency } = matchedData(req)
  const { feeAmount, feeCurrency } = matchedData(req)
  const { exchange, datetime } = matchedData(req)

  const trade = new Trade({
    buyAmount: Number(Number(buyAmount).toFixed(8)),
    buyCurrency: buyCurrency.toUpperCase(),
    sellAmount: Number(Number(sellAmount).toFixed(8)),
    sellCurrency: sellCurrency.toUpperCase(),
    feeAmount: Number(Number(feeAmount).toFixed(8)),
    feeCurrency: Number(feeAmount) === 0 ? '' : feeCurrency.toUpperCase(),
    exchange: exchange.charAt(0).toUpperCase() + exchange.slice(1).toLowerCase(),
    date: new Date(datetime)
  })

  const tradeObject = trade.toObject()
  delete tradeObject._id

  const duplicates = await Trade.checkDuplicates([tradeObject])
  if (duplicates.length > 0)
  return res.status(422).json({
    error: 'Possible entries already inserted. Import aborted.',
    duplicates: duplicates
  })

  trade.save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(404).json({'error': err.message}))
}