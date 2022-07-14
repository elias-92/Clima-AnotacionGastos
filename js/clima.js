// VARIABLES

const mostrarClima = document.querySelector('.card-clima');
const form = document.querySelector('.datos-tiempo');
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
            impClima(dataJSON);
            console.log(dataJSON);
            imgAnimada(dataJSON)
            
        }
    })
    .catch(error =>{
        console.log(error);
    })
}
// IMPRIME CARD CLIMA
function impClima(data){
    mostrarClima.innerHTML = '';
    const img = '../img/animated/rainy-1.svg';
    const {name, main:{temp, temp_max, temp_min}, weather:[arr]} = data;
    const card = document.createElement('div');
    card.innerHTML=`<h3>Clima en ${name}</h3>
                    <img id="iconAnimado" src="${img}" alt="" style="width:80px;margin: auto">
                    <h4>${arr.description}</h4>
                    <h2>${temp.toFixed(0)}°C</h2>
                    <p>Max: ${temp_max.toFixed(0)}°C</p>
                    <p>Min: ${temp_min.toFixed(0)}°C</p>`
                    
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
// QUIERO QUE DEPENDIENDO DEL TIEMPO ME IMPRIMA UN SVG DINAMICO
function imgAnimada(dato) {
    const {weather:[arr]} = dato
    switch (arr.main) {
        case 'Clear':
            img = '../img/animated/day.svg'
            console.log('limpio');
            break;
            case 'Rain':
            img = '../img/animated/rainy-1.svg'
            console.log('lluvia');
            break;
    
        default:
            break;
    }
}


