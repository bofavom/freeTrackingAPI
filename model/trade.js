import mongoose from 'mongoose'

const tradeSchema = new mongoose.Schema({
  buyAmount: Number,
  buyCurrency: String,
  sellAmount: Number,
  sellCurrency: String,
  feeAmount: Number,
  feeCurrenty: String,
  date: Date
})

tradeSchema.statics.getBalance = function(currency) {
  return new Promise((resolve, reject) => {
    const query = {
      $or: [
        { sellCurrency: currency },
        { buyCurrency: currency }
      ]
    }

    mongoose.model('Trade').find(query, (err, res) => {
      if (err) return reject(err)
      
      let balance = 0
      res.forEach(doc => {
        if (doc.buyCurrency === currency)
          balance += doc.buyAmount
        else if (doc.sellCurrency === currency)
          balance -= doc.sellAmount
      })
      
      resolve({
        amount: balance,
        currency: currency
      })
    })
  })
}

const Trade = mongoose.model('Trade', tradeSchema)
export default Trade