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

function pedirTipoSitio() {
  let opcion = prompt("Ingrese el número del tipo de sitio:\n1-Landing\n2-Institucional\n3-Tienda online");
  let indice = parseInt(opcion) - 1;
  
  // Validar que sea una opción válida (0, 1 o 2)
  if (indice === 0 || indice === 1 || indice === 2) {
    return preciosSitio[indice];
  } else {
    alert("Opción inválida. Se seleccionó Landing por defecto.");
    return preciosSitio[0];
  }
}

function pedirExtras() {
  let extrasElegidos = [];
  
  // Usar FOR-OF para recorrer todos los extras
  for (let extra of extras) {
    if (confirm("¿Desea agregar " + extra.nombre + " (USD " + extra.precio + ")?")) {
      extrasElegidos.push(extra);
    }
  }
  
  return extrasElegidos;
}

function calcularPresupuesto(tipoSitio, extrasElegidos) {
  let total = tipoSitio.precio;

  for (let extra of extrasElegidos) {
    total += extra.precio;
  }

  return total;
}

function mostrarResultado(nombre, tipoSitio, extrasElegidos, total) {
  let mensajeExtras = "";
  let tieneExtras = false;
  
  // Construir mensaje de extras manualmente
  for (let extra of extrasElegidos) {
    if (mensajeExtras !== "") {
      mensajeExtras += ", ";
    }
    mensajeExtras += extra.nombre;
    tieneExtras = true;
  }
  
  // Si no tiene extras, mostrar "Ninguno"
  if (tieneExtras === false) {
    mensajeExtras = "Ninguno";
  }
    
  alert("Cliente: " + nombre + 
        "\nTipo de sitio: " + tipoSitio.tipo + 
        "\nExtras: " + mensajeExtras + 
        "\nPresupuesto final: USD " + total);
        
  console.log("Cliente:", nombre);
  console.log("Tipo de sitio:", tipoSitio.tipo);
  console.log("Extras:", mensajeExtras);
  console.log("Total: USD", total);
}

function mostrarMenu() {
  let menu = "=== SIMULADOR DE PRESUPUESTOS ===\n\n";
  menu += "1 - Crear nuevo presupuesto\n";
  menu += "2 - Ver tipos de sitios disponibles\n";
  menu += "3 - Ver extras disponibles\n";
  menu += "4 - Salir\n\n";
  menu += "Ingrese una opción:";
  
  let opcion = prompt(menu);
  return opcion;
}

function mostrarTiposSitios() {
  let mensaje = "=== TIPOS DE SITIOS DISPONIBLES ===\n\n";
  
  for (let sitio of preciosSitio) {
    mensaje += sitio.tipo + ": USD " + sitio.precio + "\n";
  }
  
  alert(mensaje);
}

function mostrarExtrasDisponibles() {
  let mensaje = "=== EXTRAS DISPONIBLES ===\n\n";
  
  for (let extra of extras) {
    mensaje += extra.nombre + ": USD " + extra.precio + "\n";
  }
  
  alert(mensaje);
}

function crearPresupuesto() {
  let nombre = prompt("Ingrese su nombre:");
  
  if (nombre === null || nombre === "") {
    alert("Debe ingresar un nombre para continuar.");
    return;
  }
  
  let tipoElegido = pedirTipoSitio();
  let extrasElegidos = pedirExtras();
  
  const total = calcularPresupuesto(tipoElegido, extrasElegidos);
  mostrarResultado(nombre, tipoElegido, extrasElegidos, total);
}

function iniciarSimulador() {
  let continuar = true;

  while (continuar) {
    let opcion = mostrarMenu();
    
    if (opcion === "1") {
      crearPresupuesto();
    } else if (opcion === "2") {
      mostrarTiposSitios();
    } else if (opcion === "3") {
      mostrarExtrasDisponibles();
    } else if (opcion === "4") {
      alert("¡Gracias por usar nuestro simulador!");
      continuar = false;
    } else {
      alert("Opción inválida. Por favor ingrese un número del 1 al 4.");
    }
  }
}

iniciarSimulador();
