const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.loginLink');
const registerLink = document.querySelector('.registerLink');
const btnLogin = document.querySelector('.btnLogin');
const btnRegister = document.querySelector('.btnRegister');

loginLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');

});

registerLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');

});

btnLogin.addEventListener('click', ()=> {
    wrapper.classList.remove('activeLogin');
    wrapper.classList.add('activeRegister');
    
    });

btnRegister.addEventListener('click', ()=> {    
    wrapper.classList.remove('activeRegister');
    wrapper.classList.add('activeLogin');

});

var homeLinks = document.getElementById("homeLinks");

    function showMenu(){
        homeLinks.style.right = "0";
    }

    function hideMenu(){
        homeLinks.style.right = "-300px";
    }