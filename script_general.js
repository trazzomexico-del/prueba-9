// 1. Esperamos de forma segura a que el tour virtual de 3DVista empiece a correr
window.addEventListener('load', function() {
    setTimeout(function() {
        console.log("=== CONECTANDO EXCEL CON VELASUR ===");
        conectarGoogleSheets();
    }, 1500); // 1.5 segundos de tolerancia para que cargue el mapa
});

// 2. Traemos la información en tiempo real de tu Google Sheets
function conectarGoogleSheets() {
    // Reemplaza esta URL por la URL de tu API de Google Sheets actual
    const urlSheets = "https://script.google.com/macros/s/TU_ID_DE_SCRIPT/exec"; 

    fetch(urlSheets)
        .then(response => response.json())
        .then(datos => {
            console.log("Excel conectado con éxito. Lotes recibidos:", datos);
            
            // Recorremos cada lote que viene en tu Excel
            datos.forEach(item => {
                // Traducimos tus palabras a colores reales (Hexadecimal)
                let colorHex = "#FFFFFF"; // Blanco por defecto
                
                if (item.estado === "rojo") colorHex = "#FF0000";       // Rojo para vendido
                if (item.estado === "verde") colorHex = "#00FF00";      // Verde para disponible
                if (item.estado === "disponible") colorHex = "#00FF00"; // Por si escribes "disponible"
                if (item.estado === "azul") colorHex = "#0000FF";       // Azul

                // Llamamos a la función mágica para pintar el mapa
                aplicarColorAlHotspot(item.lote, colorHex);
            });
        })
        .catch(error => console.error("Error leyendo el Excel:", error));
}

// 3. Pintamos el polígono usando los comandos internos de 3DVista
function aplicarColorAlHotspot(idLote, colorHexadecimal) {
    try {
        // Buscamos el visor interactivo (el Canvas) de 3DVista
        var visor = window.viewer || (window.TDV ? window.TDV.Player.getViewer() : null);
        
        if (visor) {
            // Buscamos el polígono por su nombre (ej. 'lote_01')
            var lotePoligono = visor.getHotspot(idLote);
            
            if (lotePoligono) {
                // Comando nativo e interno de 3DVista para rellenar de color el polígono
                lotePoligono.setStyle({ "backgroundColor": colorHexadecimal });
                console.log("Pintado con éxito: " + idLote + " en color " + colorHexadecimal);
            }
        }
    } catch (e) {
        console.warn("No se pudo pintar el lote " + idLote + " todavía.", e);
    }
}