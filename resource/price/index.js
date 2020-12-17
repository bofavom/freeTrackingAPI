import express from 'express'

import getPrice from './getPrice'

const router = express.Router()

router.get('/', getPrice)

export default router