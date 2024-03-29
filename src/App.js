import React, { Component } from 'react'
import './App.scss'
import TrackList from './TrackList'
import rangeStamper from './rangeStamper'
import ErrorBoundary from './ErrorBoundary'
import DatePicker from './components/DatePicker'

class App extends Component {
  constructor(props) {
    let dateObj = new Date()

    super(props)
    this.state = {
      hasError: false,
      username: '',
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
      numDays: 31,
      timeStamps: [],
      tracks: [],
      filteredTracks: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    console.error(error, info)
  }

  handleChange(event) {
    this.setState({ username: event.target.value })
    this.setState({
      timeStamps: rangeStamper(this.state.month, this.state.day)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ tracks: [] })
    let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.username}&api_key=6c81046f1210891db3f2f16a73a893c7&format=json`
    for (let i = 0; i < this.state.timeStamps.length; i++) {
      fetch(
        url +
          '&from=' +
          this.state.timeStamps[i] +
          '&to=' +
          (this.state.timeStamps[i] + 86400)
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          let joined = this.state.tracks.concat(data.recenttracks)
          this.setState({ tracks: joined })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  handleMonthChange = (event) => {
    event.preventDefault()
    let myMonth = event.target.value
    let numberDays = 0
    switch (myMonth) {
      case '1':
      case '3':
      case '5':
      case '7':
      case '8':
      case '10':
      case '12':
        numberDays = 31
        break
      case '2':
        numberDays = 29
        break
      case '4':
      case '6':
      case '9':
      case '11':
        numberDays = 30
        break
      default:
        numberDays = 0
        break
    }
    this.setState({ numDays: numberDays })

    this.setState({ tracks: [] })
    this.setState({ month: myMonth })
    this.setState({ timeStamps: rangeStamper(myMonth, this.state.day) })
  }

  handleDayChange = (event) => {
    event.preventDefault()
    let myDay = event.target.value
    this.setState({ tracks: [] })
    this.setState({ day: myDay })
    this.setState({ timeStamps: [] })
    this.setState({ timeStamps: rangeStamper(this.state.month, myDay) })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="logo-text">Pastvibe</h1>
        </div>
        <h4 className="subheader">
          Listen to the music you played "on this day" over the years using your
          Last.fm scrobbled history:
        </h4>
        <div className="user-search">
          <form onSubmit={this.handleSubmit}>
            <input
              className="search-bar"
              type="text"
              placeholder="Last.fm Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            ></input>
            <input id="submit-button" type="submit" value="Submit" />
          </form>
        </div>
        <div id="track-wrapper">
          <ErrorBoundary>
            <TrackList tracks={this.state.tracks} />
          </ErrorBoundary>
        </div>

        <DatePicker
          month={this.state.month}
          day={this.state.day}
          monthChange={this.handleMonthChange}
          dayChange={this.handleDayChange}
          submit={this.handleSubmit}
          username={this.state.username}
          numDays={this.state.numDays}
        />
      </div>
    )
  }
}

export default App
