var Mensaje = localStorage.getItem('mensaje');
var name;var empe = false;var Contar = 0;
//Funciones necesarias
addEventListener('load', function() {
    if (Mensaje == "1") {
        name = this.localStorage.getItem('Nombre');
        this.localStorage.setItem('Nombre','');
        localStorage.setItem('mensaje','0');
    }else if(Mensaje == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
})
function Principal() {
    localStorage.setItem('mensaje','1');
    window.location.href = '../../Tutorial/Tutorial.html';
}
function CrearDivs(x,y,z) {
    let nuevoDiv = document.createElement('div');
    //estilos básicos
    nuevoDiv.id = "Cuadrado_" + z;
    nuevoDiv.style.position = 'absolute';
    nuevoDiv.style.background = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    nuevoDiv.style.width = '7vw';
    nuevoDiv.style.height = '7vw';
    nuevoDiv.style.top = (y) + '%';
    nuevoDiv.style.left = (x + 15) + '%';

    document.body.appendChild(nuevoDiv);
    document.getElementById('Contador').innerHTML = 0;
}
//función en la que creamos divs y luego los objetos
function empezar() {
    if (!empe) {
        for (var i = 0; i < 8; i++) {
            CrearDivs(10*i, 12, i);
        }
        const Figura0 = new MoverFigura(document.getElementById('Cuadrado_0'));
        const Figura1 = new MoverFigura(document.getElementById('Cuadrado_1'));
        const Figura2 = new MoverFigura(document.getElementById('Cuadrado_2'));
        const Figura3 = new MoverFigura(document.getElementById('Cuadrado_3'));
        const Figura4 = new MoverFigura(document.getElementById('Cuadrado_4'));
        const Figura5 = new MoverFigura(document.getElementById('Cuadrado_5'));
        const Figura6 = new MoverFigura(document.getElementById('Cuadrado_6'));
        const Figura7 = new MoverFigura(document.getElementById('Cuadrado_7'));
        empe = true;
    }else alert("Ya hay un juego en progreso");
    
}
//Clase para mover objetos
class MoverFigura {
    constructor(figura) {
        this.figura = figura;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.area = figura.offsetHeight;
        //Eventos
        this.figura.addEventListener('mousedown', this.iniciarArrastre.bind(this));
        this.figura.addEventListener('mousemove', this.arrastrar.bind(this));
        this.figura.addEventListener('mouseup', this.soltar.bind(this));
        //Objetos de confirmación
        this.Cuadrado_1 = document.getElementById('FichaComp1').getBoundingClientRect();
        this.Cuadrado_2 = document.getElementById('FichaComp2').getBoundingClientRect();
        this.Cuadrado_3 = document.getElementById('FichaComp3').getBoundingClientRect();
        this.Cuadrado_4 = document.getElementById('FichaComp4').getBoundingClientRect();
        this.Cuadrado_5 = document.getElementById('FichaComp5').getBoundingClientRect();
        this.Cuadrado_6 = document.getElementById('FichaComp6').getBoundingClientRect();
        this.Cuadrado_7 = document.getElementById('FichaComp7').getBoundingClientRect();
        this.Cuadrado_8 = document.getElementById('FichaComp8').getBoundingClientRect();
    }

    iniciarArrastre(evento) {
        this.FiguraMoviendose = true;
        this.inicioX = evento.clientX - this.figura.getBoundingClientRect().left;
        this.inicioY = evento.clientY - this.figura.getBoundingClientRect().top;
        this.fijar();
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
    //función para verificar ganador
    VerificarContador() {
        if (Contar == 8) {
            alert("Juego terminado, felicitaciones");
            localStorage.setItem('mensaje','1');
            window.location.href = '../../Tutorial/Tutorial.html';
            return true;
        }
        return false;
    }

    fijar() {
        const rectanguloFigura = this.figura.getBoundingClientRect();
        //verificaciones para fijar figuras
        if (rectanguloFigura.left - 25 <= this.Cuadrado_1.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_1.right &&
            rectanguloFigura.top - 25 <= this.Cuadrado_1.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_1.bottom) {
            this.figura.style.left = this.Cuadrado_1.left + 'px';
            this.figura.style.top = this.Cuadrado_1.top + 'px';
            this.InicioX = this.Cuadrado_1.left;
            this.InicioY = this.Cuadrado_1.top;
            this.soltar();
            if(!this.VerificarContador()) {
                Contar += 1;
                document.getElementById('Contador').innerHTML = Contar;
            }  
        }
        if (rectanguloFigura.left - 25 <= this.Cuadrado_2.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_2.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_2.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_2.bottom) {
                this.figura.style.left = this.Cuadrado_2.left + 'px';
                this.figura.style.top = this.Cuadrado_2.top + 'px';
                this.InicioX = this.Cuadrado_2.left;
                this.InicioY = this.Cuadrado_2.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }
        if (rectanguloFigura.left - 25 <= this.Cuadrado_3.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_3.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_3.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_3.bottom) {
                this.figura.style.left = this.Cuadrado_3.left + 'px';
                this.figura.style.top = this.Cuadrado_3.top + 'px';
                this.InicioX = this.Cuadrado_3.left;
                this.InicioY = this.Cuadrado_3.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }
        if (rectanguloFigura.left - 25 <= this.Cuadrado_4.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_4.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_4.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_4.bottom) {
                this.figura.style.left = this.Cuadrado_4.left + 'px';
                this.figura.style.top = this.Cuadrado_4.top + 'px';
                this.InicioX = this.Cuadrado_4.left;
                this.InicioY = this.Cuadrado_4.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }
        if (rectanguloFigura.left - 25 <= this.Cuadrado_5.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_5.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_5.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_5.bottom) {
                this.figura.style.left = this.Cuadrado_5.left + 'px';
                this.figura.style.top = this.Cuadrado_5.top + 'px';
                this.InicioX = this.Cuadrado_5.left;
                this.InicioY = this.Cuadrado_5.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            } 
        if (rectanguloFigura.left - 25 <= this.Cuadrado_6.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_6.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_6.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_6.bottom) {
                this.figura.style.left = this.Cuadrado_6.left + 'px';
                this.figura.style.top = this.Cuadrado_6.top + 'px';
                this.InicioX = this.Cuadrado_6.left;
                this.InicioY = this.Cuadrado_6.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }        
        if (rectanguloFigura.left - 25 <= this.Cuadrado_7.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_7.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_7.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_7.bottom) {
                this.figura.style.left = this.Cuadrado_7.left + 'px';
                this.figura.style.top = this.Cuadrado_7.top + 'px';
                this.InicioX = this.Cuadrado_7.left;
                this.InicioY = this.Cuadrado_7.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }  
        if (rectanguloFigura.left - 25 <= this.Cuadrado_8.left && 
            rectanguloFigura.right + 25 >= this.Cuadrado_8.right &&
            rectanguloFigura.top -25 <= this.Cuadrado_8.top &&
            rectanguloFigura.bottom + 25 >= this.Cuadrado_8.bottom) {
                this.figura.style.left = this.Cuadrado_8.left + 'px';
                this.figura.style.top = this.Cuadrado_8.top + 'px';
                this.InicioX = this.Cuadrado_8.left;
                this.InicioY = this.Cuadrado_8.top;
                this.soltar();
                if(!this.VerificarContador()) {
                    Contar += 1;
                    document.getElementById('Contador').innerHTML = Contar;
                }  
            }
    }
}