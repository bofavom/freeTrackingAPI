import express from 'express'

import postTrade from './postTrade'
import currencyBalance from './currencyBalance'

const router = express.Router()

router.post('/', postTrade)
router.get('/balance', currencyBalance)

export default router