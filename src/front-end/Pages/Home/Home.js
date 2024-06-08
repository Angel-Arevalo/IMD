const wrapperL = document.querySelector('.wrapper-LogIn');
const wrapperR = document.querySelector('.wrapper-Register');
const btnLogin = document.querySelector('.btnLogin');
const btnRegister = document.querySelector('.btnRegister');
const btnforL = document.querySelector('.registerLink')
const btnforR = document.querySelector('.loginLink');
const btnCloseR = document.querySelector('.iconCloseR');
const btnCloseL = document.querySelector('.iconCloseL');

btnRegister.addEventListener('click', ()=> {
    wrapperR.style.transform = "scale(0)";
    wrapperL.style.transform = "scale(1)";    
    });
    
btnLogin.addEventListener('click', ()=> {
    wrapperL.style.transform = "scale(0)";
    wrapperR.style.transform = "scale(1)";
});

btnforL.addEventListener('click', ()=> {
    wrapperR.style.transform = "scale(0)";
    wrapperL.style.transform = "scale(1)";    
    });
    
btnforR.addEventListener('click', ()=> {
    wrapperL.style.transform = "scale(0)";
    wrapperR.style.transform = "scale(1)";
});

btnCloseL.addEventListener('click', ()=> {
    wrapperL.style.transform = "scale(0)";
})

btnCloseR.addEventListener('click', ()=> {
    wrapperR.style.transform = "scale(0)";
})

var homeLinks = document.getElementById("homeLinks");

    function showMenu(){
        homeLinks.style.right = "0";
    }

    function hideMenu(){
        homeLinks.style.right = "-300px";
    }