// Affichage map //
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 45.757171,
            lng: 4.836751
        },
        zoom: 12
    });
};

// Objet stations //
var stations = {
    // initialise les stations avec les données récupérés par l'appel AJAX de l'API JCDecaux //
    initStation: function (numero, status, adresse, position, total, dispo, velo) {
        this.numero = numero;
        this.status = status;
        this.adresse = adresse;
        this.position = position;
        this.total = total;
        this.dispo = dispo;
        this.velo = velo;
    },
    placerMarqueur: function () {
        // Modifie la couleur du marqueur en fonction de l'état de la station //
        var couleurMarqueurs;
        // Si la station est fermée, le marqueur sera rouge //
        if (this.status === "CLOSED") {
            couleurMarqueurs = "red-dot";
        } else if (this.status === "OPEN") {
            // Si la station a des vélos disponibles, le marqueur sera vert //
            if (this.velo > 0) {
                couleurMarqueurs = "green-dot";
                // Si la station est ouverte mais qu'il n'y a pas de vélo disponible, le marqueur sera orange //
            } else if (this.velo <= 0) {
                couleurMarqueurs = "orange-dot";
            }
        };
        // Créé le marqueur sur la google map //
        var marqueur = new google.maps.Marker({
            position: new google.maps.LatLng(this.position.lat, this.position.lng),
            map: map,
            icon: "images/" + couleurMarqueurs + ".png",
            number: this.numero
        });
        // Affichage des infos de la stations rafraichie à chaque click.
        marqueur.addListener('click', function () {
            ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + this.number + "?contract=Lyon&apiKey=YOURKEYHERE", function (stationClick) {
                var stationsClick = JSON.parse(stationClick);
                var clickStation = document.getElementById("infosReservation");
                var reservationBtn = document.getElementById("reservation");
                document.getElementById("adresseInfo").textContent = stationsClick.address;
                document.getElementById("placeTotal").textContent = stationsClick.bike_stands;
                document.getElementById("placeDispo").textContent = stationsClick.available_bike_stands;
                document.getElementById("veloDispo").textContent = stationsClick.available_bikes;
                // Affichage du cadre d'info //
                clickStation.style.display = "inline";
                if (stationsClick.available_bikes <= 0) {
                    // Cache le bouton "réservation" s'il n'y a pas de vélo disponible à la station //
                    reservationBtn.style.display = "none";
                } else if (stationsClick.available_bikes > 0) {
                    // Affiche le bouton "réservation" si des vélos sont disponibles à la station //
                    reservationBtn.style.display = "inline";
                }
                var recuperationNomStation = document.getElementById("accepterReservation");
                var stationReservation = document.getElementById("stationReservation");
                recuperationNomStation.addEventListener("click", function () {
                    // Sauvegarde de la station selectionné dans le sessionStorage //
                    sessionStorage.setItem("recuperationStation", stationsClick.address);
                    // Modification du texte de réservation avec la station qui a été selectionnée //
                    stationReservation.textContent = stationsClick.address;
                });
            });
        })
        return marqueur;
    }
};
