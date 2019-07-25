// Objet canvas //
var canvasSignature = {
    initCanvas: function (positionX, positionY, tracer) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.tracer = tracer;
    },

    signature: function signatureClick(cible, contexte) {
        this.cible = cible;
        this.contexte = contexte;
        // ---------------------------------------------------------------------- //
        // Les 3 evenements necessaires à la signature avec le clic de la souris //
        // ---------------------------------------------------------------------- //
        this.cible.addEventListener('mousedown', function PremierPointSouris(e) {
            this.tracer = true;
            x = e.offsetX;
            y = e.offsetY;
            contexte.beginPath();
            contexte.lineWidth = 1.5;
            contexte.moveTo(x, y);
        });


        this.cible.addEventListener('mousemove', function mouvementSouris(e) {
            if (this.tracer) {
                x = e.offsetX;
                y = e.offsetY;
                contexte.lineTo(x, y);
                contexte.stroke();
            }
        });


        this.cible.addEventListener('mouseup', function RelacherClick() {
           if (this.tracer) {
            this.tracer = false;
            }
        });


        // --------------------------------------------------- //
        // Les 3 evenements necessaires à la signature tactile //
        // --------------------------------------------------- //
        // Tableau necessaire pour stocker les positions de la souris //
        var tableauTactile = [];


        this.cible.addEventListener("touchstart", function PremierPointTactile(evt) {
            evt.preventDefault();
            var contexte = document.getElementById("canvas").getContext("2d");
            var touches = evt.changedTouches;
            var offSet = evt.touches[0];
            for (var i = 0; i < touches.length; i++) {
                tableauTactile.push(touches[i]);
                contexte.lineTo(touches[i].pageX - offSet.target.offsetLeft, touches[i].pageY - offSet.target.offsetTop);
            };
        });


        this.cible.addEventListener("touchmove", function MouvementDoigt(evt) {
            var touches = evt.changedTouches;
            var offSet = evt.touches[0];
            contexte.lineWidth = 1.5;
            for (var i = 0; i < touches.length; i++) {
                contexte.beginPath();
                contexte.moveTo(tableauTactile[0].pageX - offSet.target.offsetLeft, tableauTactile[0].pageY - offSet.target.offsetTop);
                contexte.lineTo(touches[i].pageX - offSet.target.offsetLeft, touches[i].pageY - offSet.target.offsetTop);
                contexte.closePath();
                contexte.stroke();
                // Ajoute le dernier point tracé dans le tableauTactile //
                tableauTactile.splice(0, 1, touches[i]);
            };
        });


        this.cible.addEventListener("touchend", function RelacherDoigt(evt) {
            evt.preventDefault();
            var contexte = document.getElementById("canvas").getContext("2d");
            var touches = evt.changedTouches;
            contexte.lineWidth = 1.5;
            for (var i = 0; i < touches.length; i++) {
                contexte.beginPath();
                contexte.moveTo(tableauTactile[i].pageX, tableauTactile[i].pageY);
                contexte.lineTo(touches[i].pageX, touches[i].pageY);
                // Efface tableauTactile //
                tableauTactile.splice(i, 1);
            };
        });
    }
};
