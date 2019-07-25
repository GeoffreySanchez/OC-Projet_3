// Objet compte à rebours //
var stationReservation = {
    decompteReservation: function (min, sec) {
        this.minutes = min;
        this.secondes = sec;
        var compteurMinutes = this.minutes;
        var compteurSecondes = this.secondes;

        // Gère le retrait du canvas et l'affichage du message de réservation //
        var fermetureCanvas = document.getElementById("blocSignature");
        var cleanMessageReservation = document.getElementById("messageReservation");
        var affichageDecompte = document.getElementById("messageReservationValide");
        var stationReservation = document.getElementById("stationReservation");
        var stationReservationElt = sessionStorage.getItem("recuperationStation");
        stationReservation.textContent = stationReservationElt;
        affichageDecompte.style.display = "block";
        fermetureCanvas.style.display = "none";
        cleanMessageReservation.style.display = "none";


        decompte = setInterval(function () {
            // Si le compte à rebours est a 0 minute et 0 seconde, stop le setInterval et modifie le message de réservation //
            if (compteurSecondes <= 0 && compteurMinutes <= 0) {
                clearInterval(decompte);
                messageGlobal.textContent = "Votre réservation à la station " + stationReservationElt + " est expirée.";
                messageGlobal.style.display = "block";
                messageValide.style.display = "none";
                sessionStorage.setItem("fin", messageGlobal.textContent);
            };
            // Decompte 1 seconde si on est supérieur à 1 seconde et enregistre dans le session storage les minutes et secondes restantes //
            if (compteurSecondes >= 1) {
                compteurSecondes = compteurSecondes - 1;
                messageSecondes.textContent = compteurSecondes;
                messageMinutes.textContent = compteurMinutes;
                sessionStorage.setItem("sec", messageSecondes.textContent);
                sessionStorage.setItem("min", messageMinutes.textContent);
            };
            if (compteurSecondes <= 0) {
                // le decompte de seconde se fige à 0 si les minutes sont a 0 //
                if (compteurMinutes <= 0) {
                    compteurSecondes = 0;
                    messageSecondes.textContent = compteurSecondes;
                    // S'il nous reste des minutes et que nos secondes sont à 0, les secondes passent a 59  et on enregistre dans le sessionStorage les minutes et les secondes //
                } else {
                    compteurSecondes = 59;
                    compteurMinutes = compteurMinutes - 1;
                    messageSecondes.textContent = compteurSecondes;
                    messageMinutes.textContent = compteurMinutes;
                    sessionStorage.setItem("sec", messageSecondes.textContent);
                    sessionStorage.setItem("min", messageMinutes.textContent);
                }
            };
            // l'interval entre chaque appel de la fonction est de 1000ms/1s //
        }, 1000)

    }
};
