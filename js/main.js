const bebidas = [];

function saludar() {
    let saludar = prompt("¿Cual es tu nombre?");
    while (saludar === " ") {
        alert("Por favor introduce tu Nombre");
        saludar = prompt("¿Cual es tu nombre?");
    }
    alert("Bienvenido " + saludar);
    while (confirm("¿Desea llevar bebidas?")) {
        agregarBebidas();
    }
}

function agregarBebidas() {
    let nuevabebida = { bebida: "", importe: 0, cantidad: 0 };
    nuevabebida.bebida = prompt("Ingrese la bebida que desea comprar");
    nuevabebida.importe = Number(prompt("Ingrese el importe de la bebida"));
    nuevabebida.cantidad = Number(prompt("Ingrese cantidad a llevar"));
    bebidas.push(nuevabebida);
}

function sumarBebidas() {
    const resultado = bebidas.reduce(
        (acc, elem) => (acc += elem.importe * elem.cantidad),
        0.0
    );
    document.write(`Total a pagar: $ ${resultado} </br> Gracias por su compra, vuelva prontos.`);
}
saludar();
console.log(bebidas);
sumarBebidas();