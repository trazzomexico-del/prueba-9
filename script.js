// 1. Le decimos a 3DVista que escuche cuando el Tour esté completamente listo
if (window.TDV && window.TDV.Player) {
    window.TDV.Player.on("tourStarted", inicializarMiScriptVelasur);
} else {
    // Si por alguna razón el objeto Player no ha nacido, esperamos un momento
    window.addEventListener("load", function() {
        if (window.TDV && window.TDV.Player) {
            window.TDV.Player.on("tourStarted", inicializarMiScriptVelasur);
        } else {
            // Alternativa de seguridad si el evento nativo no responde
            setTimeout(inicializarMiScriptVelasur, 1500);
        }
    });
}

// 2. Esta es la función que se ejecutará SOLAMENTE cuando el mapa ya esté visible
function inicializarMiScriptVelasur() {
    console.log("=== INICIANDO ESPIONAJE TÉCNICO TRACCO: TOUR LISTO ===");
    
    // Aquí es donde llamamos a tu función que va a internet a leer el Google Sheets
    cargarDatosDesdeGoogleSheets();
}

// 3. Tu función para traer los colores de los lotes
function cargarDatosDesdeGoogleSheets() {
    // AQUÍ ABAJO PEGAS TU CÓDIGO ORIGINAL (El Fetch)
    // El pedazo de código que se conecta a la URL de Google Docs / Spreadsheets
    // y obtiene la lista de 'lote_01: rojo', 'lote_02: verde', etc.
    
    console.log("Leyendo las filas del Sheets...");
    
    // NOTA: Cuando tu código original termine de leer el Sheets y tenga los colores,
    // en lugar de usar variables raras, vas a aplicar el color al hotspot usando la función de abajo.
}

// 4. Función auxiliar para pintar el hotspot de forma segura en 3DVista
function pintarHotspotEnMapa(nombreHotspot, colorHex) {
    try {
        // Buscamos el elemento interactivo en el visor de 3DVista
        var visor = window.viewer || (window.TDV ? window.TDV.Player.getViewer() : null);
        
        if (visor) {
            // Conseguimos el hotspot por su nombre (ej. 'lote_01')
            var hotspot = visor.getHotspot(nombreHotspot);
            if (hotspot) {
                // Cambiamos el color de relleno (convertido a RGB o usando el Hex)
                hotspot.setStyle({ "backgroundColor": colorHex });
                console.log("Se pintó con éxito: " + nombreHotspot + " a color " + colorHex);
            } else {
                console.warn("No se encontró el hotspot físico llamado: " + nombreHotspot);
            }
        }
    } catch (e) {
        console.error("Error al intentar pintar el lote " + nombreHotspot, e);
    }
}