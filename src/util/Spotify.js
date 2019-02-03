let accessToken;
let expiresIn;
const clientId = '1b70f856b32049b5a8ab1fa5c4c354a6';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    } else {
      let t = window.location.href.match(/access_token=([^&]*)/);
      let e = window.location.href.match(/expires_in=([^&]*)/);
      if(t) {
        accessToken = t[1];
        expiresIn = e[1]
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    }
  },

  savePlaylist(name, uris) {
    if(!name || !uris) {
      return;
    }
    //let token = accessToken;
    let headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return fetch(
      `https://api.spotify.com/v1/me`,
      {headers: headers}
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    }).then(userId => {
      fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({name: name})
        }
      ).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return jsonResponse.id;
      }).then(playlistId => {
        fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({"uris": uris})
          }
        )
      })
    })

  },

  search(term) {
    Spotify.getAccessToken()
    return fetch(
      `https://api.spotify.com/v1/search?type=track&query=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          console.log(track);
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
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
