let form = document.querySelector("form");
let postal = document.getElementById("code");
let adresse = document.getElementById("adresse");

// Fonction d'initialisation de la carte
function createMap(coor) {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    let macarte = L.map('map').setView(coor, 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      // Il est toujours bien de laisser le lien vers la source des données
      attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(macarte);
    
    L.marker(coor).addTo(macarte);
}


form.addEventListener("submit",async (e) => {
  e.preventDefault();
  let res = (await( await fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse.value}&postcode=${postal.value}`)).json()).features[0].geometry.coordinates.reverse();
  createMap(res);
});