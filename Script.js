// Clase que referencia a las tareas
class Tarea {
  constructor(id, titulo, completada = false) {
    //modofica la clase para aceptar el estado de completada en el constructor
    this.id = id;
    this.titulo = titulo;
    this.completada = completada; //nuevo atributo
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

  agregarTarea(id, titulo, completada = false) {
    //modificas el metodo para aceptar el estado de completada
    //
    const nueva = new Tarea(id, titulo, completada);
    this.tareas.push(nueva);
  }

  listarTareas() {
    console.clear();
    this.tareas.forEach((t) =>
      console.log(`${t.id} - ${t.titulo} - ${t.completada ? 'COMPLETA' : 'INCOMPLETA'}`));
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find((t) => t.titulo === titulo);
  }

  listarCompletadas() {
    return this.tareas.filter((t) => t.completada);
  }
}

//Diccionario
const CHAT_COMPONENT = {
  ELEMENTS: {
    LIST: document.querySelector("#listaTareas"),
    FORM: document.querySelector("#formTarea"),
    INPUT: document.querySelector("#tituloTarea"),
  },
};

//Carga el array de tareas con un retardo simulado por promesa
function cargarTareas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Tarea(1, "Estudiar React"),
        new Tarea(2, "Transcribir codigo"),
        new Tarea(3, "Probar la ejecucion"),
      ]);
    }, 2000);
  });
}

//Instacio a la clase 
const gestor = new GestorTareas();

async function iniciar() {
  //Consigna para el flujo
  const tareasIniciales = await cargarTareas();
  tareasIniciales.forEach((t) => gestor.tareas.push(t));

  //chequeo que este todo bien cargado
  console.log("Tareas cargadas ok!! ");
  renderizar();
}

CHAT_COMPONENT.ELEMENTS.FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = CHAT_COMPONENT.ELEMENTS.INPUT.value.trim();
  if (!titulo) return;

  const id = gestor.tareas.length + 1;

  // Agrego la tarea como incompleta
  gestor.agregarTarea(id, titulo);

  // Busco la tarea recién agregada
  const nuevaTarea = gestor.tareas.find((t) => t.id === id);
  if (nuevaTarea) {
    nuevaTarea.toggleEstado(); // Cambio su estado
  }

  CHAT_COMPONENT.ELEMENTS.INPUT.value = "";
  renderizar();
});

function renderizar(lista = gestor.tareas) {
  CHAT_COMPONENT.ELEMENTS.LIST.innerHTML = "";

  lista.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.id} - ${t.titulo} - ${t.completada ? 'COMPLETA' : 'INCOMPLETA'}`;

    li.style.cursor = "pointer"; // Cambio el estilo del cursor al pasar el mouse

    li.addEventListener("click", () => {
      t.toggleEstado();
      renderizar(); // vuelve a mostrar todas después de cambiar estado
    });
    CHAT_COMPONENT.ELEMENTS.LIST.appendChild(li);
  });
}

iniciar();
