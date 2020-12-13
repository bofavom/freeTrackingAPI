import { matchedData } from 'express-validator'
import { isValidRequest, throwRequestError } from './../../../helper/validation'
import Trade from './../../../model/trade'
import coinTrackingParser from './../../../utility/coinTrackingParser'

export default async (req, res, next) => {
  
  if (!isValidRequest(req))
  return throwRequestError(req, res)

  const {  } = matchedData(req)

  if (!req.file || !req.file.buffer)
  return res.status(422).json({error: 'Missing csv file'})

  const csv = req.file.buffer.toString('utf8')
  const trades = coinTrackingParser(csv)

  return Trade.create(trades)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({error: err.message}))
}