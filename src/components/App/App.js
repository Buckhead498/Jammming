import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: ''
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push({
      name: track.name,
      artist: track.artist,
      album: track.album,
      id: track.id
    });
    this.setState({
      playlistTracks: this.state.playlistTracks
    })
  }

  removeTrack(track) {
    let newList = this.state.playlistTracks;
    let pos = this.state.playlistTracks.map(function(t) { return t.id; }).indexOf(track.id);
    if (pos > -1) {
      newList.splice(pos, 1);
    }
    this.setState({
      playlistTracks: newList
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(tracks => {
      this.setState({searchResults : tracks})
    });
  }

  savePlaylist(name) {
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    })
    Spotify.savePlaylist(name, trackURIs);
    this.setState = {
      playlistName: 'New Playlist',
      playlistTracks: []
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false}/>
            <Playlist onSave={this.savePlaylist} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
