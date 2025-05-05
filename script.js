// Crear cuenta
function crearCuenta() {
  const usuario = document.getElementById("nuevo-usuario").value;
  const clave = document.getElementById("nueva-clave").value;

  if (usuario && clave) {
    localStorage.setItem(usuario, clave);
    alert("Cuenta creada. Ahora inicia sesión.");
  } else {
    alert("Completa los campos para registrarte.");
  }
}

// Iniciar sesión
function iniciarSesion() {
  const usuario = document.getElementById("login-usuario").value;
  const clave = document.getElementById("login-clave").value;
  const claveGuardada = localStorage.getItem(usuario);

  if (clave === claveGuardada) {
    localStorage.setItem("usuarioActivo", usuario);
    window.location.href = "foro.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

// Mostrar nombre en foro
if (document.getElementById("usuario-nombre")) {
  const usuario = localStorage.getItem("usuarioActivo");
  document.getElementById("usuario-nombre").textContent = usuario;

  cargarMensajes();
}

// Enviar mensaje
function enviarMensaje() {
  const usuario = localStorage.getItem("usuarioActivo");
  const mensaje = document.getElementById("mensaje").value;

  if (mensaje) {
    const mensajes = JSON.parse(localStorage.getItem("mensajes") || "[]");
    mensajes.push({ usuario, mensaje });
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
    cargarMensajes();
    document.getElementById("mensaje").value = "";
  }
}

// Mostrar mensajes
function cargarMensajes() {
  const contenedor = document.getElementById("mensajes");
  const mensajes = JSON.parse(localStorage.getItem("mensajes") || "[]");
  contenedor.innerHTML = mensajes.map(m => `<p><b>${m.usuario}:</b> ${m.mensaje}</p>`).join("");
}
