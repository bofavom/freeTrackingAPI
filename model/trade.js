import mongoose from 'mongoose'

const tradeSchema = new mongoose.Schema({
  buyAmount: Number,
  buyCurrency: String,
  sellAmount: Number,
  sellCurrenty: String,
  feeAmount: Number,
  feeCurrenty: String,
  date: Date
})

const Trade = mongoose.model('Trade', tradeSchema)
export default Trade