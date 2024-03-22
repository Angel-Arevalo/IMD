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
        let Addres = document.getElementById('Email').value;
        
        if (Name != "" && Pass!= "" && Pass.length >= 8 && Addres != "") {
            this.RevisionCorreo();//reviso que el correo sea correcto
            if(this.#ValidAdress) {
                console.log("Hello world");
                this.#UserPassword = Pass;
                this.#Username = Name;
                this.#UserEmail = Addres;
                this.#Rol = document.getElementById('Selector').value;
                this.SendData();
            }
        } else this.AlertUser(Name,Pass,Addres);
    }

    SendData () {
        fetch('http://localhost:5000/ruta_del_backend', {
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
            if (data.mensaje == "Usuario en uso") {
                alert("Usuario en uso");
            }
            console.log(data.mensaje);
        })
        .catch(error => console.error('Error:', error));
    }

    //Método para alertar que se está insertando algo mal
    AlertUser(Name, Pass, Addres) {
        let Help = "", bool = false, boolAdress = false;
        if (Name == "") {
            Help += "Usuario incorrecto. ";
        } if (Pass == "") {
            bool = true;
            Help += "Contraseña vacía. ";
        } if (Pass.length < 8 && bool == false) {
            Help += "Contraseña invalida.";
        } if(Addres == "") {Help += "Correo vacio";;boolAdress = true}
        if (this.#ValidAdress && !boolAdress) {Help += " Correo invalido."};
        
        alert(Help);
    }
    
    RevisionCorreo() {
        let arroba = this.#UserEmail.indexOf("@");
        let PalaResultante = this.#UserEmail.substring(arroba);

        if (arroba == -1) {
            switch (PalaResultante.toLowerCase()) {//designo el valor de verdad
            case "@gmail.com": 
                this.#ValidAdress = true;
                break
            case "@unal.edu.co":
                this.#ValidAdress = true;
                break
            case "@hotmail.com":
                this.#ValidAdress = true;
                break
            default:
                this.#ValidAdress = false;
                break;
        }}else this.#ValidAdress = false;
    }
}

const regis = new Registro();

function Send() {
    console.log("Hello world");
    regis.SaveUser();
}