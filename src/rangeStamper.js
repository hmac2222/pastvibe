export default function timeStamper(thisMonth, thisDay) {
  let today = new Date();
  let offset = new Date().getTimezoneOffset;
  let timeStampArray = [];
  let yearArray = [];
  let datum = "";
  let year = today.getFullYear();
  let month = (thisMonth).toString();
  let day = (thisDay).toString();
  for (year; year > 2000; year - 1) {
    datum = (Date.parse(month + "/" + day + "/" + year));
    console.log(datum);
    yearArray.push(year);
    console.log(yearArray);
    year -= 1;
    timeStampArray.push((datum) / 1000);
  }
  return timeStampArray;
}