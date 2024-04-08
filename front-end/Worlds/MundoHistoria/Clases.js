let ListaValoresTriangulos = [false, false, false, false, false, false, false, false];

class MoverTriangulos {
    constructor(figura, referencia, numeroObjetos) {
        this.figura = figura;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.Fijado = false;
        this.referencia = referencia;
        //En transformaciones obtengo la matriz de giro de cada div
        this.Transformaciones = this.ObtenerMatrizDeRotacion(referencia);
        console.log(this.Transformaciones);
        console.log(this.referencia);
        this.ModificadoRefX = false;
        this.ModificadoRefY = false;
        this.ModificarEscala = 0;
        this.Grado = 0;
        //Eventos
        this.figura.addEventListener('mousedown', this.iniciarArrastre.bind(this));
        this.figura.addEventListener('mousemove', this.arrastrar.bind(this));
        this.figura.addEventListener('mouseup', this.soltar.bind(this));
    }
    iniciarArrastre(evento) {
        if(!this.Fijado) {
            this.FiguraMoviendose = true;
            this.inicioX = evento.clientX - this.figura.getBoundingClientRect().left;
            this.inicioY = evento.clientY - this.figura.getBoundingClientRect().top;
            this.fijar();
        }
    }

    arrastrar(evento) {
        if (this.FiguraMoviendose) {
            const x = evento.clientX - this.inicioX;
            const y = evento.clientY - this.inicioY;
            this.figura.style.left = x + 'px';
            this.figura.style.top = y + 'px';
        }
    }

    soltar(borar) {
        if (borar == 1) {
            this.CrearDiv();
        }else this.FiguraMoviendose = false;
    }

    CompararRotacion(objeto, transform) {
        let Rotacion = window.getComputedStyle(objeto).getPropertyValue('transform');
        let Igual = true;
        
        if (Rotacion == "none") {
            Rotacion = ['1',' 0',' 0',' 1',' 0',' 0'];
        }else {
            Rotacion = Rotacion.substring(7, Rotacion.length - 1).split(',')
        }

        for (var i = 0; i < Rotacion.length; i++) {
            if (Rotacion[i] != transform[i]) {
                Igual = false;
            }
        }
        return Igual;
    }

    fijar() {
        //Declaración de variables
        let AyudaFijar = this.figura.getBoundingClientRect();
        let Fijar, Rotacion;

        for (let i = 0; i < this.referencia.length; i++) {
            Fijar = this.referencia[i].getBoundingClientRect();
            Rotacion = this.CompararRotacion(this.figura, this.Transformaciones[i]);
            
             // Condición
            if (AyudaFijar.left - 25 <= Fijar.left &&
                AyudaFijar.right + 25 >= Fijar.right &&
                AyudaFijar.top - 25 <= Fijar.top &&
                AyudaFijar.bottom + 25 >= Fijar.bottom 
                && Rotacion && !ListaValoresTriangulos[i]) {
                    this.figura.style.left = Fijar.left + 'px';
                    this.figura.style.top = Fijar.top + 'px'; 
                    this.figura.style.width = Fijar.width + 'px';
                    this.figura.style.height = Fijar.height + 'px';
                    this.Fijado = true;
                    ListaValoresTriangulos[i] = true;
                    this.soltar(1);
                    i = this.referencia.length;
            }
        }  
    }

    ModificarReflexion(sentido) {
        if (sentido == 'x') {
             if (!this.ModificadoRefX) {
                this.figura.style.transform = "scaleX(-1)";
                this.ModificadoRefX = true;
            }else {
                this.figura.style.transform = "scaleX(1)";
                this.ModificadoRefX = false;
            }
        }else {
            if (!this.ModificadoRefY) {
                this.figura.style.transform = "scaleY(-1)";
                this.ModificadoRefY = true;
            }else {
                this.figura.style.transform = "scaleY(1)";
                this.ModificadoRefY = false;
            }
        }
    }

    ModificarRotacion() {
        this.Grado += 180;
        this.figura.style.transform = `rotate(${this.Grado}deg)`;
    }

    ObtenerMatrizDeRotacion(ObjetoPorRevisar) {
        let Lista = [];
        for (var i = 0; i < ObjetoPorRevisar.length; i++) {
            let Ayuda = window.getComputedStyle(ObjetoPorRevisar[i]).getPropertyValue('transform');
            if (Ayuda == "none") {
                Lista.push(['1',' 0',' 0',' 1',' 0',' 0']);
            }else Lista.push(Ayuda.substring(7, Ayuda.length - 1).split(','));
        }
        return Lista;
    }

    CrearDiv() {
        let Div = document.createElement('div');
        let DivOriginal = document.getElementById('Mover');
        Div = DivOriginal.cloneNode(true);
        Div.id = ""; 
        Div.style.background = "rgb(118, 118, 118)"
        let body = document.body;
        //borro el div que ya estaba
        body.removeChild(DivOriginal);
        //Añado el div
        body.appendChild(Div); 
        jugando = false;
    }
}

class MoverInrotables extends MoverTriangulos {
    constructor(figura, referencias) {
        super(figura, referencias)
    }

    ModificarTamaño() {
        alert("Esta figura no acepta cambios de tamaño");
    }
}