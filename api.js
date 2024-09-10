// api.js
async function getSpotifyAccessToken() {
    const client_id = 'c4e45c9ec966473c992886e1a4688cdd';
    const client_secret = 'b6babaff28fd44f98c29d309a67e8d0f';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function getSpotifyPlaylists(genre) {
    const token = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${genre}&type=playlist&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    return data.playlists.items[0].external_urls.spotify; // Returns the first playlist link
}
