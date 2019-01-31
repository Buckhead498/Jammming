import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TrackList from './components/TrackList/TrackList.js';
import Spotify from './util/Spotify.js';
import SearchBar from './components/SearchBar/SearchBar.js';

const Playlist = [
  {
    songName: "Stronger",
    artistName: "Britney Spears",
    albumName: "Oops!... I Did It Again",
    id: 6
  },
  {
    songName: "So Emotional",
    artistName: "Whitney Houston",
    albumName: "Whitney",
    id: 7
  },
  {
    songName: "It's Not Right But It's Okay",
    artistName: "Whitney Houston",
    albumName: "My Love Is Your Love",
    id: 8
  }
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistItems: []
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  handleTermChange(event) {
    this.setState({
      playlistName: event.target.value
    });
  }

  addSong(track) {
    let newList = this.state.playlistItems;
    newList.push({
      songName: track.songName,
      artistName: track.artistName,
      albumName: track.albumName,
      id: track.id
    });
    this.setState({
      playlistItems: newList
    })
  }

  removeSong(track) {
    let newList = this.state.playlistItems;
    let pos = this.state.playlistItems.map(function(t) { return t.id; }).indexOf(track.id);
    if (pos > -1) {
      newList.splice(pos, 1);
    }
    this.setState({
      playlistItems: newList
    })
  }

  searchSpotify(term) {
    const spotify = new Spotify();
    spotify.search(term).then(tracks => {
      this.setState({searchResults : tracks})
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <div className="SearchResults">
              <h2>Results</h2>
              <TrackList tracks={this.state.searchResults} clickAction={this.addSong} trackAction="+" />
            </div>
            <div className="Playlist">
              <input onChange={this.handleTermChange} value={this.state.playlistName} />
              <div className="TrackList">
                <TrackList tracks={this.state.playlistItems} clickAction={this.removeSong} trackAction="-" />
              </div>
              <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
