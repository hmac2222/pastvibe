import React, { Component } from 'react';
import './App.scss';
import TrackList from './TrackList.js';
import rangeStamper from './rangeStamper.js';
import ErrorBoundary from './ErrorBoundary.js'

class App extends Component {
  constructor(props) {
    let dateObj = new Date();
    console.log(dateObj.getMonth() + 1);

    super(props);
    this.state = {
      hasError: false,
      username: "",
      month: (dateObj.getMonth() + 1),
      day: (dateObj.getDate()),
      timeStamps: [],
      tracks: [],
      filteredTracks: []

    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  handleChange(event) {
    console.log(rangeStamper(this.state.month, this.state.day));
    this.setState({ username: event.target.value });
    console.log("this.state.username was set:" + this.state.username);
    this.setState({ timeStamps: rangeStamper(this.state.month, this.state.day) });

  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Button Clicked!");
    this.setState({ tracks: [] });
    let url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.username}&api_key=6c81046f1210891db3f2f16a73a893c7&format=json`
    for (let i = 0; i < this.state.timeStamps.length; i++) {
      fetch(url + "&from=" + (this.state.timeStamps[i] - 21600) + "&to=" + ((this.state.timeStamps[i] - 21600) + 86400))
        .then(res => {
          console.log("reached out");
          return res.json();
        })
        .then(data => {
          console.log("tracks added");
          let joined = this.state.tracks.concat(data.recenttracks);
          this.setState({ tracks: joined });
        })
    }
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Pastvibe</h1>
        </div>
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

        <div id="another-day">Pick Another Day:
        <select
            className="picker"
            id="month-picker"
            placeholder="month"
            name="month"
            value={this.state.month}
          >
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">Mar</option>
            <option value="04">Apr</option>
            <option value="05">May</option>
            <option value="06">Jun</option>
            <option value="07">Jul</option>
            <option value="08">Aug</option>
            <option value="09">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          <select
            className="picker"
            id="day-picker"
            placeholder="day"
            name="day"
            value={this.state.day}
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    );
  }
}

export default App;
