// Initialize the map and set its view to a default location
var map = L.map('map').setView([37.7749, -122.4194], 4); // Coordinates for San Francisco as an example

// Set up the tile layer (the background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Hotspot city data
var hotspots = [
    {city: "Los Angeles", lat: 34.0522, lon: -118.2437},
    {city: "New York", lat: 40.7128, lon: -74.0060},
    {city: "Austin", lat: 30.2672, lon: -97.7431}
];

// Add markers for each city
hotspots.forEach(function(hotspot) {
    var marker = L.marker([hotspot.lat, hotspot.lon]).addTo(map);
    marker.bindPopup(`<strong>${hotspot.city}</strong><br>Click to see top songs and artists.`);

    marker.on('click', function() {
        loadTrendingData(hotspot.city);
    });
});
