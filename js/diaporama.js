// Objet diapositive //
var diapositive = {
    initDiapositive: function (image, alt, message) {
        this.image = image;
        this.alt = alt;
        this.message = message;
    },
};
// Objet diaporama //
var creationDiaporama = {

    initDiaporama: function(tableauDiapositive){
        this.tableau = tableauDiapositive;
        this.initDeplacement = 0;
    },

    deplacementDiapo: function (deplacement){
         this.initDeplacement = this.initDeplacement + deplacement;
        if (this.initDeplacement == this.tableau.length){
            this.initDeplacement = 0;
        }
        if (this.initDeplacement === -1){
            this.initDeplacement = this.tableau.length - 1;
        }
        // Modification de la source de l'image après le déplacement //
        document.getElementById("modificationImage").src = this.tableau[this.initDeplacement].image;
        // Modification de l'alt de l'image après le déplacement //
        document.getElementById("modificationImage").alt = this.tableau[this.initDeplacement].alt;
        // Modification du message après le déplacement //
        document.getElementById("messageHabillageImage").textContent = this.tableau[this.initDeplacement].message;
    }
};
