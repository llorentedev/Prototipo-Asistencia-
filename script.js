// Lista simulada de estudiantes
const estudiantes = {
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

// Set para control local de asistencias
const registrados = new Set();

// ✅ URL del Apps Script (tu última versión)
const URL_GOOGLE_SHEETS = "https://script.google.com/macros/s/AKfycbwxISaVHhxOFxDgl018eKDYG8bgqdoLFNtzq9QptLjJ8r82M1YRGZ6Nhrjnjz7eT29x6g/exec";

// ✅ Guardar asistencia individual (insertar arriba y eliminar faltante si existía)
function guardarEnSheets(codigo, nombre, apellido, curso, estado) {
  fetch(URL_GOOGLE_SHEETS, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accion: "asistencia",
      CODIGO: codigo,
      NOMBRE: nombre,
      APELLIDO: apellido,
      CURSO: curso,
      ESTADO: estado
    })
  });
}

// ✅ Verificar código ingresado
function verificarCodigo() {
  const input = document.getElementById("codigoInput").value.trim();
  const resultado = document.getElementById("resultado");

  if (estudiantes[input]) {
    const est = estudiantes[input];
    if (registrados.has(input)) {
      resultado.innerHTML = `ℹ️ ${est.nombre} ${est.apellido} ya había registrado asistencia.`;
      resultado.style.color = "orange";
    } else {
      registrados.add(input);
      resultado.innerHTML = `✅ ${est.nombre} ${est.apellido} - ${est.curso} - Asistencia registrada`;
      resultado.style.color = "green";
      guardarEnSheets(input, est.nombre, est.apellido, est.curso, "ASISTIÓ");
    }
  } else {
    resultado.innerHTML = `❌ No se detectó asistencia`;
    resultado.style.color = "red";
  }

  document.getElementById("codigoInput").value = "";
}

// ✅ Mostrar lista de estudiantes en pantalla
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

// ✅ Limpiar asistencias en Sheets y local
function formatearBase() {
  fetch(URL_GOOGLE_SHEETS + "?accion=limpiar", { method: "GET" })
    .then(() => {
      alert("📄 Solo las asistencias fueron borradas.");
      registrados.clear();
    })
    .catch(() => {
      alert("❌ Error al intentar limpiar la base.");
    });
}

// ✅ Enviar faltantes al cargar (empezando 9 filas después de la última)
function enviarFaltantes() {
  const faltantes = [];

  for (const codigo in estudiantes) {
    if (!registrados.has(codigo)) {
      const est = estudiantes[codigo];
      faltantes.push({
        CODIGO: codigo,
        NOMBRE: est.nombre,
        APELLIDO: est.apellido,
        CURSO: est.curso
      });
    }
  }

  if (faltantes.length > 0) {
    fetch(URL_GOOGLE_SHEETS, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accion: "faltantes",
        faltantes: faltantes
      })
    });
  }
}

// ✅ Ejecutar al cargar la página
window.onload = function () {
  enviarFaltantes();
};
