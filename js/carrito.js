const carrito = JSON.parse(localStorage.getItem("historialPresupuestos")) || [];

const listaCarrito = document.getElementById('lista-carrito');
const btnLimpiarCarrito = document.getElementById('btn-limpiar-carrito');


function mostrarCarrito() {
  listaCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    const mensajeVacio = document.createElement('div');
    mensajeVacio.className = 'carrito-vacio';
    mensajeVacio.innerHTML = `
      <p class="carrito-vacio-mensaje">
        🛒 No hay presupuestos en el carrito aún.
      </p>
      <p class="carrito-vacio-submensaje">
        Crea tu primer presupuesto para verlo aquí.
      </p>
    `;
    listaCarrito.appendChild(mensajeVacio);
    return;
  }
  
  //Calculo del total antes de renderizar
  const totalGeneral = carrito.reduce((total, p) => total + p.total, 0);
  
  carrito.forEach((presupuesto, indice) => {
    const card = document.createElement('div');
    card.className = 'historial-card';
    
    const extrasTexto = presupuesto.extras.length > 0 ? presupuesto.extras.join(', ') : 'Ninguno';

    card.innerHTML = `
      <div class="historial-fecha">${presupuesto.fecha}</div>
      <div class="historial-item"><strong>Cliente:</strong> ${presupuesto.nombre}</div>
      <div class="historial-item"><strong>Email:</strong> ${presupuesto.email}</div>
      <div class="historial-item"><strong>Teléfono:</strong> ${presupuesto.telefono}</div>
      <div class="historial-item"><strong>Tipo de Sitio:</strong> ${presupuesto.tipoSitio}</div>
      <div class="historial-item"><strong>Extras:</strong> ${extrasTexto}</div>
      <div class="historial-total">USD ${presupuesto.total}</div>
      <div class="card-actions">
          <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
          <button class="btn-editar" data-indice="${indice}">Editar</button>
          <button class="btn-whatsapp-item" data-indice="${indice}">Consultar 💬</button>
      </div>
    `;
    
    //botones creado dentro del innerHTML
    card.querySelector('.btn-eliminar').addEventListener('click', () => eliminarPresupuesto(indice));
    card.querySelector('.btn-editar').addEventListener('click', () => editarPresupuesto(indice));
    card.querySelector('.btn-whatsapp-item').addEventListener('click', () => consultarWhatsApp(indice));
    
    listaCarrito.appendChild(card);
  });
  
  const resumenTotal = document.createElement('div');
  resumenTotal.className = 'resumen-total';
  resumenTotal.innerHTML = `
    <div class="resumen-total-cantidad">Total de Presupuestos: ${carrito.length}</div>
    <div class="resumen-total-precio">Total General: USD ${totalGeneral}</div>
  `;
  
  listaCarrito.appendChild(resumenTotal);
}

function eliminarPresupuesto(indice) {
  Swal.fire({
    title: '¿Eliminar presupuesto?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.splice(indice, 1);
      localStorage.setItem("historialPresupuestos", JSON.stringify(carrito));
      mostrarCarrito();
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El presupuesto fue eliminado.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

function editarPresupuesto(indice) {
  const presupuesto = carrito[indice];
  localStorage.setItem("presupuestoActual", JSON.stringify(presupuesto));
  window.location.href = "../index.html";
}

function consultarWhatsApp(indice) {
  const p = carrito[indice];
  const mensaje = `¡Hola! Consulto por mi presupuesto guardado:
- *Cliente:* ${p.nombre}
- *Sitio:* ${p.tipoSitio}
- *Extras:* ${p.extras.length > 0 ? p.extras.join(', ') : 'Ninguno'}
- *Total:* USD ${p.total}`;

  const url = `https://wa.me/5491121882339?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function limpiarCarrito() {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'No hay presupuestos para eliminar.',
    });
    return;
  }

  Swal.fire({
    title: '¿Vaciar el carrito?',
    text: 'Se eliminarán todos los presupuestos guardados.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, vaciar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.length = 0;
      localStorage.removeItem("historialPresupuestos");
      mostrarCarrito();
      Swal.fire({
        icon: 'success',
        title: 'Carrito vaciado',
        text: 'Todos los presupuestos fueron eliminados.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

mostrarCarrito();