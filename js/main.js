const preciosSitio = [
  { tipo: "Landing", precio: 300 },
  { tipo: "Institucional", precio: 500 },
  { tipo: "Tienda online", precio: 900 }
];

const extras = [
  { nombre: "Mantenimiento", precio: 100 },
  { nombre: "Hosting", precio: 80 },
  { nombre: "SEO básico", precio: 120 }
];

const historialPresupuestos = JSON.parse(localStorage.getItem("historialPresupuestos")) || [];

const menuPrincipal = document.getElementById('menu-principal');
const formPresupuesto = document.getElementById('form-presupuesto');
const infoSitios = document.getElementById('info-sitios');
const infoExtras = document.getElementById('info-extras');
const resultado = document.getElementById('resultado');

const btnCrearPresupuesto = document.getElementById('btn-crear-presupuesto');
const btnVerSitios = document.getElementById('btn-ver-sitios');
const btnVerExtras = document.getElementById('btn-ver-extras');

const btnCancelar = document.getElementById('btn-cancelar');
const btnVolverSitios = document.getElementById('btn-volver-sitios');
const btnVolverExtras = document.getElementById('btn-volver-extras');
const btnVolverResultado = document.getElementById('btn-volver-resultado');
const btnNuevoPresupuesto = document.getElementById('btn-nuevo-presupuesto');

const presupuestoForm = document.getElementById('presupuesto-form');

function volverAlMenu() {
  menuPrincipal.style.display = 'flex';
  formPresupuesto.style.display = 'none';
  infoSitios.style.display = 'none';
  infoExtras.style.display = 'none';
  resultado.style.display = 'none';
}

function generarTiposSitio() {
  const tipoSitioGroup = document.getElementById('tipo-sitio-group');
  tipoSitioGroup.innerHTML = '';
  
  for (const sitio of preciosSitio) {
    const indice = preciosSitio.indexOf(sitio);
    const radioOption = document.createElement('div');
    radioOption.className = 'radio-option';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'tipo-sitio';
    radio.value = indice;
    radio.id = `sitio-${indice}`;
    if (indice === 0) radio.checked = true;
    
    const label = document.createElement('label');
    label.htmlFor = `sitio-${indice}`;
    label.className = 'option-label';
    label.textContent = sitio.tipo;
    
    const precio = document.createElement('span');
    precio.className = 'option-price';
    precio.textContent = `USD ${sitio.precio}`;
    
    radioOption.appendChild(radio);
    radioOption.appendChild(label);
    radioOption.appendChild(precio);
    tipoSitioGroup.appendChild(radioOption);
  }
}

function generarExtras() {
  const extrasGroup = document.getElementById('extras-group');
  extrasGroup.innerHTML = '';
  
  for (const extra of extras) {
    const indice = extras.indexOf(extra);
    const checkboxOption = document.createElement('div');
    checkboxOption.className = 'checkbox-option';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'extras';
    checkbox.value = indice;
    checkbox.id = `extra-${indice}`;
    
    const label = document.createElement('label');
    label.htmlFor = `extra-${indice}`;
    label.className = 'option-label';
    label.textContent = extra.nombre;
    
    const precio = document.createElement('span');
    precio.className = 'option-price';
    precio.textContent = `USD ${extra.precio}`;
    
    checkboxOption.appendChild(checkbox);
    checkboxOption.appendChild(label);
    checkboxOption.appendChild(precio);
    extrasGroup.appendChild(checkboxOption);
  }
}

function mostrarListaSitios() {
  const listaSitios = document.getElementById('lista-sitios');
  listaSitios.innerHTML = '';
  
  for (const sitio of preciosSitio) {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    
    const nombre = document.createElement('span');
    nombre.textContent = sitio.tipo;
    nombre.style.fontWeight = '600';
    
    const precio = document.createElement('span');
    precio.textContent = `USD ${sitio.precio}`;
    precio.style.color = '#667eea';
    precio.style.fontWeight = '700';
    
    infoItem.appendChild(nombre);
    infoItem.appendChild(precio);
    listaSitios.appendChild(infoItem);
  }
}

function mostrarListaExtras() {
  const listaExtras = document.getElementById('lista-extras');
  listaExtras.innerHTML = '';
  
  for (const extra of extras) {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    
    const nombre = document.createElement('span');
    nombre.textContent = extra.nombre;
    nombre.style.fontWeight = '600';
    
    const precio = document.createElement('span');
    precio.textContent = `USD ${extra.precio}`;
    precio.style.color = '#667eea';
    precio.style.fontWeight = '700';
    
    infoItem.appendChild(nombre);
    infoItem.appendChild(precio);
    listaExtras.appendChild(infoItem);
  }
}

function calcularPresupuesto(tipoSitio, extrasElegidos) {
  let total = tipoSitio.precio;
  
  for (let extra of extrasElegidos) {
    total += extra.precio;
  }
  
  return total;
}

function guardarPresupuestoEnStorage(presupuesto) {
  historialPresupuestos.push(presupuesto);
  localStorage.setItem("historialPresupuestos", JSON.stringify(historialPresupuestos));
}

function mostrarResultado(nombre, tipoSitio, extrasElegidos, total) {
  const resultadoContenido = document.getElementById('resultado-contenido');
  resultadoContenido.innerHTML = '';
  
  const itemNombre = document.createElement('div');
  itemNombre.className = 'resultado-item';
  itemNombre.innerHTML = `<strong>Cliente:</strong> ${nombre}`;
  resultadoContenido.appendChild(itemNombre);
  
  const itemTipo = document.createElement('div');
  itemTipo.className = 'resultado-item';
  itemTipo.innerHTML = `<strong>Tipo de sitio:</strong> ${tipoSitio.tipo}`;
  resultadoContenido.appendChild(itemTipo);
  
  const itemExtras = document.createElement('div');
  itemExtras.className = 'resultado-item';
  let mensajeExtras = '';
  
  if (extrasElegidos.length > 0) {
    mensajeExtras = extrasElegidos.map(extra => extra.nombre).join(', ');
  } else {
    mensajeExtras = 'Ninguno';
  }
  
  itemExtras.innerHTML = `<strong>Extras:</strong> ${mensajeExtras}`;
  resultadoContenido.appendChild(itemExtras);
  
  const itemTotal = document.createElement('div');
  itemTotal.className = 'resultado-total';
  itemTotal.textContent = `Presupuesto Final: USD ${total}`;
  resultadoContenido.appendChild(itemTotal);
  
  menuPrincipal.style.display = 'none';
  formPresupuesto.style.display = 'none';
  resultado.style.display = 'block';
  
  const fechaActual = new Date();
  const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
  
  const presupuesto = {
    nombre: nombre,
    tipoSitio: tipoSitio.tipo,
    extras: extrasElegidos.map(extra => extra.nombre),
    total: total,
    fecha: fechaFormateada
  };
  
  guardarPresupuestoEnStorage(presupuesto);
}

btnCrearPresupuesto.addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  formPresupuesto.style.display = 'block';
  document.getElementById('nombre-cliente').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

btnVerSitios.addEventListener('click', () => {
  mostrarListaSitios();
  menuPrincipal.style.display = 'none';
  infoSitios.style.display = 'block';
});

btnVerExtras.addEventListener('click', () => {
  mostrarListaExtras();
  menuPrincipal.style.display = 'none';
  infoExtras.style.display = 'block';
});

btnCancelar.addEventListener('click', volverAlMenu);
btnVolverSitios.addEventListener('click', volverAlMenu);
btnVolverExtras.addEventListener('click', volverAlMenu);
btnVolverResultado.addEventListener('click', volverAlMenu);

btnNuevoPresupuesto.addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  formPresupuesto.style.display = 'block';
  resultado.style.display = 'none';
  document.getElementById('nombre-cliente').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

presupuestoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre-cliente').value.trim();
  
  if (nombre === '') {
    return;
  }
  
  const tipoSeleccionado = document.querySelector('input[name="tipo-sitio"]:checked');
  const tipoSitio = preciosSitio[parseInt(tipoSeleccionado.value)];
  
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]:checked');
  const extrasElegidos = [];
  
  for (const checkbox of extrasCheckboxes) {
    extrasElegidos.push(extras[parseInt(checkbox.value)]);
  }
  
  const total = calcularPresupuesto(tipoSitio, extrasElegidos);
  
  mostrarResultado(nombre, tipoSitio, extrasElegidos, total);
});

function inicializarApp() {
  generarTiposSitio();
  generarExtras();
  volverAlMenu();
}

inicializarApp();

