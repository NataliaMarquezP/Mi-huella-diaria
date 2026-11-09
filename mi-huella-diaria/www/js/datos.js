/*
 * datos.js — Datos estáticos de la app "Mi Huella Diaria".
 * Todos los factores son VALORES REFERENCIALES. Revise las fuentes antes de entregar.
 */

// Factores de emisión. Unidad de "cantidad" según categoría:
// transporte = km, electricidad = kWh, alimentacion = kg, reciclaje = kg.
const FACTORES = {
  transporte: {
    unidad: "km",
    tipos: {
      auto_sedan:     { nombre: "Auto sedán (gasolina)", factor: 0.20,  fuente: "HuellaChile (MMA), infografía 2023: 6 kg CO₂ en 30 km. Derivado por km, verificar." },
      auto_4x4:       { nombre: "Auto 4x4 (gasolina)",   factor: 0.30,  fuente: "HuellaChile (MMA), infografía 2023: 9 kg CO₂ en 30 km. Derivado por km, verificar." },
      moto:           { nombre: "Moto",                  factor: 0.104, fuente: "HuellaChile (MMA), infografía 2023: 3,13 kg CO₂ en 30 km. Derivado por km, verificar." },
      bus:            { nombre: "Bus",                   factor: 0.017, fuente: "HuellaChile (MMA), infografía 2023: 0,5 kg CO₂ en 30 km. Derivado por km, verificar." },
      metro:          { nombre: "Metro",                 factor: 0.008, fuente: "HuellaChile (MMA), infografía 2023: 0,24 kg CO₂ en 30 km. Derivado por km, verificar." },
      bici_electrica: { nombre: "Bicicleta eléctrica",   factor: 0.006, fuente: "HuellaChile (MMA), infografía 2023: 0,19 kg CO₂ en 30 km. Derivado por km, verificar." },
      bicicleta:      { nombre: "Bicicleta",             factor: 0,     fuente: "Sin emisiones directas." },
      caminar:        { nombre: "Caminar",               factor: 0,     fuente: "Sin emisiones directas." }
    }
  },
  electricidad: {
    unidad: "kWh",
    tipos: {
      red_sen: { nombre: "Electricidad del hogar (red SEN)", factor: 0.2421, fuente: "Energía Abierta, Ministerio de Energía, factor SEN 2023 (citado por HuellaChile)." }
    }
  },
  alimentacion: {
    unidad: "kg",
    tipos: {
      vacuno: { nombre: "Carne de vacuno", factor: 26.5, fuente: "NRDC (EE.UU.). Referencial, sin dato chileno disponible." },
      pollo:  { nombre: "Pollo",           factor: 5.3,  fuente: "NRDC (EE.UU.), aprox. 1/5 del vacuno. Referencial." }
    }
  },
  reciclaje: {
    unidad: "kg",
    // El reciclaje no se convierte a CO₂: se registra en kg para metas e insignias.
    tipos: {
      pet:       { nombre: "Botellas plásticas (PET)", factor: 0, fuente: "Se registra en kg reciclados, sin conversión a CO₂." },
      latas:     { nombre: "Latas",                    factor: 0, fuente: "Se registra en kg reciclados, sin conversión a CO₂." },
      tetra:     { nombre: "Envases tipo Tetra Pak",   factor: 0, fuente: "Se registra en kg reciclados, sin conversión a CO₂." },
      vidrio:    { nombre: "Vidrio",                   factor: 0, fuente: "Se registra en kg reciclados, sin conversión a CO₂." },
      papel:     { nombre: "Papel y cartón",           factor: 0, fuente: "Se registra en kg reciclados, sin conversión a CO₂." }
    }
  }
};

const NOMBRES_CATEGORIA = {
  transporte: "Transporte",
  electricidad: "Electricidad",
  alimentacion: "Alimentación",
  reciclaje: "Reciclaje"
};

// Guía de reciclaje: recomendaciones generales (no reglas oficiales).
const MATERIALES = [
  { id: "pet",    icono: "🧴", nombre: "Botellas plásticas (PET)",
    pasos: ["Vaciar por completo", "Enjuagar", "Aplastar para ahorrar espacio", "La tapa: según el punto de reciclaje"],
    porque: "Los restos de líquido pueden contaminar el lote completo." },
  { id: "latas",  icono: "🥫", nombre: "Latas (aluminio o acero)",
    pasos: ["Vaciar", "Enjuagar, sin restos de comida", "Aplastar si el punto lo pide"],
    porque: "Los restos de comida generan olores y bacterias." },
  { id: "tetra",  icono: "🧃", nombre: "Envases tipo Tetra Pak",
    pasos: ["Vaciar", "Enjuagar", "Plegar"],
    porque: "Los líquidos dificultan separar el cartón del plástico y el aluminio." },
  { id: "vidrio", icono: "🍾", nombre: "Vidrio",
    pasos: ["Vaciar", "Enjuagar", "Retirar tapas metálicas o plásticas"],
    porque: "Evita mezclar materiales distintos en el contenedor." },
  { id: "papel",  icono: "📦", nombre: "Papel y cartón",
    pasos: ["Mantener seco", "Sin grasa ni restos de comida", "Desarmar y aplanar las cajas"],
    porque: "El papel mojado o sucio no se puede reciclar." }
];

// Consejos. Fuente general: recomendaciones del Ministerio del Medio Ambiente (MMA).
const CONSEJOS = [
  { categoria: "electricidad", texto: "Apaga luces y aparatos que no estés usando." },
  { categoria: "electricidad", texto: "Cambia las ampolletas por LED: consumen bastante menos energía." },
  { categoria: "electricidad", texto: "Al comprar electrodomésticos, revisa la etiqueta de eficiencia energética." },
  { categoria: "electricidad", texto: "Usa la calefacción solo cuando haga falta y cierra puertas y ventanas." },
  { categoria: "electricidad", texto: "Desenchufa cargadores y equipos en modo espera." },
  { categoria: "transporte",   texto: "En trayectos cortos, camina o usa bicicleta." },
  { categoria: "transporte",   texto: "Prefiere bus o metro en lugar del auto para ir al trabajo o estudio." },
  { categoria: "transporte",   texto: "Comparte el auto o combina varios trámites en un solo viaje." },
  { categoria: "alimentacion", texto: "Reduce el consumo de carne de vacuno: es el alimento con mayor huella." },
  { categoria: "alimentacion", texto: "Compra productos locales y de temporada." },
  { categoria: "alimentacion", texto: "Planifica tus compras para evitar el desperdicio de comida." },
  { categoria: "reciclaje",    texto: "Separa los residuos reciclables y prepáralos antes de llevarlos." },
  { categoria: "reciclaje",    texto: "Usa bolsas y botellas reutilizables." },
  { categoria: "reciclaje",    texto: "Antes de reciclar, piensa si puedes reducir o reutilizar." }
];

// Recursos educativos: textos breves dentro de la app.
const RECURSOS = [
  { titulo: "¿Qué es la huella de carbono?",
    texto: "Es la cantidad de gases de efecto invernadero que generan nuestras actividades, expresada en kilos de CO₂ equivalente (kg CO₂e). Incluye lo que emitimos al movernos, al usar electricidad y al producir lo que comemos." },
  { titulo: "La electricidad en Chile",
    texto: "El factor de emisión del Sistema Eléctrico Nacional (SEN) indica cuánto CO₂ se emite por cada kWh. Ha bajado en los últimos años gracias al aumento de la energía solar y eólica: según el Ministerio de Energía, pasó de 0,39 kg CO₂e/kWh en 2021 a 0,24 en 2023." },
  { titulo: "Transporte y emisiones",
    texto: "Para un mismo trayecto, el auto emite muchas veces más que el bus o el metro, porque estos últimos llevan a muchas personas a la vez. Caminar y andar en bicicleta no generan emisiones directas." },
  { titulo: "Lo que comemos también cuenta",
    texto: "La carne de vacuno es el alimento con mayor huella, en gran parte por el metano que producen los animales durante la digestión. Un kilo de vacuno emite varias veces más que un kilo de pollo." },
  { titulo: "Reciclar bien",
    texto: "Un envase sucio puede contaminar todo un lote de reciclaje. Por eso es importante vaciar, enjuagar y secar los materiales antes de llevarlos al punto de reciclaje." },
  { titulo: "Ley REP en Chile",
    texto: "La Ley 20.920 de Responsabilidad Extendida del Productor (Ley REP) obliga a los productores de ciertos productos, como los envases, a hacerse cargo de ellos cuando se convierten en residuos, para fomentar el reciclaje." }
];

// Insignias: cada una tiene una función que recibe (actividades, perfil) y devuelve true si se cumple.
const INSIGNIAS = [
  { id: "primer_paso",   icono: "🌱", nombre: "Primer paso",
    descripcion: "Registra tu primera actividad.",
    cumple: (acts) => acts.length >= 1 },
  { id: "semana_verde",  icono: "📅", nombre: "Semana verde",
    descripcion: "Registra actividades 7 días seguidos.",
    cumple: (acts) => rachaMaxima(acts) >= 7 },
  { id: "dia_sin_auto",  icono: "🚲", nombre: "Día sin auto",
    descripcion: "Registra un día con trayectos solo a pie, bici, bus o metro.",
    cumple: (acts) => diaSinAuto(acts) },
  { id: "semana_sin_auto", icono: "🚌", nombre: "Semana sin auto",
    descripcion: "Registra transporte 7 días seguidos sin usar auto.",
    cumple: (acts) => semanaSinAuto(acts) },
  { id: "luz_baja",      icono: "💡", nombre: "Electricidad a la baja",
    descripcion: "Consume menos kWh que el mes anterior (con registros en ambos meses).",
    cumple: (acts) => electricidadALaBaja(acts) },
  { id: "meta_cumplida", icono: "🏆", nombre: "Meta cumplida",
    descripcion: "Cierra un mes por debajo de tu límite de CO₂.",
    cumple: (acts, perfil) => metaCumplida(acts, perfil) }
];
