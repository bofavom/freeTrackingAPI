import express from 'express'

import postTrade from './postTrade'
import postCoinTracking from './postCoinTracking'
import postKrakenLedger from './postKrakenLedger'
import postBinance from './postBinance'
import currencyBalance from './currencyBalance'
import spentByCurrency from './spentByCurrency'
import tradesCsv from './tradesCsv'
import trades from './trades'

const router = express.Router()

router.post('/', postTrade)
router.post('/cointracking', postCoinTracking)
router.post('/kraken', postKrakenLedger)
router.post('/binance', postBinance)
router.get('/balance', currencyBalance)
router.get('/spent', spentByCurrency)
router.get('/csv', tradesCsv)
router.get('/', trades)

export default router