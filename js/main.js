
//CONSTANTES 
const formulario = document.getElementById('form');
const listaProductos = document.getElementById('list-ul');

//EVENTO
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarProductos);
    // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
        productList = JSON.parse(localStorage.getItem('productList')) || []  ;
        console.log(productList);
        ui.productosListados(productList);
    });
}

//                       <---------------- START CLASES-------------->

class Presupuesto {
    constructor (){
        this.gastos = [];
    }
    
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularTotal();
    }

    calcularTotal(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.inputPrice, 0);
        this.suma = gastado;
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularTotal();

        const {gastos, suma} = presupuesto;
        // elimina los gastos del html
        ui.productosListados(gastos);

        // actualizar restante
        ui.actualizarTotal(suma);
    }

    
}
const presupuesto = new Presupuesto();

class Ui {
    // varificar si hay error en la carga de inputs
    imprimirAlerta(mensaje,tipo){
        let divMensaje = document.createElement('div');
        if(tipo === 'error'){
            divMensaje.className ='text-center alerta';
        }else{
            divMensaje.className ='text-center success' ;
    
        }
        divMensaje.textContent = mensaje;
    
        // agregar al html la alerta
        document.querySelector('.primary_content').insertBefore(divMensaje, formulario);
    
        // remover alerta despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 1000);
    }

    insertarTotal(total){
        const sumaProd = total;
        // agregar al html
        document.querySelector('#total').textContent = sumaProd;
        // agregar el total de los productos
        let span = document.createElement('span');
        span.className = 'total'
        span.innerHTML = `${total}`;
        sumaProd.appendChild(span);
    };

    actualizarTotal(suma){
        this.insertarTotal(total);
        document.getElementById('total').textContent = suma;    
    };
    
    productosListados(gastos){ 
        this.limpiarHtml();
        // itera por cada producto
        gastos.forEach( gasto => {
            const {inputPrice, inputProduct, id} = gasto
        
            // crear lista con datos ingresados en el formulario
            let li = document.createElement('li')
            li.className = 'list-li';
            li.dataset.id = id;
            li.innerHTML = `<div class="li_p">
                                <p>Producto: <span id="item">${inputProduct}</span></p>
                                <p>Precio: $ <span id="item_price">${inputPrice}</span></p>
                            </div>`;
            // boton eliminar producto
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

        sincronizarStorage();
    }

    limpiarHtml(){
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
    };
    
}
const ui = new Ui();
//                        <-------------- END CLASES------------>




//                    <--------------- START FUNCIONES-------------->

function agregarProductos(e){
    e.preventDefault();
    
    // leer datos del formulario
    const inputProduct = document.getElementById('product').value;
    const inputPrice = Number(document.getElementById('price').value);
    
    // validar datos del formulario
    if(inputProduct === '' || inputPrice === ''){
        ui.imprimirAlerta('Ambos campos son oblogatorios', 'error');
        return;
    } else if(inputPrice <= 0 || isNaN(inputPrice)){
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }
    
    // generar obj con el gasto
    const gasto = {inputProduct, inputPrice, id: Date.now()};
    
    //  // add new gasto
    presupuesto.nuevoGasto(gasto);
    
    // imprimir alerta
    ui.imprimirAlerta('Gasto agregado');
    
    // imprimir gastos
    const {gastos, suma} = presupuesto;

    // agregar lista de productos al html
    ui.productosListados(gastos);
    
    ui.actualizarTotal(suma);

    formulario.reset();
}

// Agrega productos a local storage
function sincronizarStorage() {
    localStorage.setItem('productList', JSON.stringify(presupuesto.gastos));
}



//                          <-----------------END FUNCIONES--------------->


