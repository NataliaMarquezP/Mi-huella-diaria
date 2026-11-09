/*
 * app.js — Lógica de "Mi Huella Diaria".
 * Almacenamiento: localStorage (claves "actividades" y "perfil"). Sin servidor.
 */

// ---------- Almacenamiento ----------
const Almacen = {
  leer(clave, porDefecto) {
    try {
      const v = localStorage.getItem(clave);
      return v ? JSON.parse(v) : porDefecto;
    } catch (e) { return porDefecto; }
  },
  guardar(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { mostrarToast("No se pudo guardar"); }
  }
};

const obtenerActividades = () => Almacen.leer("actividades", []);
const obtenerPerfil = () => Almacen.leer("perfil", { nombre: "", habitos: [], metaCO2Mes: 0 });
const obtenerInsigniasGanadas = () => Almacen.leer("insignias", []);

// ---------- Utilidades de fecha ----------
function fechaLocal(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function sumarDias(fechaStr, dias) {
  const [a, m, d] = fechaStr.split("-").map(Number);
  return fechaLocal(new Date(a, m - 1, d + dias));
}
const mesDe = (fechaStr) => fechaStr.slice(0, 7); // "YYYY-MM"
function mesAnterior(mes) {
  const [a, m] = mes.split("-").map(Number);
  const d = new Date(a, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function formatoNumero(n, dec = 1) {
  return Number(n).toLocaleString("es-CL", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function nombreMes(mes) {
  const [a, m] = mes.split("-").map(Number);
  return new Date(a, m - 1, 1).toLocaleDateString("es-CL", { month: "long", year: "numeric" });
}

// ---------- Cálculos ----------
function calcularCO2(categoria, tipo, cantidad) {
  const info = FACTORES[categoria] && FACTORES[categoria].tipos[tipo];
  return info ? cantidad * info.factor : 0;
}
function totalesPorMes(acts, mes) {
  const t = { co2: 0, transporte: 0, electricidad: 0, alimentacion: 0, recicladoKg: 0, kwh: 0 };
  acts.filter((a) => mesDe(a.fecha) === mes).forEach((a) => {
    t.co2 += a.co2Kg;
    t[a.categoria] += a.co2Kg;
    if (a.categoria === "reciclaje") t.recicladoKg += a.cantidad;
    if (a.categoria === "electricidad") t.kwh += a.cantidad;
  });
  return t;
}

// ---------- Condiciones de insignias (usadas en datos.js) ----------
function rachaMaxima(acts) {
  const fechas = [...new Set(acts.map((a) => a.fecha))].sort();
  let max = 0, actual = 0, previa = null;
  fechas.forEach((f) => {
    actual = previa && sumarDias(previa, 1) === f ? actual + 1 : 1;
    max = Math.max(max, actual);
    previa = f;
  });
  return max;
}
const ES_AUTO = ["auto_sedan", "auto_4x4", "moto"];
function diaSinAuto(acts) {
  const porDia = {};
  acts.filter((a) => a.categoria === "transporte").forEach((a) => {
    porDia[a.fecha] = porDia[a.fecha] || { auto: false, limpio: false };
    if (ES_AUTO.includes(a.tipo)) porDia[a.fecha].auto = true; else porDia[a.fecha].limpio = true;
  });
  return Object.values(porDia).some((d) => d.limpio && !d.auto);
}
function semanaSinAuto(acts) {
  const trans = acts.filter((a) => a.categoria === "transporte");
  const diasConAuto = new Set(trans.filter((a) => ES_AUTO.includes(a.tipo)).map((a) => a.fecha));
  const diasLimpios = [...new Set(trans.map((a) => a.fecha))].filter((f) => !diasConAuto.has(f)).sort();
  let actual = 0, previa = null;
  for (const f of diasLimpios) {
    actual = previa && sumarDias(previa, 1) === f ? actual + 1 : 1;
    if (actual >= 7) return true;
    previa = f;
  }
  return false;
}
function electricidadALaBaja(acts) {
  const meses = [...new Set(acts.filter((a) => a.categoria === "electricidad").map((a) => mesDe(a.fecha)))];
  return meses.some((mes) => {
    const ant = mesAnterior(mes);
    if (!meses.includes(ant)) return false;
    return totalesPorMes(acts, mes).kwh < totalesPorMes(acts, ant).kwh;
  });
}
function metaCumplida(acts, perfil) {
  if (!perfil || !perfil.metaCO2Mes) return false;
  const mesActual = mesDe(fechaLocal());
  const mesesCerrados = [...new Set(acts.map((a) => mesDe(a.fecha)))].filter((m) => m < mesActual);
  return mesesCerrados.some((m) => totalesPorMes(acts, m).co2 <= perfil.metaCO2Mes);
}

function revisarInsignias() {
  const acts = obtenerActividades();
  const perfil = obtenerPerfil();
  const ganadas = obtenerInsigniasGanadas();
  const nuevas = INSIGNIAS.filter((i) => !ganadas.includes(i.id) && i.cumple(acts, perfil));
  if (nuevas.length) {
    Almacen.guardar("insignias", ganadas.concat(nuevas.map((i) => i.id)));
    mostrarToast(`¡Nueva insignia: ${nuevas.map((i) => i.icono + " " + i.nombre).join(", ")}!`, 3500);
  }
}

// ---------- Interfaz ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function escapar(t) {
  const div = document.createElement("div");
  div.textContent = t;
  return div.innerHTML;
}

let toastTimer;
function mostrarToast(texto, ms = 2200) {
  const t = $("#toast");
  t.textContent = texto;
  t.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("visible"), ms);
}

const historial = [];
function irA(id, guardarHistorial = true) {
  const actual = $(".vista.activa");
  if (actual && actual.id === id) return;
  if (guardarHistorial && actual) historial.push(actual.id);
  $$(".vista").forEach((v) => v.classList.remove("activa"));
  const vista = document.getElementById(id);
  vista.classList.add("activa");
  $("#titulo").textContent = vista.dataset.titulo || "Mi Huella Diaria";
  $("#btn-volver").classList.toggle("oculto", id === "vista-inicio");
  window.scrollTo(0, 0);
  const render = RENDERS[id];
  if (render) render();
}
function volver() {
  if (historial.length) irA(historial.pop(), false);
  else irA("vista-inicio", false);
}

// ---------- Vistas ----------
function renderInicio() {
  const perfil = obtenerPerfil();
  $("#saludo").textContent = perfil.nombre
    ? `Hola, ${perfil.nombre}. Registra tus hábitos y mira tu huella.`
    : "Registra tus hábitos y mira cuánto CO₂ generas.";
  const mes = mesDe(fechaLocal());
  const t = totalesPorMes(obtenerActividades(), mes);
  let html = `<p class="etiqueta">Este mes (${nombreMes(mes)})</p>
    <p class="cifra">${formatoNumero(t.co2)} <small>kg CO₂e</small></p>`;
  if (perfil.metaCO2Mes) {
    const pct = Math.min(100, (t.co2 / perfil.metaCO2Mes) * 100);
    const clase = pct >= 100 ? "excedido" : pct >= 80 ? "alerta" : "";
    html += `<div class="barra"><div class="relleno ${clase}" style="width:${pct}%"></div></div>
      <p class="nota">${formatoNumero(pct, 0)}% de tu límite de ${formatoNumero(perfil.metaCO2Mes, 0)} kg</p>`;
  } else {
    html += `<p class="nota">Define un límite mensual en "Perfil y meta".</p>`;
  }
  $("#tarjeta-mes").innerHTML = html;
}

function llenarTipos() {
  const cat = $("#reg-categoria").value;
  const info = FACTORES[cat];
  $("#reg-tipo").innerHTML = Object.entries(info.tipos)
    .map(([id, t]) => `<option value="${id}">${t.nombre}</option>`).join("");
  const etiquetas = { transporte: "Distancia (km)", electricidad: "Consumo (kWh)", alimentacion: "Cantidad (kg)", reciclaje: "Cantidad reciclada (kg)" };
  $("#reg-etiqueta-cantidad").textContent = etiquetas[cat];
  llenarChecklist();
  actualizarPreview();
}

function llenarChecklist() {
  const cont = $("#reg-checklist");
  if ($("#reg-categoria").value !== "reciclaje") {
    cont.classList.add("oculto");
    cont.innerHTML = "";
    return;
  }
  const mat = MATERIALES.find((m) => m.id === $("#reg-tipo").value);
  cont.classList.remove("oculto");
  cont.innerHTML = `<p class="etiqueta">¿Preparaste el material?</p>` +
    mat.pasos.map((p) => `<label class="check"><input type="checkbox" required> ${escapar(p)}</label>`).join("");
}

function actualizarPreview() {
  const cat = $("#reg-categoria").value;
  const cant = parseFloat($("#reg-cantidad").value);
  const p = $("#reg-preview");
  if (!cant || cant <= 0) { p.textContent = ""; return; }
  if (cat === "reciclaje") {
    p.textContent = `Sumarás ${formatoNumero(cant)} kg reciclados.`;
    return;
  }
  const co2 = calcularCO2(cat, $("#reg-tipo").value, cant);
  let txt = `Equivale a ${formatoNumero(co2, 2)} kg CO₂e.`;
  if (cat === "transporte" && cant > 0) {
    const enAuto = calcularCO2("transporte", "auto_sedan", cant);
    const ahorro = enAuto - co2;
    if (ahorro > 0.005) txt += ` Ahorraste ${formatoNumero(ahorro, 2)} kg frente a ir en auto.`;
  }
  p.textContent = txt;
}

function guardarActividad(e) {
  e.preventDefault();
  const cantidad = parseFloat($("#reg-cantidad").value);
  if (!(cantidad > 0)) { mostrarToast("Ingresa una cantidad mayor que 0"); return; }
  const categoria = $("#reg-categoria").value;
  const tipo = $("#reg-tipo").value;
  const act = {
    id: String(Date.now()),
    fecha: $("#reg-fecha").value,
    categoria,
    tipo,
    cantidad,
    co2Kg: Math.round(calcularCO2(categoria, tipo, cantidad) * 1000) / 1000
  };
  const acts = obtenerActividades();
  acts.push(act);
  Almacen.guardar("actividades", acts);
  $("#reg-cantidad").value = "";
  llenarChecklist();
  actualizarPreview();
  mostrarToast("Actividad guardada");
  revisarInsignias();
}

function renderResumen() {
  const acts = obtenerActividades();
  const mes = mesDe(fechaLocal());
  const t = totalesPorMes(acts, mes);
  const filas = ["transporte", "electricidad", "alimentacion"].map((c) => {
    const pct = t.co2 > 0 ? (t[c] / t.co2) * 100 : 0;
    return `<div class="fila-cat"><span>${NOMBRES_CATEGORIA[c]}</span>
      <div class="barra chica"><div class="relleno" style="width:${pct}%"></div></div>
      <span>${formatoNumero(t[c])} kg</span></div>`;
  }).join("");
  $("#resumen-contenido").innerHTML = `<div class="tarjeta">
      <p class="etiqueta">${nombreMes(mes)}</p>
      <p class="cifra">${formatoNumero(t.co2)} <small>kg CO₂e</small></p>
      ${filas}
      <p class="nota">Reciclado este mes: ${formatoNumero(t.recicladoKg)} kg</p>
    </div>`;

  const ultimas = acts.slice().sort((a, b) => (b.fecha + b.id).localeCompare(a.fecha + a.id)).slice(0, 20);
  $("#lista-actividades").innerHTML = ultimas.length
    ? ultimas.map((a) => {
        const info = FACTORES[a.categoria].tipos[a.tipo];
        const detalle = a.categoria === "reciclaje" ? "reciclado" : `${formatoNumero(a.co2Kg, 2)} kg CO₂e`;
        return `<li><div><strong>${info ? info.nombre : a.tipo}</strong>
          <small>${a.fecha} · ${formatoNumero(a.cantidad)} ${FACTORES[a.categoria].unidad} · ${detalle}</small></div>
          <button class="eliminar" data-id="${a.id}" aria-label="Eliminar">✕</button></li>`;
      }).join("")
    : `<li class="vacio">Aún no hay actividades registradas.</li>`;
}

function eliminarActividad(id) {
  if (!confirm("¿Eliminar esta actividad?")) return;
  Almacen.guardar("actividades", obtenerActividades().filter((a) => a.id !== id));
  renderResumen();
}

function exportarDatos() {
  const datos = { exportado: new Date().toISOString(), perfil: obtenerPerfil(), actividades: obtenerActividades(), insignias: obtenerInsigniasGanadas() };
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mi-huella-${fechaLocal()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  mostrarToast("Datos exportados");
}

function compartirProgreso() {
  const t = totalesPorMes(obtenerActividades(), mesDe(fechaLocal()));
  const n = obtenerInsigniasGanadas().length;
  const texto = `Este mes registré ${formatoNumero(t.co2)} kg de CO₂e y reciclé ${formatoNumero(t.recicladoKg)} kg con Mi Huella Diaria. Llevo ${n} insignia(s). 🌱`;
  if (navigator.share) {
    navigator.share({ title: "Mi Huella Diaria", text: texto }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(() => mostrarToast("Texto copiado para compartir"));
  } else {
    prompt("Copia este texto:", texto);
  }
}

function borrarTodo() {
  if (!confirm("Esto borrará todas tus actividades, perfil e insignias. ¿Continuar?")) return;
  ["actividades", "perfil", "insignias"].forEach((k) => localStorage.removeItem(k));
  mostrarToast("Datos borrados");
  irA("vista-inicio", false);
  historial.length = 0;
}

function renderInsignias() {
  const ganadas = obtenerInsigniasGanadas();
  $("#lista-insignias").innerHTML = INSIGNIAS.map((i) => {
    const ok = ganadas.includes(i.id);
    return `<li class="insignia ${ok ? "ganada" : ""}">
      <span class="icono">${i.icono}</span>
      <strong>${i.nombre}</strong>
      <small>${i.descripcion}</small>
      <span class="estado">${ok ? "Obtenida" : "Pendiente"}</span></li>`;
  }).join("");
}

function renderConsejos() {
  const habitos = obtenerPerfil().habitos;
  const lista = habitos.length ? CONSEJOS.filter((c) => habitos.includes(c.categoria)) : CONSEJOS;
  $("#consejos-nota").textContent = habitos.length
    ? "Según los hábitos que marcaste en tu perfil."
    : "Marca tus hábitos en el perfil para ver consejos personalizados.";
  $("#lista-consejos").innerHTML = lista.map((c) =>
    `<li><span class="chip">${NOMBRES_CATEGORIA[c.categoria]}</span><p>${c.texto}</p></li>`).join("");
}

function renderReciclaje() {
  $("#lista-materiales").innerHTML = MATERIALES.map((m) => `<li>
      <h3>${m.icono} ${m.nombre}</h3>
      <ol>${m.pasos.map((p) => `<li>${p}</li>`).join("")}</ol>
      <p class="nota">${m.porque}</p></li>`).join("");
}

function renderRecursos() {
  $("#lista-recursos").innerHTML = RECURSOS.map((r) => `<li>
      <details><summary>${r.titulo}</summary><p>${r.texto}</p></details></li>`).join("");
}

function renderPerfil() {
  const p = obtenerPerfil();
  $("#perfil-nombre").value = p.nombre || "";
  $("#perfil-meta").value = p.metaCO2Mes || "";
  $$("#perfil-habitos input").forEach((cb) => { cb.checked = p.habitos.includes(cb.value); });
}

function guardarPerfil(e) {
  e.preventDefault();
  const perfil = {
    nombre: $("#perfil-nombre").value.trim(),
    habitos: [...$$("#perfil-habitos input:checked")].map((cb) => cb.value),
    metaCO2Mes: parseFloat($("#perfil-meta").value) || 0
  };
  Almacen.guardar("perfil", perfil);
  mostrarToast("Perfil guardado");
  revisarInsignias();
}

function renderMetodo() {
  $("#lista-factores").innerHTML = Object.entries(FACTORES)
    .filter(([cat]) => cat !== "reciclaje")
    .map(([cat, info]) => `<li><h3>${NOMBRES_CATEGORIA[cat]}</h3><ul class="factores">` +
      Object.values(info.tipos).map((t) =>
        `<li><strong>${t.nombre}:</strong> ${formatoNumero(t.factor, 3)} kg CO₂e/${info.unidad}<br><small>${t.fuente}</small></li>`).join("") +
      `</ul></li>`).join("") +
    `<li><h3>Reciclaje</h3><p class="nota">Se registra en kg reciclados y no se convierte a CO₂, porque no contamos con un factor chileno confiable.</p></li>`;
}

const RENDERS = {
  "vista-inicio": renderInicio,
  "vista-resumen": renderResumen,
  "vista-insignias": renderInsignias,
  "vista-consejos": renderConsejos,
  "vista-reciclaje": renderReciclaje,
  "vista-recursos": renderRecursos,
  "vista-perfil": renderPerfil,
  "vista-metodo": renderMetodo,
  "vista-registro": () => { if (!$("#reg-fecha").value) $("#reg-fecha").value = fechaLocal(); }
};

// ---------- Inicio ----------
function iniciar() {
  $$("[data-vista]").forEach((b) => b.addEventListener("click", () => irA(b.dataset.vista)));
  $("#btn-volver").addEventListener("click", volver);
  $("#reg-categoria").addEventListener("change", llenarTipos);
  $("#reg-tipo").addEventListener("change", () => { llenarChecklist(); actualizarPreview(); });
  $("#reg-cantidad").addEventListener("input", actualizarPreview);
  $("#form-registro").addEventListener("submit", guardarActividad);
  $("#form-perfil").addEventListener("submit", guardarPerfil);
  $("#btn-exportar").addEventListener("click", exportarDatos);
  $("#btn-compartir").addEventListener("click", compartirProgreso);
  $("#btn-borrar").addEventListener("click", borrarTodo);
  $("#lista-actividades").addEventListener("click", (e) => {
    const b = e.target.closest(".eliminar");
    if (b) eliminarActividad(b.dataset.id);
  });
  // Botón "atrás" físico de Android (evento de Cordova)
  document.addEventListener("backbutton", (e) => {
    if ($("#vista-inicio").classList.contains("activa")) {
      if (navigator.app && navigator.app.exitApp) navigator.app.exitApp();
    } else { e.preventDefault(); volver(); }
  }, false);

  $("#reg-fecha").value = fechaLocal();
  llenarTipos();
  renderInicio();
  revisarInsignias();
}

// En Cordova se espera "deviceready"; en el navegador se usa DOMContentLoaded.
if (window.cordova) document.addEventListener("deviceready", iniciar, false);
else document.addEventListener("DOMContentLoaded", iniciar);
