export default function timeStamper(thisMonth, thisDay) {
  let today = new Date()
  let timeStampArray = []
  let yearArray = []
  let datum = ''
  let year = today.getFullYear()
  let month = thisMonth.toString()
  let day = thisDay.toString()
  for (year; year > 2000; year - 1) {
    datum = Date.parse(month + '/' + day + '/' + year)
    yearArray.push(year)
    year -= 1
    timeStampArray.push(datum / 1000)
  }
  return timeStampArray
}
