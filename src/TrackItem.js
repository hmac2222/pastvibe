import React, { Component } from 'react';

class TrackItem extends Component {
    state = {}
    render() {
        return (
            <li className="track-item">
                <div className="track-date">{this.props.date}</div>
                <img height="36px" src={this.props.image} />
                <div className="track-text">{this.props.artist} - {this.props.name}</div>
            </li>
        );
    }
}

export default TrackItem;