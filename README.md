# 🌱 Mi Huella Diaria

<p align="center">
  Aplicación móvil desarrollada con <strong>Apache Cordova</strong> (HTML5, CSS3 y JavaScript) que ayuda a las personas a adoptar prácticas sostenibles en su vida diaria y a medir su impacto en el medio ambiente.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Apache%20Cordova-Mobile%20App-E8E8E8?logo=apachecordova" alt="Cordova">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white" alt="Android">
</p>

<p align="center">
  Proyecto para la actividad evaluativa <strong>EPE II</strong> de IPCHILE.
</p>

---

## 🌍 Resumen

**Mi Huella Diaria** permite:

✅ Registrar actividades diarias y calcular emisiones de CO₂e  
✅ Monitorear el progreso frente a una meta mensual  
✅ Obtener consejos personalizados  
✅ Aprender sobre sostenibilidad y reciclaje  
✅ Desbloquear insignias y logros  
✅ Funcionar completamente sin conexión a Internet  

---

## 📑 Índice

1. [Descripción de la aplicación](#1-descripción-de-la-aplicación)
2. [Problemática que aborda](#2-problemática-que-aborda)
3. [Funcionalidades](#3-funcionalidades)
4. [Tecnologías utilizadas](#4-tecnologías-utilizadas)
5. [Arquitectura y estructura del proyecto](#5-arquitectura-y-estructura-del-proyecto)
6. [Proceso de desarrollo](#6-proceso-de-desarrollo)
7. [Decisiones de diseño](#7-decisiones-de-diseño)
8. [Fuentes de los factores de emisión](#8-fuentes-de-los-factores-de-emisión)
9. [Instalación, ejecución y compilación](#9-instalación-ejecución-y-compilación)
10. [Limitaciones y mejoras futuras](#10-limitaciones-y-mejoras-futuras)

---

# 📱 1. Descripción de la aplicación

**Mi Huella Diaria** es una app que permite registrar las actividades cotidianas que generan emisiones de gases de efecto invernadero (transporte, consumo eléctrico y alimentación) y las acciones positivas como el reciclaje.

Con cada registro, la app estima la huella de carbono en kilos de CO₂ equivalente (kg CO₂e), usando factores de emisión referenciales basados en fuentes chilenas.

El usuario puede:

- Definir su perfil, los hábitos que quiere mejorar y un límite mensual de emisiones.
- Registrar sus actividades y ver al instante cuánto CO₂ representan.
- Seguir su progreso del mes por categoría.
- Recibir consejos según sus hábitos.
- Aprender sobre la huella de carbono y cómo reciclar correctamente.
- Obtener insignias como reconocimiento a sus esfuerzos.

La app funciona sin conexión a internet y guarda los datos en el propio teléfono.

---

# 🌎 2. Problemática que aborda

La consigna plantea que las personas tienen dificultades para adoptar prácticas sostenibles por **falta de información, de seguimiento y de motivación**.

La app responde a cada una de esas causas:

| Causa | Cómo la aborda la app |
|--------|--------|
| **Falta de información** | Recursos educativos, guía de preparación para reciclar, consejos y una pantalla que explica cómo se calculan las emisiones y de dónde vienen los datos. |
| **Falta de seguimiento** | Registro diario de actividades, resumen mensual por categoría y barra de progreso frente al límite que definió el usuario. |
| **Falta de motivación** | Insignias, cálculo del ahorro de CO₂ al elegir un transporte distinto del auto y opción de compartir el progreso con otras personas. |

### Contexto chileno

Según el Ministerio de Energía, el factor de emisión del Sistema Eléctrico Nacional bajó de 0,39 kg CO₂e/kWh en 2021 a 0,24 en 2023, por el aumento de energías renovables.

Aun así, el transporte y la alimentación siguen siendo fuentes importantes de emisiones personales. Por eso la app se enfoca en esas tres áreas, que son las que una persona puede cambiar con decisiones diarias.

Se consideraron distintas perspectivas:

- **Persona usuaria:** necesita algo simple, rápido de usar y que muestre resultados concretos.
- **Ambiental:** las cifras deben ser trazables a fuentes, y la app debe ser honesta sobre sus límites (valores referenciales).
- **Comunidad:** compartir el progreso fomenta que otras personas también adopten hábitos sostenibles.
- **Local:** las reglas de reciclaje varían según la comuna, por lo que la guía se presenta como recomendaciones generales y no como reglas oficiales.

---

# 🚀 3. Funcionalidades

Correspondencia entre las funcionalidades clave de la consigna y la app:

| Funcionalidad de la consigna | Implementación en la app |
|--------|--------|
| **Perfil y seguimiento** | Pantalla *Perfil y meta*: nombre, hábitos a mejorar y límite mensual de CO₂. En *Inicio*, barra de progreso que cambia a amarillo al 80% y a rojo al superar el límite. |
| **Consejos y sugerencias** | Pantalla *Consejos*: 14 consejos clasificados por categoría, filtrados según los hábitos marcados en el perfil. |
| **Calculadora de impacto** | Pantalla *Registrar*: calcula los kg CO₂e al ingresar cada actividad. En transporte, muestra además cuánto se ahorró frente a hacer el mismo trayecto en auto. Pantalla *Mi resumen*: total del mes y desglose por categoría. |
| **Recursos educativos** | Pantallas *Aprende* (6 temas), *Guía de reciclaje* (5 materiales con pasos de preparación) y *¿Cómo calculamos?* (factores y fuentes). |
| **Registro de actividades y reconocimientos** | Pantalla *Registrar* para anotar actividades, historial en *Mi resumen* (con opción de eliminar) y 6 insignias en *Insignias*. |

## 📱 Detalle de las pantallas

| Pantalla | Contenido |
|--------|--------|
| Inicio | Saludo, emisiones del mes, progreso frente al límite y menú principal. |
| Registrar | Fecha, categoría, tipo, cantidad y vista previa del CO₂. En reciclaje, lista de verificación de preparación que debe completarse antes de guardar. |
| Mi resumen | Total del mes, desglose por categoría, kg reciclados, últimas 20 actividades, compartir, exportar y borrar datos. |
| Insignias | Las 6 insignias, con su estado (obtenida o pendiente). |
| Consejos | Consejos filtrados por hábito. |
| Guía de reciclaje | Pasos de preparación y explicación de por qué importan. |
| Aprende | Textos breves desplegables. |
| Perfil y meta | Datos del usuario y límite mensual. |
| ¿Cómo calculamos? | Fórmula, factores de emisión y fuente de cada uno. |

## 🏅 Insignias

| Insignia | Condición |
|--------|--------|
| 🌱 Primer paso | Registrar la primera actividad. |
| 📅 Semana verde | Registrar actividades 7 días seguidos. |
| 🚲 Día sin auto | Un día con trayectos registrados solo a pie, bicicleta, bus o metro. |
| 🚌 Semana sin auto | 7 días seguidos con transporte registrado y sin uso de auto ni moto. |
| 💡 Electricidad a la baja | Consumir menos kWh que el mes anterior. |
| 🏆 Meta cumplida | Cerrar un mes por debajo del límite de CO₂ definido. |

## ✨ Funciones adicionales

- **Compartir progreso:** genera un texto con el resumen del mes y lo envía con el menú nativo del teléfono (WhatsApp, correo, etc.).
- **Exportar datos:** descarga un archivo JSON con el perfil, las actividades y las insignias, como respaldo.
- **Botón "atrás" de Android:** vuelve a la pantalla anterior y, desde el inicio, cierra la app.

---

# 🛠️ 4. Tecnologías utilizadas

| Tecnología | Uso |
|--------|--------|
| **Apache Cordova** | Empaquetar la aplicación web como app nativa de Android (APK) y acceder a eventos del dispositivo. |
| **HTML5** | Estructura de las pantallas y formularios con validación nativa. |
| **CSS3** | Diseño adaptable al móvil con variables CSS, Grid, Flexbox y animaciones. |
| **JavaScript (ES6+)** | Lógica de la app: cálculos, navegación, insignias y almacenamiento. |
| **localStorage** | Persistencia de datos en el dispositivo. |
| **Web Share API** | Compartir progreso mediante el menú nativo. |
| **Android SDK, JDK 17 y Gradle** | Herramientas utilizadas para compilar el APK. |
| **Git y GitHub** | Control de versiones y publicación del código. |

> PhoneGap, mencionado en la consigna como alternativa, es la distribución de Adobe basada en Cordova y ya no se mantiene. Por eso se eligió Apache Cordova, que es el proyecto activo.

---

# 🏗️ 5. Arquitectura y estructura del proyecto

```text
mi-huella-diaria/
├── config.xml
├── package.json
├── .gitignore
├── README.md
└── www/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── datos.js
        └── app.js
```

## 🗄️ Modelo de datos

### `actividades`

```js
{
  id: "1731103200000",
  fecha: "2026-11-08",
  categoria: "transporte",
  tipo: "bus",
  cantidad: 10,
  co2Kg: 0.17
}
```

### `perfil`

```js
{
  nombre: "Ana",
  habitos: ["transporte", "electricidad"],
  metaCO2Mes: 100
}
```

### `insignias`

Arreglo con los identificadores de las insignias obtenidas.

## 🔄 Flujo principal

1. El usuario registra una actividad.
2. `app.js` busca el factor correspondiente en `datos.js`.
3. Calcula `co2Kg`.
4. Guarda la actividad en `localStorage`.
5. Evalúa insignias.
6. Actualiza las vistas de Inicio y Resumen.

---

# 📋 6. Proceso de desarrollo

1. Análisis de la consigna y la rúbrica.
2. Definición de la idea.
3. Investigación de datos.
4. Diseño del modelo de datos.
5. Definición de contenidos.
6. Implementación.
7. Pruebas.
8. Compilación.

---

# 🎨 7. Decisiones de diseño

| Decisión | Motivo |
|--------|--------|
| **Almacenamiento local, sin servidor** | Funcionamiento sin internet y desarrollo simplificado. |
| **Aplicación SPA** | Navegación rápida sin recargas. |
| **JavaScript sin frameworks** | Menor peso y sin dependencias externas. |
| **Datos separados de la lógica** | Facilita mantenimiento y actualización. |
| **Factores con fuente visible** | Transparencia y trazabilidad. |
| **Valores referenciales** | Evita presentar estimaciones como datos exactos. |
| **Meta mensual de emisiones** | Fácil de comprender y medir. |
| **Comparación con el auto** | Hace tangible el ahorro de emisiones. |
| **Reciclaje sin conversión a CO₂** | Se evita usar datos poco confiables. |
| **Validación previa del reciclaje** | Refuerza el aprendizaje práctico. |
| **Insignias simples** | Más fáciles de entender y verificar. |
| **Diseño visual** | Enfocado en accesibilidad y sostenibilidad. |
| **Android 7.0 mínimo** | Amplia compatibilidad con dispositivos. |

---

# 📚 8. Fuentes de los factores de emisión

Todos los valores son **referenciales**.

| Categoría | Factor | Fuente |
|--------|--------|--------|
| Electricidad | 0,2421 kg CO₂e/kWh | Energía Abierta y HuellaChile. |
| Transporte | Factores por km para distintos medios de transporte. | Infografía HuellaChile 2023. |
| Alimentación | Vacuno 26,5 · Pollo 5,3 kg CO₂e/kg | NRDC (EE.UU.). |
| Reciclaje | Sin conversión | Se registra en kg reciclados. |

### Otras referencias

- Ley 20.920 de Responsabilidad Extendida del Productor (Ley REP).
- Material del Ministerio del Medio Ambiente para reducir la huella de carbono.

---

# ⚙️ 9. Instalación, ejecución y compilación

## Probar en el navegador

Abrir:

```text
www/index.html
```

## Requisitos

- Node.js LTS
- JDK 17
- Android Studio
- Android SDK
- Gradle 8.x
- Variables `ANDROID_HOME` y `JAVA_HOME`

Verificación:

```bash
java -version
gradle -v
cordova requirements android
```

## Compilar

```bash
npm install -g cordova
cordova platform add android
cordova build android
```

APK generado:

```text
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## Instalar en un teléfono

- `cordova run android`
- O copiar el APK al dispositivo e instalarlo manualmente.

---

# 🔮 10. Limitaciones y mejoras futuras

## Limitaciones actuales

- Los datos solo existen en el dispositivo.
- La app depende de registros honestos.
- Algunos factores son estimaciones o adaptaciones.
- La guía de reciclaje no reemplaza las indicaciones municipales.

## Mejoras posibles

- Sincronización en la nube.
- Actualización automática de factores de emisión.
- Gráficos de evolución mensual.
- Notificaciones locales.
- Importación de respaldos JSON.
- Desafíos grupales entre amigos o familia.
