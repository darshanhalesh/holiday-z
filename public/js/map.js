const map = L.map('map').setView(list.geometry.coordinates.reverse(), 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const popup = L.popup({ offset: [0, -25], closeButton: false, closeOnClick: false, maxWidth: "300px" })
    .setLatLng(list.geometry.coordinates)
    .setContent(`<strong>${list.location}, ${list.country}</strong><p>Exact location provided after booking!</p>`);

const marker = L.marker(list.geometry.coordinates)
    .addTo(map)
    .bindPopup(popup);

marker.on('mouseover', function (e) {
    this.openPopup();
});

marker.on('mouseout', function (e) {
    this.closePopup();
});
