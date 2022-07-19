// VARIABLES

const mostrarClima = document.querySelector('.card-clima');
const form = document.querySelector('.form');
const iconAnimado = document.querySelector('#iconAnimado');
const nomCiudad = document.querySelector('#ciudad');
const nomPais = document.querySelector('#pais');

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
            // impClima(dataJSON);
            console.log(dataJSON);
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
    const {name, main:{temp, temp_max, temp_min}, weather:[arr]} = data;
    const card = document.createElement('div');
    card.innerHTML=`<h3 style="font-size: 1.55rem; padding-top: .5rem;">Clima en ${name}</h3>
                    <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="" style="width:80px;margin: auto">
                    <h4 style="font-size: 1.2rem;">${arr.description}</h4>                    
                    <h2 style="font-size: 2.5rem;padding: .5rem;">${temp.toFixed(0)}°C</h2>
                    <p style="font-size: 1.1rem;color: #e20909e3;">Max: ${temp_max.toFixed(0)}°C</p>
                    <p style="font-size: 1.1rem;color: #090ae2e3;">Min: ${temp_min.toFixed(0)}°C</p>`
                    
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


