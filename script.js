const ORACIONRANDOMURL = 'https://api.quotable.io/random'
const mostrarCita = document.getElementById('cita-random')
const oracionracionInputElement = document.getElementById('textoCita')
const temporizadorE = document.getElementById('temporizador')


let funcionEjecutada = false;

let empezar;
let intervalo;



function reiniciarTiempo() {
    detenerTiempo();
    temporizadorE.innerText = 0;
    empezar = new Date();
    funcionEjecutada = false;
}
const botonReiniciar = document.getElementById('botonReiniciar');
botonReiniciar.addEventListener('click', reiniciarTiempo);
botonReiniciar.addEventListener('click', getNuevaOracion);

function correrTiempo(){
    if(!funcionEjecutada){
        temporizadorE.innerText = 0
        segundos = 'sg'
        empezar = new Date()
        intervalo = setInterval(()=>{
        temporizadorE.innerText = getTiempo() + segundos
        }, 1000)
        funcionEjecutada = true;
    }
    

}

function getTiempo(){
    return Math.floor((new Date() - empezar) / 1000)
}

function detenerTiempo() {
    clearInterval(intervalo);
    funcionEjecutada = false;
}

textoCita.addEventListener('input', correrTiempo);

oracionracionInputElement.addEventListener('input', () => {
    console.log('changed')
    
    const ordenCita = mostrarCita.querySelectorAll('span')
    const ordenValue = oracionracionInputElement.value.split('')
    let correct = true
    ordenCita.forEach((characterSpan, index)=>{
        const character = ordenValue[index]
        if (character == null){
            characterSpan.classList.remove('correcto')
            characterSpan.classList.remove('incorrecto')
            correct = false
        } else if (character === characterSpan.innerText){
            characterSpan.classList.add('correcto')
            characterSpan.classList.remove('incorrecto')
        } else {
            characterSpan.classList.remove('correcto')
            characterSpan.classList.add('incorrecto')
            correct = false
        }
    })
    if (correct) detenerTiempo();
})

function getOracionRandom () {
    return fetch (ORACIONRANDOMURL)
    .then(respuesta => respuesta.json())
    .then(data => data.content)
}

async function getNuevaOracion() {
    const oracion = await getOracionRandom()
    console.log(oracion)
    mostrarCita.innerText = ''
    oracionracionInputElement.value = null
    oracion.split('').forEach(character =>{
        const espacioLetra = document.createElement('span')
        espacioLetra.innerText = character
        mostrarCita.appendChild(espacioLetra)
    
})
    
}

getNuevaOracion()