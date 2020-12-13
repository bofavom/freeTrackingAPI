export default (csv) => {
  const lines = csv.split('\n')
  const body = lines.slice(1, lines.length)
  
  const normalize = (string) => string.replaceAll('"', '')
  
  const result = []
  
  for (let line of body) {
    const rows = line.split(',')
    if (!line.length > 0) continue

    result.push({
      buyAmount: normalize(rows[1]),
      buyCurrency: normalize(rows[2]),
      sellAmount: normalize(rows[3]),
      sellCurrency: normalize(rows[4]),
      feeAmount: normalize(rows[5]),
      feeCurrency: normalize(rows[6]),
      exchange: normalize(rows[7]),
      date: new Date(normalize(rows[10]))
    })
  }

  return result
}