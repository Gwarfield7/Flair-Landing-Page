// api.js

// Function to get Spotify Access Token
async function getSpotifyAccessToken() {
    const client_id = 'c4e45c9ec966473c992886e1a4688cdd'; // Replace with your Spotify Client ID
    const client_secret = 'b6babaff28fd44f98c29d309a67e8d0f'; // Replace with your Spotify Client Secret

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        });

        // Check if the token request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
    }
}

// Function to fetch Spotify Playlists by genre
async function getSpotifyPlaylists(genre) {
    try {
        const token = await getSpotifyAccessToken();

        // Search for a playlist using genre
        const response = await fetch(`https://api.spotify.com/v1/search?q=${genre} playlist&type=playlist&limit=1`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        // Check if the playlist request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();

        // If a playlist is found, return the first one
        if (data.playlists.items.length > 0) {
            return data.playlists.items[0].external_urls.spotify; // Return the playlist URL
        } else {
            console.warn(`No playlists found for genre: ${genre}`);
            return null; // No playlist found
        }
    } catch (error) {
        console.error('Error fetching Spotify playlists:', error);
    }
}

// Function to get a playlist for a city with a fallback option
async function getCityPlaylist(genre) {
    const playlistURL = await getSpotifyPlaylists(genre);

    // Fallback playlist if no genre-specific playlist is found
    if (!playlistURL) {
        return 'https://open.spotify.com/playlist/trending'; // Fallback to a trending playlist or any default one
    }

    return playlistURL; // Return the genre-specific playlist
}
