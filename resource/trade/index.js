import express from 'express'

import postTrade from './postTrade'
import postCoinTracking from './postCoinTracking'
import currencyBalance from './currencyBalance'

const router = express.Router()

router.post('/', postTrade)
router.post('/cointracking', postCoinTracking)
router.get('/balance', currencyBalance)

export default router