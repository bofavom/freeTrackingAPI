import express from 'express'

import postTrade from './postTrade'

const router = express.Router()

router.post('/', postTrade)

export default router