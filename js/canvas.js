// Objet canvas //
var canvasSignature = {
    initCanvas: function (positionX, positionY, tracer) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.tracer = tracer;
    },

    signature: function signatureClick(cible) {
        this.cible = cible;
        // ---------------------------------------------------------------------- //
        // Les 3 evenements necessaires à la signature avec le click de la souris //
        // ---------------------------------------------------------------------- //
        // Mouvement de la souris //
        this.cible.addEventListener('mousemove', mouvementSouris, false);
        // click qui garde sont état si l'on reste appuyer sur le bouton de la souris //
        this.cible.addEventListener('mousedown', clickSouris, false);
        // evenement qui intervient au moment ou l'on relache le clic de la souris //
        this.cible.addEventListener('mouseup', stopClickSouris, false);


        // --------------------------------------------------- //
        // Les 3 evenements necessaires à la signature tactile //
        // --------------------------------------------------- //
        // Mouvement du doigt sur la surface tactile //
        this.cible.addEventListener("touchmove", mouvementDoigt, false);
        // Evenement pour le premier point de signature //
        this.cible.addEventListener("touchstart", appuiTactile, false);
        // Evenement quand on relache le doigt //
        this.cible.addEventListener("touchend", stopAppuiTactile, false);

    }
};
