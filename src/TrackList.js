import React, { Component } from 'react';
import TrackItem from './TrackItem.js'

class TrackList extends Component {

    /*constructor() {
        super(props);
        state = {
            numberOfTracks: 0
        }
    } */
    componentDidMount(trackArray) {
        if (trackArray) { this.setState({ numberOfTracks: trackArray.length }) }
    }
    trackSorter(result) {
        let sorted = result.sort(function (a, b) {
            return b ? (b.date.uts - a.date.uts) : null;
        })
        return sorted;

    }

    findYear = (inputDate) => {
        let myDate = new Date(inputDate);
        let year = myDate.getFullYear();
        return year;
    }

    findMonth = (inputDate) => {
        let myDate = new Date(inputDate);
        let month = myDate.getMonth();
        return month;
    }

    timeZoneFixer = (dateText) => {
        let utcDate = Date.parse((dateText + "UTC"));
        var localDate = new Date(utcDate);
        return Date.parse(localDate);
    }

    render() {
        let myTracks = (this.props.tracks);
        let trackArray = [];
        let goodTrackArray = [];

        trackArray = myTracks.map((el, i) => {
            return el ? el.track : null;
        });

        goodTrackArray = trackArray.filter(function (el) {
            return el.length > 0;
        })

        let result = this.trackSorter([].concat.apply([], goodTrackArray))



        return (
            <>
                {/* }<h1>{this.state.numberOftracks} tracks! </h1> */}
                <ul className="track-list">
                    {result.map((track) => {
                        return <TrackItem
                            image={track.image[1]["#text"]}
                            date={this.timeZoneFixer(track.date["#text"])}
                            artist={track.artist["#text"]}
                            name={track.name} />
                    })}
                </ul>
            </>
        )

            ;
    }
}
export default TrackList;