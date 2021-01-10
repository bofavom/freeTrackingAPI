import xlsx from 'node-xlsx'

export default (xlsxBuffer) => {
  try {

    const parsedXlsx = xlsx.parse(xlsxBuffer)
    const rows = parsedXlsx[0].data
    const body = rows.slice(1, rows.length)
    
    const result = []
    
    for (let row of body) {
      const buyAmount = Number( Number(row[4]).toFixed(8) )
      const buyCurrency = row[1].slice(0, 3)
      const sellAmount = Number( Number(row[5]).toFixed(8) )
      const sellCurrency = row[1].slice(3, 6)
      const feeAmount = Number( Number(row[6]).toFixed(8) )
      const feeCurrency = row[7]
      const date = new Date(row[0])
      
      const buyAmountFee = buyCurrency === feeCurrency ? feeAmount : 0
      const sellAmountFee = sellCurrency === feeCurrency ? feeAmount : 0

      result.push({
        buyAmount: buyAmount - buyAmountFee,
        buyCurrency: buyCurrency,
        sellAmount: sellAmount + sellAmountFee,
        sellCurrency: sellCurrency,
        feeAmount: feeAmount,
        feeCurrency: feeCurrency,
        exchange: 'Binance',
        date: date
      })
    }

    return result
  } catch (err) {
    
  }
}