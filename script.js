
const estudiantes = {                                                                       // Lista
  "2025001": { nombre: "Juan Diego", apellido: "Llorente", curso: "3ro Bachillerato A" },
  "2025002": { nombre: "Ana", apellido: "Fernández", curso: "3ro Bachillerato A" },
  "2025003": { nombre: "Carlos", apellido: "Sánchez", curso: "3ro Bachillerato A" },
  "2025004": { nombre: "Valeria", apellido: "Gómez", curso: "3ro Bachillerato A" },
  "2025005": { nombre: "Miguel", apellido: "Torres", curso: "3ro Bachillerato A" },
  "2025006": { nombre: "Lucía", apellido: "Morales", curso: "3ro Bachillerato A" },
  "2025007": { nombre: "José", apellido: "Ramírez", curso: "3ro Bachillerato A" },
  "2025008": { nombre: "Camila", apellido: "Castillo", curso: "3ro Bachillerato A" },
  "2025009": { nombre: "Javier", apellido: "López", curso: "3ro Bachillerato A" },
  "2025010": { nombre: "Mariana", apellido: "Vega", curso: "3ro Bachillerato A" },
  "2025011": { nombre: "Sebastián", apellido: "Herrera", curso: "3ro Bachillerato A" },
  "2025012": { nombre: "Daniela", apellido: "Cruz", curso: "3ro Bachillerato A" },
  "2025013": { nombre: "Andrés", apellido: "Jiménez", curso: "3ro Bachillerato A" },
  "2025014": { nombre: "Paola", apellido: "Navarro", curso: "3ro Bachillerato A" },
  "2025015": { nombre: "Diego", apellido: "Ríos", curso: "3ro Bachillerato A" }
};


//Un set para guardar los que ya registraron asistencia

const registrados = new Set();

// Función principal para verificar el código ingresado

function verificarCodigo() {
  const input = document.getElementById("codigoInput").value.trim();
  const resultado = document.getElementById("resultado");

  if (estudiantes[input]) {
    const est = estudiantes[input];
    registrados.add(input); // Registrar asistencia
    resultado.innerHTML = `✅ ${est.nombre} ${est.apellido} - ${est.curso} - Asistencia registrada`;
    resultado.style.color = "green";
  } else {
    resultado.innerHTML = `❌ No se detectó asistencia`;
    resultado.style.color = "red";
  }

  document.getElementById("codigoInput").value = "";
}


// Función para mostrar la lista de todos los estudiantes y su estado

function mostrarLista() {
  const listaDiv = document.getElementById("listaAsistencia");
  if (listaDiv.style.display === "none") {
    let html = "<strong>Lista de estudiantes:</strong><br><br>";
    for (const codigo in estudiantes) {
      const est = estudiantes[codigo];
      const asistio = registrados.has(codigo) ? "✅ Asistencia" : "❌ Sin registrar";
      html += `${est.nombre} ${est.apellido} (${est.curso})<br>${asistio}<br><br>`;
    }
    listaDiv.innerHTML = html;
    listaDiv.style.display = "block";
  } else {
    listaDiv.style.display = "none";
  }
}
