class Spotify {
  constructor() {
    this._token = '';
  }

  authorize() {
    const urlHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlHash.get('access_token');
    if (accessToken) {
      this._token = accessToken
    }
    else {
      window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=1b70f856b32049b5a8ab1fa5c4c354a6&scope=user-read-private&redirect_uri=http://localhost:3000/`;
    }
  }

  search(term) {
    this.authorize();
    return fetch(
      `https://api.spotify.com/v1/search?query=${term}&type=track&limit=5`,
      {headers: {
       'Authorization': 'Bearer ' + this._token
        }
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          console.log(track);
          return {
            songName: track.name,
            artistName: track.artists[0].name,
            albumName: track.album.name,
            id: track.id
          }
        })
      } else {
        console.log('Error in Spotify search!!');
        return [];
      }
    })
  }
}

export default Spotify;
