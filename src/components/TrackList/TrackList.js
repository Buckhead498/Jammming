import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js'

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track key={track.id} track={track} clickAction={this.props.clickAction} trackAction={this.props.trackAction}/>
          })
        }
      </div>
    );
  }
}

export default TrackList
