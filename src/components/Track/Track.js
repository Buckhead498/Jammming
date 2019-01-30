import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.clickAction(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.songName}</h3>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        <a className="Track-action" onClick={this.handleClick}>{this.props.trackAction}</a>
      </div>
    );
  }
}

export default Track
