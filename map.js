// map.js

let map, markers = [];

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    map = L.map('map').setView([20, 0], 2); // Centered globally

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
});

// Function for Find Your Hotspots (leveraging sample data)
async function findHotspots() {
    const genre = document.getElementById('userGenre').value;
    if (!genre) {
        alert('Please select a genre');
        return;
    }

    // Sample hotspot data (replace with actual data)
    const hotspots = [
        { city: 'New York', coords: [40.7128, -74.0060] },
        { city: 'Los Angeles', coords: [34.0522, -118.2437] },
        { city: 'London', coords: [51.5074, -0.1278] },
        { city: 'Paris', coords: [48.8566, 2.3522] }
    ];

    // Remove previous markers
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    // Add markers to the map
    hotspots.forEach(hotspot => {
        const marker = L.marker(hotspot.coords)
            .addTo(map)
            .bindPopup(`<b>${hotspot.city}</b><br>Trending Genre: ${genre.charAt(0).toUpperCase() + genre.slice(1)}`);
        markers.push(marker); // Store the marker for future removal
    });
}

// Event listener for Hotspot form submission
document.getElementById('hotspotsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    findHotspots();
});
