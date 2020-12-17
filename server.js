import express from 'express'
import debug from './lib/debug'
import mongoose from './lib/mongoose'

import trade from './resource/trade'
import price from './resource/price'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api/trade', trade)
app.use('/api/price', price)

app.listen(15646, () => {
  debug('server', 'Server listening at 15646')
})

mongoose()