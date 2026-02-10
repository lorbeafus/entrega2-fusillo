const carrito = JSON.parse(localStorage.getItem("historialPresupuestos")) || [];

const listaCarrito = document.getElementById('lista-carrito');
const btnLimpiarCarrito = document.getElementById('btn-limpiar-carrito');

function mostrarCarrito() {
  listaCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    const mensajeVacio = document.createElement('div');
    mensajeVacio.className = 'carrito-vacio';
    mensajeVacio.innerHTML = `
      <p style="text-align: center; color: #999; font-size: 1.2rem; padding: 40px 20px;">
        🛒 No hay presupuestos en el carrito aún.
      </p>
      <p style="text-align: center; color: #666; margin-bottom: 20px;">
        Crea tu primer presupuesto para verlo aquí.
      </p>
    `;
    listaCarrito.appendChild(mensajeVacio);
    return;
  }
  
  let totalGeneral = 0;
  
  for (const presupuesto of carrito) {
    const card = document.createElement('div');
    card.className = 'historial-card';
    
    const fecha = document.createElement('div');
    fecha.className = 'historial-fecha';
    fecha.textContent = presupuesto.fecha;
    
    const cliente = document.createElement('div');
    cliente.className = 'historial-item';
    cliente.innerHTML = `<strong>Cliente:</strong> ${presupuesto.nombre}`;
    
    const tipo = document.createElement('div');
    tipo.className = 'historial-item';
    tipo.innerHTML = `<strong>Tipo de Sitio:</strong> ${presupuesto.tipoSitio}`;
    
    const extrasTexto = presupuesto.extras.length > 0 ? presupuesto.extras.join(', ') : 'Ninguno';
    const extrasDiv = document.createElement('div');
    extrasDiv.className = 'historial-item';
    extrasDiv.innerHTML = `<strong>Extras:</strong> ${extrasTexto}`;
    
    const total = document.createElement('div');
    total.className = 'historial-total';
    total.textContent = `USD ${presupuesto.total}`;
    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.marginTop = '10px';
    btnEliminar.style.padding = '8px 15px';
    btnEliminar.style.background = '#ff4757';
    btnEliminar.style.color = 'white';
    btnEliminar.style.border = 'none';
    btnEliminar.style.borderRadius = '5px';
    btnEliminar.style.cursor = 'pointer';
    btnEliminar.style.fontSize = '0.9rem';
    btnEliminar.style.transition = 'background 0.3s ease';
    
    btnEliminar.addEventListener('mouseenter', () => {
      btnEliminar.style.background = '#ee5a6f';
    });
    
    btnEliminar.addEventListener('mouseleave', () => {
      btnEliminar.style.background = '#ff4757';
    });
    
    const indice = carrito.indexOf(presupuesto);
    btnEliminar.addEventListener('click', () => eliminarPresupuesto(indice));
    
    card.appendChild(fecha);
    card.appendChild(cliente);
    card.appendChild(tipo);
    card.appendChild(extrasDiv);
    card.appendChild(total);
    card.appendChild(btnEliminar);
    
    listaCarrito.appendChild(card);
    
    totalGeneral += presupuesto.total;
  }
  
  const resumenTotal = document.createElement('div');
  resumenTotal.className = 'resumen-total';
  resumenTotal.style.marginTop = '30px';
  resumenTotal.style.padding = '25px';
  resumenTotal.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  resumenTotal.style.borderRadius = '15px';
  resumenTotal.style.color = 'white';
  resumenTotal.style.textAlign = 'center';
  resumenTotal.innerHTML = `
    <div style="font-size: 1.1rem; margin-bottom: 10px;">Total de Presupuestos: ${carrito.length}</div>
    <div style="font-size: 1.8rem; font-weight: 700;">Total General: USD ${totalGeneral}</div>
  `;
  
  listaCarrito.appendChild(resumenTotal);
}

function eliminarPresupuesto(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("historialPresupuestos", JSON.stringify(carrito));
  mostrarCarrito();
}

function limpiarCarrito() {
  if (carrito.length === 0) {
    return;
  }
  
  carrito.length = 0;
  localStorage.removeItem("historialPresupuestos");
  mostrarCarrito();
}

btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

mostrarCarrito();