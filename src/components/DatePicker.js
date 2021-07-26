import React, { Component } from 'react'

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
  }

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
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          <select
            className="picker"
            id="day-picker"
            placeholder="day"
            name="day"
            value={this.props.day}
            onChange={this.props.dayChange}
          >
            {dates.map((date) => {
              return <option value={date}>{date}</option>
            })}
          </select>
          <input id="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
