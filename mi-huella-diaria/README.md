# Mi Huella Diaria

Aplicación móvil desarrollada con **Apache Cordova** (HTML5, CSS3 y JavaScript) que ayuda a las personas a adoptar prácticas sostenibles en su vida diaria y a medir su impacto en el medio ambiente.

Proyecto para la actividad evaluativa **EPE II** de IPCHILE.

---

## Índice

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

## 1. Descripción de la aplicación

**Mi Huella Diaria** es una app que permite registrar las actividades cotidianas que generan emisiones de gases de efecto invernadero (transporte, consumo eléctrico y alimentación) y las acciones positivas como el reciclaje. Con cada registro, la app estima la huella de carbono en kilos de CO₂ equivalente (kg CO₂e), usando factores de emisión referenciales basados en fuentes chilenas.

El usuario puede:

- Definir su perfil, los hábitos que quiere mejorar y un límite mensual de emisiones.
- Registrar sus actividades y ver al instante cuánto CO₂ representan.
- Seguir su progreso del mes por categoría.
- Recibir consejos según sus hábitos.
- Aprender sobre la huella de carbono y cómo reciclar correctamente.
- Obtener insignias como reconocimiento a sus esfuerzos.

La app funciona sin conexión a internet y guarda los datos en el propio teléfono.

## 2. Problemática que aborda

La consigna plantea que las personas tienen dificultades para adoptar prácticas sostenibles por **falta de información, de seguimiento y de motivación**. La app responde a cada una de esas causas:

| Causa | Cómo la aborda la app |
|---|---|
| **Falta de información** | Recursos educativos, guía de preparación para reciclar, consejos y una pantalla que explica cómo se calculan las emisiones y de dónde vienen los datos. |
| **Falta de seguimiento** | Registro diario de actividades, resumen mensual por categoría y barra de progreso frente al límite que definió el usuario. |
| **Falta de motivación** | Insignias, cálculo del ahorro de CO₂ al elegir un transporte distinto del auto y opción de compartir el progreso con otras personas. |

**Contexto chileno.** Según el Ministerio de Energía, el factor de emisión del Sistema Eléctrico Nacional bajó de 0,39 kg CO₂e/kWh en 2021 a 0,24 en 2023, por el aumento de energías renovables. Aun así, el transporte y la alimentación siguen siendo fuentes importantes de emisiones personales. Por eso la app se enfoca en esas tres áreas, que son las que una persona puede cambiar con decisiones diarias.

Se consideraron distintas perspectivas:

- **Persona usuaria:** necesita algo simple, rápido de usar y que muestre resultados concretos.
- **Ambiental:** las cifras deben ser trazables a fuentes, y la app debe ser honesta sobre sus límites (valores referenciales).
- **Comunidad:** compartir el progreso fomenta que otras personas también adopten hábitos sostenibles.
- **Local:** las reglas de reciclaje varían según la comuna, por lo que la guía se presenta como recomendaciones generales y no como reglas oficiales.

## 3. Funcionalidades

Correspondencia entre las funcionalidades clave de la consigna y la app:

| Funcionalidad de la consigna | Implementación en la app |
|---|---|
| **Perfil y seguimiento** | Pantalla *Perfil y meta*: nombre, hábitos a mejorar y límite mensual de CO₂. En *Inicio*, barra de progreso que cambia a amarillo al 80% y a rojo al superar el límite. |
| **Consejos y sugerencias** | Pantalla *Consejos*: 14 consejos clasificados por categoría, filtrados según los hábitos marcados en el perfil. |
| **Calculadora de impacto** | Pantalla *Registrar*: calcula los kg CO₂e al ingresar cada actividad. En transporte, muestra además cuánto se ahorró frente a hacer el mismo trayecto en auto. Pantalla *Mi resumen*: total del mes y desglose por categoría. |
| **Recursos educativos** | Pantallas *Aprende* (6 temas), *Guía de reciclaje* (5 materiales con pasos de preparación) y *¿Cómo calculamos?* (factores y fuentes). |
| **Registro de actividades y reconocimientos** | Pantalla *Registrar* para anotar actividades, historial en *Mi resumen* (con opción de eliminar) y 6 insignias en *Insignias*. |

### Detalle de las pantallas

| Pantalla | Contenido |
|---|---|
| Inicio | Saludo, emisiones del mes, progreso frente al límite y menú principal. |
| Registrar | Fecha, categoría, tipo, cantidad y vista previa del CO₂. En reciclaje, lista de verificación de preparación que debe completarse antes de guardar. |
| Mi resumen | Total del mes, desglose por categoría, kg reciclados, últimas 20 actividades, compartir, exportar y borrar datos. |
| Insignias | Las 6 insignias, con su estado (obtenida o pendiente). |
| Consejos | Consejos filtrados por hábito. |
| Guía de reciclaje | Pasos de preparación y explicación de por qué importan. |
| Aprende | Textos breves desplegables. |
| Perfil y meta | Datos del usuario y límite mensual. |
| ¿Cómo calculamos? | Fórmula, factores de emisión y fuente de cada uno. |

### Insignias

| Insignia | Condición |
|---|---|
| 🌱 Primer paso | Registrar la primera actividad. |
| 📅 Semana verde | Registrar actividades 7 días seguidos. |
| 🚲 Día sin auto | Un día con trayectos registrados solo a pie, bicicleta, bus o metro. |
| 🚌 Semana sin auto | 7 días seguidos con transporte registrado y sin uso de auto ni moto. |
| 💡 Electricidad a la baja | Consumir menos kWh que el mes anterior. |
| 🏆 Meta cumplida | Cerrar un mes por debajo del límite de CO₂ definido. |

### Funciones adicionales

- **Compartir progreso:** genera un texto con el resumen del mes y lo envía con el menú nativo del teléfono (WhatsApp, correo, etc.). Responde al objetivo de propiciar la interacción entre personas.
- **Exportar datos:** descarga un archivo JSON con el perfil, las actividades y las insignias, como respaldo.
- **Botón "atrás" de Android:** vuelve a la pantalla anterior y, desde el inicio, cierra la app.

## 4. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **Apache Cordova** | Empaquetar la aplicación web como app nativa de Android (APK) y acceder a eventos del dispositivo (`deviceready`, `backbutton`). |
| **HTML5** | Estructura de las pantallas, formularios con validación nativa (`required`, `type="date"`, `type="number"`) y elementos `<details>` para los recursos. |
| **CSS3** | Diseño adaptable al móvil con variables CSS, Grid, Flexbox, animaciones y soporte para el área segura de la pantalla (`env(safe-area-inset-top)`). |
| **JavaScript (ES6+)** | Lógica de la app: cálculos, navegación, insignias y almacenamiento, sin librerías externas. |
| **localStorage** | Persistencia de datos en el dispositivo. |
| **Web Share API** | Compartir el progreso con el menú nativo del teléfono. |
| **Android SDK, JDK 17 y Gradle** | Herramientas que Cordova usa para compilar el APK. |
| **Git y GitHub** | Control de versiones y publicación del código. |

PhoneGap, mencionado en la consigna como alternativa, es la distribución de Adobe basada en Cordova y ya no se mantiene. Por eso se eligió Apache Cordova, que es el proyecto activo.

## 5. Arquitectura y estructura del proyecto

```
mi-huella-diaria/
├── config.xml          Configuración de Cordova (nombre, id, orientación, versión mínima de Android)
├── package.json        Metadatos del proyecto
├── .gitignore          Excluye carpetas generadas por la compilación
├── README.md           Esta documentación
└── www/
    ├── index.html      Aplicación de una sola página (SPA) con todas las pantallas
    ├── css/
    │   └── style.css   Estilos
    └── js/
        ├── datos.js    Datos: factores de emisión, consejos, recursos, materiales e insignias
        └── app.js      Lógica: cálculo, almacenamiento, navegación, vistas e insignias
```

### Modelo de datos

Los datos se guardan en `localStorage` en tres claves:

**`actividades`**: arreglo con cada registro.
```js
{
  id: "1731103200000",     // marca de tiempo, identificador único
  fecha: "2026-11-08",     // AAAA-MM-DD
  categoria: "transporte", // transporte | electricidad | alimentacion | reciclaje
  tipo: "bus",             // clave del tipo dentro de FACTORES
  cantidad: 10,            // km, kWh o kg según la categoría
  co2Kg: 0.17              // calculado al guardar: cantidad × factor
}
```

**`perfil`**:
```js
{ nombre: "Ana", habitos: ["transporte", "electricidad"], metaCO2Mes: 100 }
```

**`insignias`**: arreglo con los identificadores de las insignias obtenidas.

### Flujo principal

1. El usuario registra una actividad.
2. `app.js` busca el factor correspondiente en `datos.js` y calcula `co2Kg`.
3. La actividad se agrega a `localStorage`.
4. Se revisan las condiciones de las insignias y, si hay nuevas, se muestra un aviso.
5. Las pantallas de inicio y resumen recalculan los totales a partir del arreglo de actividades.

## 6. Proceso de desarrollo

El desarrollo se organizó en etapas:

1. **Análisis de la consigna y la rúbrica.** Se identificaron las cinco funcionalidades obligatorias y los cuatro criterios de evaluación.
2. **Definición de la idea.** Se evaluaron cuatro alternativas (Mi Huella Diaria, Reciclaje en Casa, Energía en Casa y Transporte Verde). Se eligió *Mi Huella Diaria* porque reúne transporte, electricidad, alimentación y reciclaje en una sola app, e incorpora elementos de las otras ideas, como la guía de reciclaje.
3. **Investigación de datos.** Se buscaron factores de emisión en fuentes chilenas: el programa HuellaChile del Ministerio del Medio Ambiente y Energía Abierta del Ministerio de Energía. Para la alimentación no se encontró un factor chileno, por lo que se usó una referencia de EE.UU. (NRDC), documentada como tal.
4. **Diseño del modelo de datos.** Se definieron los objetos de actividad y perfil, de modo que la calculadora, las insignias, las metas y los consejos lean los mismos datos.
5. **Definición de contenidos.** Se redactaron los consejos, los recursos educativos, la guía de reciclaje y las condiciones de las insignias.
6. **Implementación.** Primero la estructura HTML y la navegación, luego la lógica de cálculo y almacenamiento, después las insignias y finalmente los estilos.
7. **Pruebas.** Se probó la lógica con datos simulados: 7 días seguidos en bus y dos meses con consumo eléctrico decreciente. Se verificó que las seis insignias se activaran y que el cálculo fuera correcto (por ejemplo, 100 kWh × 0,2421 = 24,21 kg CO₂e). Luego se probó la app en el navegador y en un teléfono Android.
8. **Compilación.** Se configuró el entorno (JDK 17, Android SDK con Command-line Tools, Gradle y variables de entorno) y se generó el APK con Cordova.

## 7. Decisiones de diseño

| Decisión | Motivo |
|---|---|
| **Almacenamiento local, sin servidor** | La consigna no exige backend. Simplifica el desarrollo, permite usar la app sin internet y no requiere cuentas. La limitación (datos solo en un dispositivo) se compensa con la exportación a JSON. |
| **Aplicación de una sola página (SPA)** | Las pantallas se muestran y ocultan sin recargar, lo que da una navegación rápida y fluida en el teléfono. |
| **JavaScript sin librerías ni frameworks** | Menor peso, sin dependencias externas y funcionamiento sin conexión. Demuestra el uso directo de HTML5, CSS y JavaScript que pide el resultado de aprendizaje. |
| **Datos separados de la lógica** (`datos.js` y `app.js`) | Los factores, consejos e insignias se pueden actualizar sin modificar el código de cálculo. |
| **Factores con su fuente visible** | La pantalla *¿Cómo calculamos?* muestra cada factor y su origen. Da transparencia y confianza. |
| **Valores declarados como referenciales** | Los factores cambian cada año y algunos son derivados. Mostrarlo evita presentar estimaciones como cifras exactas. |
| **Meta como límite mensual de emisiones** | La app mide lo que se emite. Calcular "CO₂ evitado" exigiría una línea base del usuario, que no existe. Un límite es más fácil de entender y de medir. |
| **Comparación con el auto en transporte** | Convierte un número abstracto en un beneficio concreto ("ahorraste X kg frente a ir en auto"), lo que motiva el cambio de hábito. |
| **Reciclaje en kg, sin convertir a CO₂** | No se encontró un factor chileno confiable. Se prefirió no inventar una equivalencia. |
| **Lista de verificación antes de registrar reciclaje** | La guía de preparación tiene una función práctica: el usuario confirma que enjuagó, vació o secó el material. |
| **Guía de reciclaje como recomendaciones generales y sin puntos limpios** | Las reglas y los puntos de reciclaje cambian según la comuna y en el tiempo. Mencionar puntos específicos daría información que puede quedar desactualizada. |
| **Insignias con una sola condición** | Son fáciles de entender para el usuario y de verificar en el código. |
| **Diseño visual** | Paleta verde asociada a la sostenibilidad, botones grandes para uso táctil, menú en cuadrícula con íconos, colores de alerta en la barra de progreso y avisos breves (*toast*) al guardar. |
| **Orientación vertical y Android 7.0 (API 24) como mínimo** | Corresponde al uso habitual del teléfono y cubre la gran mayoría de los dispositivos en uso. |

## 8. Fuentes de los factores de emisión

Todos los valores son **referenciales**.

| Categoría | Factor | Fuente |
|---|---|---|
| Electricidad (red SEN) | 0,2421 kg CO₂e/kWh | Energía Abierta, Ministerio de Energía, factor del Sistema Eléctrico Nacional 2023. Citado en *Factores de emisión para el cálculo de la huella de carbono, nivel básico, v3*, programa HuellaChile, Ministerio del Medio Ambiente (2024). |
| Transporte | Auto sedán 0,20 · Auto 4x4 0,30 · Moto 0,104 · Bus 0,017 · Metro 0,008 · Bicicleta eléctrica 0,006 · Bicicleta y caminar 0 (kg CO₂e/km) | Infografía de huella de carbono de HuellaChile (2023), que entrega las emisiones de un viaje de 15 km ida y vuelta. Los valores por km se obtuvieron dividiendo por 30 km. |
| Alimentación | Vacuno 26,5 · Pollo 5,3 (kg CO₂e/kg) | Natural Resources Defense Council (NRDC, EE.UU.). Se usó por no existir un factor chileno disponible. El pollo se estimó en una quinta parte del vacuno, según la proporción indicada por esa fuente. |
| Reciclaje | Sin conversión | Se registra en kg reciclados. |

Otras referencias:
- Ley 20.920 de Responsabilidad Extendida del Productor (Ley REP).
- Material de recomendaciones del Ministerio del Medio Ambiente para reducir la huella de carbono, base de los consejos.

## 9. Instalación, ejecución y compilación

### Probar en el navegador

Abrir `www/index.html` en Chrome. En la consola aparecerá un aviso de que falta `cordova.js`. Es normal: ese archivo lo agrega Cordova al compilar.

### Requisitos para compilar

- Node.js LTS
- JDK 17
- Android Studio con Android SDK, incluyendo *Android SDK Command-line Tools*, *Build-Tools* y *Platform-Tools*
- Gradle 8.x instalado y agregado al `PATH`
- Variables de entorno `ANDROID_HOME` y `JAVA_HOME`

Para comprobar el entorno:
```
java -version
gradle -v
cordova requirements android
```

### Compilar

```
npm install -g cordova
cordova platform add android
cordova build android
```

El APK queda en `platforms/android/app/build/outputs/apk/debug/app-debug.apk`.

### Instalar en un teléfono

- Con el teléfono conectado por USB y la depuración USB activada: `cordova run android`.
- O copiar `app-debug.apk` al teléfono y abrirlo, permitiendo la instalación desde fuentes desconocidas.

## 10. Limitaciones y mejoras futuras

**Limitaciones actuales**
- Los datos solo existen en el dispositivo. Si se desinstala la app o se borra su almacenamiento, se pierden, salvo que se hayan exportado.
- La app no puede verificar lo que el usuario registra. Insignias como *Semana sin auto* dependen de registros honestos.
- Los factores de transporte son derivados de una infografía, y los de alimentación son de EE.UU.
- La guía de reciclaje no reemplaza las indicaciones de cada municipio.

**Mejoras posibles**
- Sincronización en la nube con cuentas de usuario.
- Actualización automática del factor eléctrico desde datos abiertos del Ministerio de Energía.
- Gráficos de evolución mensual.
- Recordatorios diarios con notificaciones locales (plugin de Cordova).
- Importar los datos exportados en JSON.
- Desafíos grupales entre amigos o familia.
