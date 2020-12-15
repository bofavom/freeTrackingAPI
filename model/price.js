import mongoose from 'mongoose'
import axios from 'axios'

const priceSchema = new mongoose.Schema({
  date: Date,
  interval: Number,
  pair: String,
  price: Number
}, {
  versionKey: false
})

priceSchema.statics.updatePrices = function(pair, interval, since = undefined) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = {
        pair: pair,
        interval: interval
      }
      let currentPricesDates = await mongoose.model('Price').find(query, '-_id date').exec()
      currentPricesDates = currentPricesDates.map(entry => entry.date.getTime() / 1000)

      axios.get(
        'https://api.kraken.com/0/public/OHLC', {
          params: {
            pair: pair,
            interval: interval,
            since: since ? since : null
          }
        }
      )
      .then(result => {
        const pairEntries = result.data.result[pair]
        const lastDate = result.data.result['last']
        const toAddPairEntries = pairEntries.filter(price => currentPricesDates.indexOf(price[0]) === -1 && price[0] <= lastDate)

        const prices = toAddPairEntries.map(pairEntry => new Price({
          date: new Date(pairEntry[0] * 1000),
          interval: interval,
          pair: pair,
          price: pairEntry[4]
        }))

        mongoose.model('Price').create(prices)
          .then(_ => resolve())
          .catch(err => reject(err))
      })
      .catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const Price = mongoose.model('Price', priceSchema)
export default Price