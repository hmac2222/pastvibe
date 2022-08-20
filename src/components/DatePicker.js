import React, { Component } from 'react'

export default class DatePicker extends Component {

  render() {
    const dates = []

    for (var i = 1; i <= this.props.numDays; i++) {
      dates.push(i)
    }

    return (
      <div id="another-day">
        Pick Another Day:
        <form id="date-picker" onSubmit={this.props.submit}>
          <select
            className="picker"
            id="month-picker"
            placeholder="month"
            name="month"
            value={this.props.month}
            onChange={this.props.monthChange}
          >
            <option key="1" value="1">Jan</option>
            <option key= "2" value="2">Feb</option>
            <option key= "3" value="3">Mar</option>
            <option key= "4" value="4">Apr</option>
            <option key= "5" value="5">May</option>
            <option key= "6" value="6">Jun</option>
            <option key= "7" value="7">Jul</option>
            <option key= "8" value="8">Aug</option>
            <option key= "9" value="9">Sep</option>
            <option key= "10" value="10">Oct</option>
            <option key= "11" value="11">Nov</option>
            <option key= "12" value="12">Dec</option>
          </select>
          <select
            className="picker"
            id="day-picker"
            placeholder="day"
            name="day"
            value={this.props.day}
            onChange={this.props.dayChange}
          >
            {dates.map((date, index) => {
              return <option key={index} value={date}>{date}</option>
            })}
          </select>
          <input id="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
