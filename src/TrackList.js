import React, { Component } from 'react';
import TrackItem from './TrackItem.js'

class TrackList extends Component {
    render() {
        let myTracks = (this.props.tracks);
        let trackArray = [];
        let goodTrackArray = [];

        trackArray = myTracks.map((el, i) => {
            return el.track;
        });

        goodTrackArray = trackArray.filter(function (el) {
            return el.length > 0;
        })

        let result = [].concat.apply([], goodTrackArray)

        return (
            <ul className="track-list">
                {result.map((track) => {
                    return <TrackItem image={track.image[1]["#text"]} date={track.date["#text"]} artist={track.artist["#text"]} name={track.name} />
                })}
            </ul>
        )

            ;
    }
}
export default TrackList;