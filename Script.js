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

class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(titulo) {
    const nueva = new Tarea(Date.now(), titulo);
    this.tareas.push(nueva);
  }

  listarTareas() {
    console.clear();
    this.tareas.forEach(t => console.log(`${t.titulo} - ${t.completada ? '✔' : '❌'}`));
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(t => t.titulo === titulo);
  }

  listarCompletadas() {
    return this.tareas.filter(t => t.completada);
  }
}

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
const lista = document.getElementById("listaTareas");
const form = document.getElementById("formTarea");

async function iniciar() {
  const tareasIniciales = await cargarTareas();
  tareasIniciales.forEach(t => gestor.tareas.push(t));
  console.log("Tareas cargadas correctamente");
  renderizar();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const titulo = document.getElementById("tituloTarea").value;
  gestor.agregarTarea(titulo);
  document.getElementById("tituloTarea").value = "";
  renderizar();
});

function renderizar() {
  lista.innerHTML = "";
  gestor.tareas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.titulo} - ${t.completada ? '✔' : '❌'}`;
    li.addEventListener("click", () => {
      t.toggleEstado();
      renderizar();
    });
    lista.appendChild(li);
  });
}

iniciar();

