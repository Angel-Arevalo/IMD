class MoverCuadrados {
    constructor(figura, referencia) {
        this.figura = figura;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.Fijado = false;
        this.referencia = referencia;
        this.Rotacion = false;
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

    soltar() {
        this.FiguraMoviendose = false;
    }

    fijar() {
        //Declaración de variables
        let AyudaFijar = this.figura.getBoundingClientRect();
        let Fijar;

        for (let i = 0; i < this.referencia.length; i++) {
            Fijar = this.referencia[i].getBoundingClientRect();
            
             // Condición
            if (AyudaFijar.left - 25 <= Fijar.left &&
                AyudaFijar.right + 25 >= Fijar.right &&
                AyudaFijar.top - 25 <= Fijar.top &&
                AyudaFijar.bottom + 25 >= Fijar.bottom 
                && this.Rotacion && !posicionesCuadrados[i]) {
                    this.figura.style.left = Fijar.left + 'px';
                    this.figura.style.top = Fijar.top + 'px'; 
                    this.figura.style.width = Fijar.width + 'px';
                    this.figura.style.height = Fijar.height + 'px';
                    this.Fijado = true;
                    posicionesCuadrados[i] = true;
                    let background = window.getComputedStyle(this.referencia[i]).getPropertyValue('background');
                    this.CrearDiv(background.substring(0, background.indexOf(')') + 1), this.referencia[i]);
                    this.soltar();
                    i = this.referencia.length;
            }
        }  
    }

    ModificarRotacion() {
        this.figura.style.transform = "matrix(0.6, 0.8, -0.8, 0.6, 0, 0)";
        this.Rotacion = true
    }

    CrearDiv(background, referencia) {
        let Div = referencia;
        let DivOriginal = document.getElementById('Mover');
        Div.style.background = `${ListaBackground(background)}`;
        let body = document.body;
        //borro el div que ya estaba
        body.removeChild(DivOriginal);
        jugando = false;

        function ListaBackground(background) {
            let lista = [], ayuda, i = 0;
            let recorte = background.substring(4, background.length - 1) + ',';

            while (i < 3) {
                ayuda = recorte.substring(0, recorte.indexOf(','));
                recorte = recorte.substring(recorte.indexOf(',') + 2);
                lista.push(parseFloat(ayuda) - 50)
                i++;
            }
            return `rgb(${lista[0]}, ${lista[1]}, ${lista[2]})`;
        }
    }
}