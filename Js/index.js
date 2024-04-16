const formulario = document.querySelector('.formulario');
const iniciarlink = document.querySelector('.iniciar-link');
const registrarlink = document.querySelector('.registrar-link');
const btnabrir = document.querySelector('.boton_inicio');
const btncerrar = document.querySelector('.icon-cerrar');

registrarlink.addEventListener('click', () => {
    formulario.classList.add('active');
});

iniciarlink.addEventListener('click', () => {
    formulario.classList.remove('active');
});

btnabrir.addEventListener('click', () => {
    formulario.classList.add('active-popup');
});

btncerrar.addEventListener('click', () => {
    formulario.classList.remove('active-popup');
});

document.getElementById('form_registro').addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById('email-registro').value;
    var password = document.getElementById('password-registro').value;

    localStorage.setItem("registeredUser", JSON.stringify({username: username, password: password}));

    Swal.fire({
        title: "Felicidades!",
        text: "Usuario registrado correctamente",
        icon: "success"
      });
    /*formulario.classList.remove('active');*/
    formulario.classList.remove('active-popup'); 
});

document.getElementById('form_iniciar').addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById('email-sesion').value;
    var password = document.getElementById('password-sesion').value;

    var registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        document.getElementById('blackjack-link').classList.remove("hidden");
        formulario.classList.remove('active');
        iniciarlink.style.display = "none";
        formulario.style.display = "none";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario o contraseña incorrectos. Por favor, intenta de nuevo.",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          
    }
});

window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        localStorage.removeItem("isLoggedIn"); 
        document.getElementById('blackjack-link').classList.add("hidden"); 
    }
};