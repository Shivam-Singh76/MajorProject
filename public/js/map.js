const map = L.map('map').setView([coordinates[1], coordinates[0]], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker with Popup — same as mam ka code
L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup(`<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`)
    .openPopup();