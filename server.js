import express from 'express'
import debug from './lib/debug'
import mongoose from './lib/mongoose'

import trade from './resource/trade'

const app = express()

app.use(express.json())

app.use('/api/trade', trade)

app.listen(15646, () => {
  debug('server', 'Server listening at 15646')
})

mongoose()