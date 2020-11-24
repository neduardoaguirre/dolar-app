const resultado = document.querySelector('#resultado');
const hoy = new Date().toLocaleDateString();

document.addEventListener('DOMContentLoaded', () => {
    const fecha = document.querySelector('#fecha');
    fecha.textContent = hoy;
    getCotizaciones();
});

async function getCotizaciones() {
    const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    spinner();
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        mostrarCotizaciones(resultado)
    } catch (error) {
        console.error(error);
    }
}

function mostrarCotizaciones(datos) {
    limpiarHTML();
    const cotizaciones = datos.filter(dato => dato.casa.agencia !== '141' && dato.casa.agencia !== '311' && dato.casa.agencia !== '399')
    cotizaciones.forEach(cotizacion => {
        const {
            compra,
            venta,
            variacion,
            nombre
        } = cotizacion.casa;

        resultado.classList.add('grid');
        if (nombre !== 'Dolar' && nombre !== 'Dolar turista') {
            resultado.innerHTML +=
                `<div class="shadow-xl bg-gray-200 rounded-lg">
                    <h2 class="text-xl bg-green-400 text-white font-bold mb-4 p-3 rounded-t-lg text-center uppercase">${nombre.slice(5)}</h2>
                    <div class="flex px-2 py-2 m-2 justify-around">
                        <div>Venta</div>
                        <div>Compra</div>
                    </div>
                    <div class="flex px-4 py-2 justify-around font-bold">
                        <div>$ ${venta.slice(0, -1)}</div>
                        <div>$ ${compra.slice(0, -1)}</div>
                    </div>
                    <div class="mx-auto mt-3 p-2 font-xl text-center"><p>↑↓ ${variacion} %<p><div>
                </div>`;
        } else if (nombre === 'Dolar turista') {
            resultado.innerHTML +=
                `<div class="shadow-xl bg-gray-200 rounded-lg">
                    <h2 class="text-xl bg-green-400 text-white font-bold mb-4 p-3 rounded-t-lg text-center uppercase">${nombre.slice(5)}</h2>
                    <div class="flex px-2 py-2 m-2 justify-around">
                        <div>Venta</div>
                    </div>
                    <div class="flex px-4 py-2 justify-around font-bold">
                        <div>$ ${venta}</div>
                    </div>
                    <div class="mx-auto mt-3 p-2 font-xl text-center">N/A<div>
                </div>`;
        } else {
            resultado.innerHTML +=
                `<div class="shadow-xl bg-gray-200 rounded-lg">
                    <h2 class="text-xl bg-green-400 text-white font-bold mb-4 p-3 rounded-t-lg text-center uppercase">Promedio</h2>
                    <div class="flex px-2 py-2 m-2 justify-around">
                        <div>Venta</div>
                        <div>Compra</div>
                    </div>
                    <div class="flex px-4 py-2 justify-around font-bold">
                        <div>$ ${venta}</div>
                        <div>$ ${compra}</div>
                    </div>
                    <div class="mx-auto mt-3 p-2 font-xl text-center">N/A<div>
                </div>`;
        }
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;
    resultado.classList.remove('grid')
    resultado.appendChild(divSpinner);
}