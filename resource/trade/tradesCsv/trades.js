import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Trade from './../../../model/trade'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const { currency } = matchedData(req)

  const query = currency 
  ? {
    $or: [
      { buyCurrency: currency.toUpperCase() },
      { sellCurrency: currency.toUpperCase() }
    ]
  } 
  : null

  Trade.find(query).sort({ date: 1 }).exec()
    .then(result => {
      const header = 'BuyAmount,BuyCurrency,SellAmount,SellCurrency,FeeAmount,FeeCurrency,Exchange,Date\n'
      const data = result.map(trade => `${trade.buyAmount},${trade.buyCurrency},${trade.sellAmount},${trade.sellCurrency},${trade.feeAmount},${trade.feeCurrency},${trade.exchange},${trade.date}`)

      res.attachment('trades.csv').send(header + data.join('\n'))
    })
    .catch(err => res.status(404).json({'error': err.message}))
}