//-----------------------//
//-- Gère le diaporama --//
//-----------------------//

var tableauDiapositive = []; // Création du tableau qui sera remplie avec les instructions du diaporama
var instruction1 = Object.create(diapositive); // Création du diaporama
instruction1.initDiapositive("images/ImageDiaporama_01.jpg", "Montre les emplacement de station sur la carte", "Pour commencer, selectionnez une station sur la carte en cliquant sur un marqueur."); // Initiatlisation du diaporama
tableauDiapositive.push(instruction1);

var instruction2 = Object.create(diapositive);// Création du diaporama
instruction2.initDiapositive("images/ImageDiaporama_02.jpg", "Après avoir cliquer sur une stations, les informations de réservation s'affiches.", "Ensuite, si des vélos sont disponibles, appuyez sur 'Réservation'");// Initiatlisation du diaporama
tableauDiapositive.push(instruction2);

var instruction3 = Object.create(diapositive);// Création du diaporama
instruction3.initDiapositive("images/ImageDiaporama_03.jpg", "Après avoir cliqué sur le bouton de réservation, une boite de signature s'affiche, il ne vous reste plus qu'à signer.", "Pour finir, signez dans la case et appuyez sur 'Valider', vous avez 20 minutes pour récupérer votre vélo");// Initiatlisation du diaporama
tableauDiapositive.push(instruction3);



var diaporama = Object.create(creationDiaporama);
diaporama.initDiaporama(tableauDiapositive);



// Modification du diaporama avec les fleches du clavier
window.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
        case 37: //Fleche de gauche (retour en arrière sur le diaporama)
            diaporama.deplacementDiapo(-1);
            break;
        case 39: // Fleche droite (aller en avant sur le diaporama)
            diaporama.deplacementDiapo(1);
            break;
    }
});

// Modification du diaporama avec clic/bouton
var flecheGauche = document.getElementById("flecheGauche");
var flechDroite = document.getElementById("flecheDroite");
flecheGauche.addEventListener("click", function () {
    diaporama.deplacementDiapo(-1);
})
flechDroite.addEventListener("click", function () {
    diaporama.deplacementDiapo(1);
});


//-----------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------//


//----------------------------------------------------//
//-- Gère la carte(marqueur + données des stations) --//
//----------------------------------------------------//

var map;

var markers = [] //Tableau qui récupère tout les marqueurs

// Récupération des infos de toute les stations
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=YOURKEYHERE", function (reponse) {
    var stationsLyon = JSON.parse(reponse);
    stationsLyon.forEach(function (listeStations) {
        // Création de la station suivant avec les parametres de l'API JcDecaux
        var station = Object.create(stations);
        station.initStation(listeStations.number, listeStations.status, listeStations.address, listeStations.position, listeStations.bike_stands, listeStations.available_bike_stands, listeStations.available_bikes);

        // Placement du marqueur
        markers.push(station.placerMarqueur());

    })
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'images/m'
    });
});

// Permet de fermer la fenêtre d'infos
document.getElementById("close").addEventListener("click", function(){
    var fermetureInfo = document.getElementById("infosReservation");
    fermetureInfo.style.display = "none";
});

//-----------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------//


//-----------------------------------------------------------//
//-- Gère la partie réservation (signature avec le canvas) --//
//-----------------------------------------------------------//

//-- Affiche le canvas quand on appui sur le bouton de reservation de la station --//
document.getElementById("reservation").addEventListener("click", function () {
    // Ferme le cadre d'information de la station.//
    var fermetureInfo = document.getElementById("infosReservation");
    fermetureInfo.style.display = "none";
    contexte.clearRect(0, 0, 300, 150);
    var affichageCanvas = document.getElementById("blocSignature");
    affichageCanvas.style.display = "inline";
});

 //----- Création/init/signature -----//
//-----------------------------------//
var canvas = Object.create(canvasSignature);
var contexte = document.getElementById("canvas").getContext("2d");
canvas.initCanvas(0, 0, false);
canvas.signature(document.getElementById("canvas"), contexte);

 //----- Supression avec le bouton en dessous du canvas -----//
//----------------------------------------------------------//
var supression = document.getElementById("correctionSignature");
supression.addEventListener("click", function () {
    contexte.clearRect(0, 0, 300, 150);
});


//-----------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------//


//--------------------------------------------------------------//
//-- Gère la partie réservation une fois la signature validée --//
//--------------------------------------------------------------//

var messageGlobal = document.getElementById("messageReservation");
var messageValide = document.getElementById("messageReservationValide");
var messageMinutes = document.getElementById("minutes");
var messageSecondes = document.getElementById("secondes");
var stationReservationElt = sessionStorage.getItem("recuperationStation");
var validation = document.getElementById("accepterReservation");

var reservation = Object.create(stationReservation);
if (sessionStorage.lenght != 0) {
    if (sessionStorage.min >= 0 && sessionStorage.sec >= 0) {
        reservation.decompteReservation(sessionStorage.min, sessionStorage.sec);
    };
};

validation.addEventListener("click", function () {
    if (sessionStorage.length >= 3) {
        clearInterval(decompte);
        messageMinutes.textContent = 20;
        messageSecondes.textContent = 0;
        reservation.decompteReservation(messageMinutes.textContent, messageSecondes.textContent);
    }
    if (sessionStorage.length < 3) {
        messageMinutes.textContent = 20;
        messageSecondes.textContent = 0;
        reservation.decompteReservation(messageMinutes.textContent, messageSecondes.textContent);
    }
});
