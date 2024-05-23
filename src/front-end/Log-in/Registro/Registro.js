class Registro {
    //Variables
    #Username; #UserPassword; #UserEmail; #Rol; #ValidAdress = false;

    //Constructor
    constructor() {
        this.#Username = "";
        this.#UserPassword = "";
        this.#UserEmail = "";
        this.#Rol = "";
    }

    //Guarda el usuario
    SaveUser() {
        let Name = document.getElementById('UserName').value;
        let Pass = document.getElementById('PassWord').value;
        let Adress = document.getElementById('Email').value;

        if ((Name != "") && (Pass != "") && (Pass.length >= 8) && (Adress != "")) {
            this.RevisionCorreo(Adress);//reviso que el correo sea correcto
            if(this.#ValidAdress) {
                this.#UserPassword = Pass;
                this.#Username = Name;
                this.#UserEmail = Adress;
                this.#Rol = document.getElementById('Selector').value;
                this.SendData();
            } else this.AlertUser(Name,Pass,Adress);
        } else this.AlertUser(Name,Pass,Adress);
    }

    SendData () {//lugar para enviar la información
        fetch('http://localhost:5000/Backend/Registro_Usuario', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'Nombre':this.#Username,
                                  'Contraseña':this.#UserPassword,
                                  'Correo': this.#UserEmail,
                                  'Rol': this.#Rol})
        }
        )
        .then(response => response.json())
        .then(data => {
            if (data.mensaje == "Usuario Correcto") {
                localStorage.setItem('Aula', data.Aula);
                localStorage.setItem('Rol', data.Rol);
                localStorage.setItem('Nombre', this.#Username);
                localStorage.setItem('mensaje', '1');
                window.location.href = '../../Worlds/EscogerMundo.html';
            }else alert(data.mensaje);
        })
        .catch(error => console.error('Error:', error));
    }

    //Método para alertar que se está insertando algo mal
    AlertUser(Name, Pass, Adress) {
        let Help = "", bool = false, boolAdress = false;
        if (Name == "") {
            Help += "Usuario incorrecto. ";
        } if (Pass == "") {
            bool = true;
            Help += "Contraseña vacía. ";
        } if (Pass.length < 8 && bool == false) {
            Help += "Contraseña invalida.";
        } if(Adress == "") {Help += " Correo vacio."; boolAdress = true}
        if (!this.#ValidAdress && !boolAdress) {Help += " Correo invalido."};
        
        alert(Help);
    }
    
    RevisionCorreo(Adress) {
        let arroba = Adress.indexOf('@');
        
        if (arroba != -1) {//Encuentro que el correo tenga un dominio aceptado
            let ExtencionCorreo = Adress.substring(arroba).toLowerCase();
            switch (ExtencionCorreo) {
                case "@gmail.com":
                case "@unal.edu.co":
                case "@hotmail.com":
                    this.#ValidAdress =true;
                    break;
            }
        }
    }
}

const regis = new Registro();

function Send() {
    regis.SaveUser();
}