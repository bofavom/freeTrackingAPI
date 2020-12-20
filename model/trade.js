import mongoose from 'mongoose'

const tradeSchema = new mongoose.Schema({
  buyAmount: Number,
  buyCurrency: String,
  sellAmount: Number,
  sellCurrency: String,
  feeAmount: Number,
  feeCurrency: String,
  exchange: String,
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
    }).sort({ 
      date: 1 
    })
  })
}

tradeSchema.statics.getSpent = function(buyCurrency, sellCurrency) {
  return new Promise((resolve, reject) => {
    const query = {
      $and: [
        { sellCurrency: sellCurrency },
        { buyCurrency: buyCurrency }
      ]
    }

    mongoose.model('Trade').find(query, (err, res) => {
      if (err) return reject(err)

      let spent = 0
      res.forEach(doc => {
        spent -= doc.sellAmount
      })

      resolve({
        amount: spent,
        pair: `${buyCurrency}${sellCurrency}`
      })
    }).sort({
      date: 1
    })
  })
}

tradeSchema.statics.checkDuplicates = function(newTrades) {
  return new Promise(async (resolve, reject) => {
    try {
      const duplicates = []
      const currentTrades = await mongoose.model('Trade').find({}, { _id: 0, __v: 0, date: 0 }).exec()

      for (let newTrade of newTrades) {
        delete newTrade.date
        const duplicate = currentTrades.find(currentTrade => JSON.stringify(currentTrade) === JSON.stringify(newTrade))
        if (duplicate) duplicates.push(duplicate)
      }

      resolve(duplicates)
    } catch (err) {
      reject(err)
    }
  })
}

const Trade = mongoose.model('Trade', tradeSchema)
export default Trade