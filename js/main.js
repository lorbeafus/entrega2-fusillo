

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
const btnEditarPresupuesto = document.getElementById('btn-editar-presupuesto');
const todasLasSecciones = document.querySelectorAll('.menu-section, .form-section, .info-section, .resultado-section');

function mostrarSeccion(seccionAMostrar) {
  todasLasSecciones.forEach(seccion => {
    seccion.classList.remove('active');
  });
  seccionAMostrar.classList.add('active');
}

const presupuestoForm = document.getElementById('presupuesto-form');

function volverAlMenu() {
  mostrarSeccion(menuPrincipal);
}

function generarTiposSitio() {
  const tipoSitioGroup = document.getElementById('tipo-sitio-group');
  tipoSitioGroup.innerHTML = '';
  
  preciosSitio.forEach((sitio, indice) => {
    const radioOption = document.createElement('div');
    radioOption.className = 'radio-option';
    
    radioOption.innerHTML = `
      <input type="radio" name="tipo-sitio" value="${indice}" id="sitio-${indice}" ${indice === 0 ? 'checked' : ''}>
      <label for="sitio-${indice}" class="option-label">${sitio.tipo}</label>
      <span class="option-price">USD ${sitio.precio}</span>
    `;
    
    tipoSitioGroup.appendChild(radioOption);
  });
}

function generarExtras() {
  const extrasGroup = document.getElementById('extras-group');
  extrasGroup.innerHTML = '';
  
  extras.forEach((extra, indice) => {
    const checkboxOption = document.createElement('div');
    checkboxOption.className = 'checkbox-option';
    
    checkboxOption.innerHTML = `
      <input type="checkbox" name="extras" value="${indice}" id="extra-${indice}">
      <label for="extra-${indice}" class="option-label">${extra.nombre}</label>
      <span class="option-price">USD ${extra.precio}</span>
    `;
    
    extrasGroup.appendChild(checkboxOption);
  });
}

function mostrarListaSitios() {
  const listaSitios = document.getElementById('lista-sitios');
  listaSitios.innerHTML = '';
  
  preciosSitio.forEach(sitio => {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    infoItem.innerHTML = `
      <span class="info-item-nombre">${sitio.tipo}</span>
      <span class="info-item-precio">USD ${sitio.precio}</span>
    `;
    listaSitios.appendChild(infoItem);
  });
}

function mostrarListaExtras() {
  const listaExtras = document.getElementById('lista-extras');
  listaExtras.innerHTML = '';
  
  extras.forEach(extra => {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    infoItem.innerHTML = `
      <span class="info-item-nombre">${extra.nombre}</span>
      <span class="info-item-precio">USD ${extra.precio}</span>
    `;
    listaExtras.appendChild(infoItem);
  });
}

function calcularPresupuesto(tipoSitio, extrasElegidos) {
  return extrasElegidos.reduce((total, extra) => total + extra.precio, tipoSitio.precio);
}

function guardarPresupuestoEnStorage(presupuesto) {
  historialPresupuestos.push(presupuesto);
  localStorage.setItem("historialPresupuestos", JSON.stringify(historialPresupuestos));
}

function mostrarResultado(nombre, email, telefono, tipoSitio, extrasElegidos, total) {
  const resultadoContenido = document.getElementById('resultado-contenido');
  
  const mensajeExtras = extrasElegidos.length > 0 
    ? extrasElegidos.map(extra => extra.nombre).join(', ') 
    : 'Ninguno';
  
  resultadoContenido.innerHTML = `
    <div class="resultado-item"><strong>Cliente:</strong> ${nombre}</div>
    <div class="resultado-item"><strong>Email:</strong> ${email}</div>
    <div class="resultado-item"><strong>Teléfono:</strong> ${telefono}</div>
    <div class="resultado-item"><strong>Tipo de sitio:</strong> ${tipoSitio.tipo}</div>
    <div class="resultado-item"><strong>Extras:</strong> ${mensajeExtras}</div>
    <div class="resultado-total">Presupuesto Final: USD ${total}</div>
    <button class="btn btn-whatsapp" id="btn-whatsapp-consulta" style="width: 100%; margin-top: 15px;">
        Consultar por WhatsApp 💬
    </button>
  `;
  
  // Agregar listener al nuevo botón de WhatsApp
  document.getElementById('btn-whatsapp-consulta').addEventListener('click', () => {
    const mensaje = `¡Hola! Consulto por un presupuesto:
- *Cliente:* ${nombre}
- *Sitio:* ${tipoSitio.tipo}
- *Extras:* ${mensajeExtras}
- *Total:* USD ${total}`;
    
    const url = `https://wa.me/5491121882339?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });

  mostrarSeccion(resultado);
  
  const fechaActual = new Date();
  const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
  
  const presupuesto = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    tipoSitio: tipoSitio.tipo,
    extras: extrasElegidos.map(extra => extra.nombre),
    total: total,
    fecha: fechaFormateada
  };
  
  guardarPresupuestoEnStorage(presupuesto);

  Swal.fire({
    icon: 'success',
    title: '¡Presupuesto creado!',
    text: `Presupuesto para ${nombre} guardado correctamente.`,
    timer: 2500,
    showConfirmButton: false
  });
}

btnCrearPresupuesto.addEventListener('click', () => {
  mostrarSeccion(formPresupuesto);
  document.getElementById('nombre-cliente').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefono').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

btnVerSitios.addEventListener('click', () => {
  mostrarListaSitios();
  mostrarSeccion(infoSitios);
});

btnVerExtras.addEventListener('click', () => {
  mostrarListaExtras();
  mostrarSeccion(infoExtras);
});

btnCancelar.addEventListener('click', volverAlMenu);
btnVolverSitios.addEventListener('click', volverAlMenu);
btnVolverExtras.addEventListener('click', volverAlMenu);
btnVolverResultado.addEventListener('click', volverAlMenu);

btnEditarPresupuesto.addEventListener('click', () => {
  mostrarSeccion(formPresupuesto);
});

btnNuevoPresupuesto.addEventListener('click', () => {
  mostrarSeccion(formPresupuesto);
  document.getElementById('nombre-cliente').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefono').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

presupuestoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre-cliente').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  
  if (nombre === '' || email === '' || telefono === '') {
    return;
  }
  
  // Validación de nombre: solo letras y espacios
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regexNombre.test(nombre)) {
    Swal.fire({
      icon: 'error',
      title: 'Nombre inválido',
      text: 'Por favor, ingrese un nombre válido (solo letras).',
    });
    return;
  }
  
  const tipoSeleccionado = document.querySelector('input[name="tipo-sitio"]:checked');
  const tipoSitio = preciosSitio[parseInt(tipoSeleccionado.value)];
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]:checked');
  const extrasElegidos = Array.from(extrasCheckboxes).map(checkbox => extras[parseInt(checkbox.value)]);
  const total = calcularPresupuesto(tipoSitio, extrasElegidos);
  mostrarResultado(nombre, email, telefono, tipoSitio, extrasElegidos, total);
});

function cargarPresupuestoEdicion() {
  const pEdit = JSON.parse(localStorage.getItem("presupuestoActual"));
  
  if (pEdit) {
    // 1. Muestra el formulario
    mostrarSeccion(formPresupuesto);
    
    // 2. Llena los campos de texto
    document.getElementById('nombre-cliente').value = pEdit.nombre;
    document.getElementById('email').value = pEdit.email;
    document.getElementById('telefono').value = pEdit.telefono;
    
    // 3. Marca el radio del tipo de sitio
    const radioADiv = Array.from(document.querySelectorAll('input[name="tipo-sitio"]'))
      .find(radio => preciosSitio[radio.value].tipo === pEdit.tipoSitio);
    if (radioADiv) radioADiv.checked = true;
    
    // 4. Marca los checkboxes de los extras
    // Primero desmarca todos por seguridad
    document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
    
    // Marca los que coincidan con los nombres guardados
    pEdit.extras.forEach(extraNombre => {
      const cb = Array.from(document.querySelectorAll('input[name="extras"]'))
        .find(checkbox => extras[checkbox.value].nombre === extraNombre);
      if (cb) cb.checked = true;
    });
    
    // 5. Borra del storage para que no se cargue de nuevo al refrescar
    localStorage.removeItem("presupuestoActual");
  }
}
 
let preciosSitio = [];
let extras = [];
const URL_PRECIO = "../db/precio.json";
const URL_EXTRAS = "../db/extras.json";
function inicializarApp() {
 
  
  fetch(URL_PRECIO)
    .then(response => response.json())
    .then(data => {
      preciosSitio = data;
      generarTiposSitio();
    });
  
  fetch(URL_EXTRAS)
    .then(response => response.json())
    .then(data => {
      extras = data;
      generarExtras();
    });
  
  // Verificamos si venimos de editar un presupuesto del carrito
  cargarPresupuestoEdicion();
  
  // Si no se cargó nada para editar, volvemos al menú (esto maneja el caso por defecto)
  if (!localStorage.getItem("presupuestoActual") && !formPresupuesto.classList.contains('active')) {
    volverAlMenu();
  }
}

inicializarApp();

