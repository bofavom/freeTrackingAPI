const normalize = (string) => string.replaceAll('"', '')
const normalizeCurrency = (string) => {
  if (string === 'ZEUR') return 'EUR'
  else if (string === 'XXBT') return 'BTC'
  else return string
}

export default (csv) => {
  const lines = csv.split('\n')
  const body = lines.slice(1, lines.length)
  const json = []

  for (let line of body) {
    const rows = line.split(',')
    if (!line.length > 0) continue

    json.push({
      txid: normalize(rows[0]),
      redif: normalize(rows[1]),
      time: new Date(normalize(rows[2])),
      type: normalize(rows[3]),
      subtype: normalize(rows[4]),
      aclass: normalize(rows[5]),
      asset: normalize(rows[6]),
      amount: rows[7],
      fee: rows[8],
      balance: rows[9]
    })
  }

  const trades = json.filter(entry => entry.type === 'trade')
  const processedRedifs = []
  const result = []

  for (let trade of trades) {
    const redif = trade.redif
    if (processedRedifs.indexOf(redif) !== -1) continue

    const pair = trades.find(entry => entry.redif === redif && entry.txid !== trade.txid)

    const sell = trade.amount.indexOf('-') === -1 ? pair : trade
    const buy = trade.amount.indexOf('-') === -1 ? trade : pair
    const fee = Number(trade.fee) > 0 ? trade : pair
    const buyAmountFee = fee.asset === buy.asset ? fee.fee : 0
    const sellAmountFee = fee.asset === sell.asset ? fee.fee : 0

    result.push({
      buyAmount: Number((Number(buy.amount) - Number(buyAmountFee)).toFixed(8)),
      buyCurrency: normalizeCurrency(buy.asset),
      sellAmount: Number((Math.abs(Number(sell.amount)) + Number(sellAmountFee)).toFixed(8)),
      sellCurrency: normalizeCurrency(sell.asset),
      feeAmount: Number(Number(fee.fee).toFixed(8)),
      feeCurrency: Number(fee.fee) === 0 ? '' : normalizeCurrency(fee.asset),
      exchange: 'Kraken',
      date: new Date(buy.time)
    })

    processedRedifs.push(redif)
  }

  return result
}