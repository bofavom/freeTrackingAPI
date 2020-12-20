import express from 'express'

import postTrade from './postTrade'
import postCoinTracking from './postCoinTracking'
import postKrakenLedger from './postKrakenLedger'
import currencyBalance from './currencyBalance'
import spentByCurrency from './spentByCurrency'

const router = express.Router()

router.post('/', postTrade)
router.post('/cointracking', postCoinTracking)
router.post('/kraken', postKrakenLedger)
router.get('/balance', currencyBalance)
router.get('/spent', spentByCurrency)

export default router