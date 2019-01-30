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
      playlistItems: Playlist
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.addSong = this.addSong.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  handleTermChange(event) {
    this.setState({
      playlistName: event.target.value
    });
  }

  addSong(track) {
    this.state.playlistItems.push({
      songName: track.name,
      key: track.key
    });
  }

  searchSpotify(term) {
    let token = 'BQBenMUc3nOXXD5O1foCjP_sH1X1rHvms-k1ymY0DMTfnGTFZm9qKyUMXJKfWQRSVqkqL84P2ar_DrJN2KUdqeO0oWTY-_pjObMXaOnej37OxMf8TMt0k5yVfbz2-WeVMjDHfGsbq6ABGfbX08bPHc3bD9r3';
    const spotify = new Spotify();
    spotify.search(term, token).then(tracks => {
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
                <TrackList tracks={Playlist} trackAction="-" />
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
