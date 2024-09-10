// This function gets city location data from OpenStreetMap's Nominatim API
async function getCityLocation() {
    // Get the city input from the user
    const city = document.getElementById('userCity').value;
    
    // Ensure that the user entered a city name
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    // Fetch city data from Nominatim API
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);

    // Parse the response into a JSON object
    const data = await response.json();

    // Check if any result is found
    if (data.length > 0) {
        const cityInfo = data[0]; // The first result is usually the most relevant
        document.getElementById('city-results').innerHTML = `
            <li><strong>City Name:</strong> ${cityInfo.display_name}</li>
            <li><strong>Latitude:</strong> ${cityInfo.lat}</li>
            <li><strong>Longitude:</strong> ${cityInfo.lon}</li>
            <li><strong>Type:</strong> ${cityInfo.type}</li>
        `;
    } else {
        document.getElementById('city-results').innerHTML = `<li>No results found for ${city}</li>`;
    }
}
