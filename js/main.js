
//CONSTANTES 
const formulario = document.getElementById('form');
const listaProductos = document.getElementById('product_list-ul');
const spanTotal = document.getElementById('total');
const spanPromedio = document.getElementById('average');


//EVENTOS
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarProductos);

}
window.addEventListener('DOMContentLoaded', ()=>{
    calcularTotal();
})

//                       <---------------- START CLASES-------------->

class Presupuesto {
    constructor (){
        this.gastos = [];
    }
    
    nuevoGasto(gasto){
        // spread
        this.gastos = [...this.gastos, gasto];
        sincronizarStorage(this.gastos);
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        sincronizarStorage(this.gastos);
    }

    
}
const presupuesto = new Presupuesto();

class Ui {
    // varificar si hay error en la carga de inputs


    // IMPLEMENTACION DE LIBRERIA SWEETALERT2
    imprimirAlerta(position,icon,mensaje,showConfirmButton,timer){
        Swal.fire({
            position: position,
            icon: icon,
            title: mensaje,
            showConfirmButton: showConfirmButton,
            timer: timer
        });
        
        // let divMensaje = document.createElement('div');
        // // Operador ternario
        // (tipo === 'error') 
        // ? divMensaje.className ='text-center alerta' 
        // : divMensaje.className ='text-center success';

        // divMensaje.textContent = mensaje;
    
        // // agregar al html la alerta
        // document.querySelector('.primary_content').insertBefore(divMensaje, formulario);
    
        // // remover alerta despues de 3 segundos
        // setTimeout(() => {
        //     divMensaje.remove();
        // }, 1000);
    }
}
const ui = new Ui();
//                        <-------------- END CLASES------------>


//                    <--------------- START FUNCIONES-------------->

function agregarProductos(e){
    e.preventDefault();
    
    // leer datos del formulario
    const inputProduct = document.getElementById('product').value;
    const inputPrice = Number(document.getElementById('price').value);
    //validar datos del formulario
    if(inputProduct === '' || inputPrice === ''){
        // ui.imprimirAlerta('Productos y Precios son obligatorios', 'error');
        ui.imprimirAlerta('center', 'warning', 'Productos y Precios son obligatorios', false, 1500);//llamada a sweetAlert2
        return;
    } else if(inputPrice <= 0 || isNaN(inputPrice)){
        ui.imprimirAlerta('center', 'warning', 'Precio no válido', false, 1500);//llamada a sweetAlert2
        // ui.imprimirAlerta('Precio no válido', 'error');
        return;
    }
    // generar obj con el gasto
    const gasto = {inputProduct, inputPrice, id: Date.now()};
    
    //  // add new gasto
    presupuesto.nuevoGasto(gasto);
    
    // imprimir alerta
    ui.imprimirAlerta('center', 'success', 'Gasto Agregado', false, 2000);//llamada a sweetAlert2
    // ui.imprimirAlerta('Gasto agregado');


    formulario.reset();
}

// Agrega productos a local storage
function sincronizarStorage(gasto) {
    localStorage.setItem('productList', JSON.stringify(gasto));
    calcularTotal();
}

function calcularTotal(){
    let listProduct = JSON.parse(localStorage.getItem('productList'));
    const precioTotal = listProduct.reduce( (total, {inputPrice}) => total + inputPrice, 0);
    spanTotal.innerHTML = precioTotal.toFixed(2);
    promedio();
    productosListados(listProduct);
}

function productosListados(listProduct){ 
    listaProductos.innerHTML = '';
    // itera por cada producto
    listProduct.forEach( producto => {
        const {inputPrice, inputProduct, id} = producto
    
        // crear lista con datos ingresados en el formulario
        let li = document.createElement('li')
        li.className = 'list-li';
        li.dataset.id = id;
        li.innerHTML = `<div class="li_p">
                            <p>Producto: <span id="item">${inputProduct}</span></p>
                            <p>Precio: $ <span id="item_price">${inputPrice.toFixed(2)}</span></p>
                        </div>`;
        //boton eliminar producto
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn_eliminar';
        btnEliminar.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        li.appendChild(btnEliminar);
        btnEliminar.onclick = ()=>{
            presupuesto.eliminarGasto(id);
        }
        // agregar al html
        listaProductos.appendChild(li);
    });
}
// calcular promedio
function promedio() {
    let listProduct = JSON.parse(localStorage.getItem('productList')); // producto, precio, id
    const precioTotal = listProduct.reduce( (total, {inputPrice}) => total + inputPrice, 0);
    const promedio = precioTotal / listProduct.length;
    spanPromedio.innerHTML = promedio.toFixed(2);
}
//                          <-----------------END FUNCIONES--------------->


