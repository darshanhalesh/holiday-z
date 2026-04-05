// Initialize map with free OpenStreetMap tiles (via Leaflet)
function initializeMap(elementId, coordinates, locationName, country) {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }

    // Ensure coordinates are in [lat, lng] format
    const [lng, lat] = Array.isArray(coordinates) && coordinates.length === 2 ? coordinates : [0, 0];
    const mapCoordinates = [lat, lng];

    // Initialize map
    const map = L.map(elementId).setView(mapCoordinates, 13);

    // Add OpenStreetMap tiles (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Add marker with popup
    const markerPopup = L.popup({
        offset: [0, -25],
        closeButton: true,
        maxWidth: 300
    })
        .setContent(`<strong>${locationName}</strong><br>${country}<p style="font-size: 12px; margin-top: 5px;">Exact location provided after booking!</p>`);

    const marker = L.marker(mapCoordinates, {
        title: locationName
    })
        .addTo(map)
        .bindPopup(markerPopup);

    // Show popup on hover
    marker.on('mouseover', function () {
        this.openPopup();
    });

    marker.on('mouseout', function () {
        this.closePopup();
    });

    // Click to open popup
    marker.on('click', function () {
        this.togglePopup();
    });

    return map;
}

// Function to initialize multiple maps on the page
function initializeAllMaps() {
    const mapElements = document.querySelectorAll('[data-map-id]');
    mapElements.forEach(element => {
        const mapId = element.getAttribute('data-map-id');
        const coordinates = JSON.parse(element.getAttribute('data-coordinates'));
        const location = element.getAttribute('data-location');
        const country = element.getAttribute('data-country');
        
        initializeMap(mapId, coordinates, location, country);
    });
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAllMaps);
