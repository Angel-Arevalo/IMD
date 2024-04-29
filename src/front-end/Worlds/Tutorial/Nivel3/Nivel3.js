let NomFigu = "", grados = 0, contar = 0;
var Mensaje = localStorage.getItem('mensaje');
//Funciones necesarias
addEventListener('load', function() {
    if (Mensaje == "1") {
        this.localStorage.setItem('Nombre','');
        localStorage.setItem('mensaje','0');
    }else if(Mensaje == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
})
let P,S,T,C,Q;
P = false;//Primera
S = false;//Segunda
C = false;//Cuarta
T = false;//Tercera
Q = false;//Quinta
class Move {
    constructor(figura) {
        this.figura = figura;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.Fijado = false;
        this.Degree = 0;
        //Eventos
        this.figura.addEventListener('mousedown', this.iniciarArrastre.bind(this));
        this.figura.addEventListener('mousemove', this.arrastrar.bind(this));
        this.figura.addEventListener('mouseup', this.soltar.bind(this));
        //figuras
        this.PrimeraL = document.getElementById('PrimeraL').getBoundingClientRect();
        this.SegundaL = document.getElementById('SegundaL').getBoundingClientRect();
        this.TerceraL = document.getElementById('TerceraL').getBoundingClientRect();
        this.CuartaL = document.getElementById('CuartaL').getBoundingClientRect();
        this.QuintaL = document.getElementById('QuintaL').getBoundingClientRect();
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
        const Ele = this.figura.getBoundingClientRect();
        const Degree = this.ObtenerAngulo(this.figura);
        //Condiciones para fijar la figura
        if (Ele.left - 25 <= this.PrimeraL.left &&
            Ele.right + 25 >= this.PrimeraL.right &&
            Degree == 90 && !P) {
                this.figura.style.left = this.PrimeraL.left + 'px';
                this.figura.style.top = this.PrimeraL.top + 'px';
                this.InicioX = this.PrimeraL.left;
                this.InicioY = this.PrimeraL.top;
                P = true;
                contar += 1;
                this.Fijado = true;
                this.soltar();
            }
        if (Ele.left - 25 <= this.SegundaL.left &&
             Ele.right + 25 >= this.SegundaL.right &&
            Degree == 90 && !S) {
                this.figura.style.left = this.SegundaL.left + 'px';
                this.figura.style.top = this.SegundaL.top + 'px';
                this.InicioX = this.SegundaL.left;
                this.InicioY = this.SegundaL.top;
                S = true;
                contar += 1;
                this.Fijado = true;
                this.soltar();
            }
        if (Ele.left - 25 <= this.TerceraL.left &&
            Ele.right + 25 >= this.TerceraL.right &&
            Degree == 0 && !T) {
                this.figura.style.left = this.TerceraL.left + 'px';
                this.figura.style.top = this.TerceraL.top + 'px';
                this.InicioX = this.TerceraL.left;
                this.InicioY = this.TerceraL.top;
                T = true;
                contar += 1;
                this.Fijado = true;
                this.soltar();
            }
        if (Ele.left - 25 <= this.CuartaL.left &&
            Ele.right + 25 >= this.CuartaL.right &&
            Degree == 0 && !C) {
                this.figura.style.left = this.CuartaL.left + 'px';
                this.figura.style.top = this.CuartaL.top + 'px';
                this.InicioX = this.CuartaL.left;
                this.InicioY = this.CuartaL.top;
                C = true;
                contar += 1;
                this.Fijado = true;
                this.soltar();
            }
        if (Ele.left - 25 <= this.QuintaL.left &&
            Ele.right + 25 >= this.QuintaL.right &&
            Degree == 270 && !Q) {
                this.figura.style.left = this.QuintaL.left + 'px';
                this.figura.style.top = this.QuintaL.top + 'px';
                this.InicioX = this.QuintaL.left;
                this.InicioY = this.QuintaL.top;
                Q = true;
                contar += 1;
                this.Fijado = true;
                this.soltar();
            }
    }

    ObtenerAngulo(Elemento) {
        let Propiedades = window.getComputedStyle(Elemento);

        let PropiedadTrasnform = Propiedades.getPropertyValue('transform');
        if(PropiedadTrasnform != "none") {
            let valores = PropiedadTrasnform.split('(')[1].split(')')[0].split(',');
            let a = valores[0];
            let b = valores[1];
            let angulo = Math.round(Math.atan2(b, a) * (180/Math.PI));
            return angulo >= 0 ? angulo : angulo + 360;
        }

        return 0;
    }
    Rotar() {
        if(!this.Fijado) {
            this.Degree += 90;
            this.figura.style.transform = `rotate(${this.Degree}deg)`;
        }    
    }
}

const L1 = new Move(document.getElementById('Lmov1'));
const L2 = new Move(document.getElementById('Lmov2'));
const L3 = new Move(document.getElementById('Lmov3'));
const L4 = new Move(document.getElementById('Lmov4'));
const L5 = new Move(document.getElementById('Lmov5'))

function otar() {
    console.log(NomFigu);
    if (NomFigu == "Lmov1") {
        L1.Rotar();
    }if (NomFigu == "Lmov2") {
        L2.Rotar();
    }if (NomFigu == "Lmov3") {
        L3.Rotar();
    }if (NomFigu == "Lmov4") {
        L4.Rotar();
    }if (NomFigu == "Lmov5") {
        L5.Rotar();
    }
}
function Verificar() {
    if (contar == 5) {
        alert("Juego terminado, felicitaciones");
        localStorage.setItem('mensaje','1');
        window.location.href = "../../Tutorial/Tutorial.html";
    }else alert("Aún hay fichas sin acomodar");
}

function Principal() {
    localStorage.setItem('mensaje','1');
    window.location.href = '../../Tutorial/Tutorial.html';
}