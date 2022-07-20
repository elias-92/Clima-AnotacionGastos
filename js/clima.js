// VARIABLES

const mostrarClima = document.querySelector('.card-clima');
const form = document.querySelector('.form');
const iconAnimado = document.getElementById('iconAnimado');
const nomCiudad = document.getElementById('ciudad');
const nomPais = document.getElementById('pais');

// INICIA EL EVENTO CUANDO SE ENVIAN LOS INPUTS
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(nomCiudad.value === '' || nomPais.value === '' || nomPais.value === 'Seleccione un pais'){
        impError('Ambos campos son obligatorios.');
        return;
    }
    llamarApi(nomCiudad.value, nomPais.value);
})
// INCORPORANDO ASYNC-AWAIT
async function llamarApi(ciudad, pais) {
    const apiId = '439a32e79cbd28ce1bf4f4234e8f6b49';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}&units=metric&lang=es`;
// FETCH
    await fetch(url)
    .then((data)=>{
        return data.json();
    })
    .then((dataJSON)=>{
        if(dataJSON.cod === '404'){
            impError('Ciudad no encontrada');
        }else{
            impClima(dataJSON)
            
        }
    })
    .catch(error =>{
        console.log(error);
    })
}
// IMPRIME CARD CLIMA
function impClima(data){
    mostrarClima.innerHTML = '';
    // const img = '../img/animated/rainy-1.svg';
    const {name, sys:{country}, main:{temp, temp_max, temp_min}, weather:[arr]} = data;
    const card = document.createElement('div');
    card.innerHTML=`<h3 style="font-size: 1.55rem; padding-top: .5rem;">Clima en ${name}, ${ country}</h3>
                    <img src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${arr.icon}.svg alt="" style="width:70px;margin: auto">
                    <h4 style="font-size: 1.2rem;">${arr.description}</h4>                    
                    <h2 style="font-size: 2.5rem;padding: .5rem;">${Math.round(temp)}<sup>°C</h2>
                    <p style="font-size: 1.1rem;color: #e20909e3;">Max: ${Math.round(temp_max)}<sup>°C</p>
                    <p style="font-size: 1.1rem;color: #090ae2e3;">Min: ${Math.round(temp_min)}<sup>°C</p>`
                    
    mostrarClima.appendChild(card);
    form.reset();
}
// ERROR
function impError(msj) {
    const alert = document.createElement('p');
    alert.classList.add('alert-msj');
    alert.innerHTML = msj;

    form.appendChild(alert);

    setTimeout(()=>{
        alert.remove()
    },2000)
}
// RESETEA LOS INPUTS
function reset(){
    nomCiudad.innerHTML = '';
    nomPais.innerHTML = '';
}


