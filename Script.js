// Clase que referencia a las tareas
class Tarea {
  constructor(id, titulo) {
    this.id = id;
    this.titulo = titulo;
    this.completada = false;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

// clase para gestionar las tareas 
class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(id, titulo) {
//
    const nueva = new Tarea(id, titulo);
    this.tareas.push(nueva);
  }

  listarTareas() {
    console.clear();
    this.tareas.forEach(t => console.log(`${t.id} - ${t.titulo} - ${t.completada ? '✔' : '❌'}`));
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(t => t.titulo === titulo);
  }

  listarCompletadas() {
    return this.tareas.filter(t => t.completada);
  }
}

//Diccionario
const CHAT_COMPONENT = {
    ELEMENTS: {
        LIST: document.querySelector('#listaTareas'),
        FORM: document.querySelector('#formTarea'),
        INPUT: document.querySelector('#tituloTarea'),
//        FILTER_COMPLETED: document.querySelector('#botonFiltrarCompletadas')
    }
}

//Carga el array de tareas con un retardo simulado por promesa
function cargarTareas() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        new Tarea(1, "Estudiar JavaScript"),
        new Tarea(2, "Leer documentación"),
        new Tarea(3, "Practicar ejercicios")
      ]);
    }, 2000);
  });
}

const gestor = new GestorTareas();

async function iniciar() {
  //Consigna para el flujo
  const tareasIniciales = await cargarTareas();
  tareasIniciales.forEach(t => gestor.tareas.push(t));

  //chequeo que este todo bien cargado
  console.log("Tareas cargadas correctamente");
  renderizar();
}

//form.addEventListener("submit", e => {
  CHAT_COMPONENT.ELEMENTS.FORM.addEventListener("submit", e => {
  e.preventDefault();

  const titulo = document.getElementById("tituloTarea").value;

//gestor.agregarTarea(titulo);  
  const id = gestor.tareas.length + 1; // Generar un ID simple basado en la longitud actual
  gestor.agregarTarea(id, titulo);
  document.getElementById("tituloTarea").value = "";// Blanqueo el titulo para la proxima carga
  renderizar();
});


function renderizar() {
 // lista.innerHTML = "";
  CHAT_COMPONENT.ELEMENTS.LIST.innerHTML = "";
  gestor.tareas.forEach(t => {
    const li = document.createElement("li");

    li.textContent =`${t.id} - ${t.titulo} - ${t.completada ? '✔' : '❌'}`;
    li.addEventListener("click", () => {
    t.toggleEstado();   
    renderizar();
    });
    CHAT_COMPONENT.ELEMENTS.LIST.appendChild(li);
  });
}

iniciar();




