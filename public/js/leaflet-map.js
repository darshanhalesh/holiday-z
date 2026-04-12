// Initialize map with free OpenStreetMap tiles (via Leaflet)
function initializeMap(elementId, coordinates, locationName, country) {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }

    const mapElement = document.getElementById(elementId);
    if (!mapElement) {
        console.error(`Map element with id "${elementId}" not found`);
        return;
    }

    // Ensure coordinates are in [lat, lng] format
    const [lng, lat] = Array.isArray(coordinates) && coordinates.length === 2 ? coordinates : [0, 0];
    const mapCoordinates = [lat, lng];

    try {
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

        console.log('Map initialized successfully for', locationName);
        return map;
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Function to initialize multiple maps on the page
function initializeAllMaps() {
    const mapElements = document.querySelectorAll('[data-map-id]');
    
    if (mapElements.length === 0) {
        console.log('No map elements found on this page');
        return;
    }

    mapElements.forEach(element => {
        const mapId = element.getAttribute('data-map-id');
        const coordinatesStr = element.getAttribute('data-coordinates');
        const location = element.getAttribute('data-location');
        const country = element.getAttribute('data-country');
        
        try {
            const coordinates = JSON.parse(coordinatesStr);
            initializeMap(mapId, coordinates, location, country);
        } catch (error) {
            console.error('Error parsing coordinates:', error, coordinatesStr);
        }
    });
}

// Initialize maps when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllMaps);
} else {
    // DOM is already loaded
    initializeAllMaps();
}
