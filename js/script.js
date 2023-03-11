function validarArchivo() {
    var fileInput = document.getElementById("fileInput");
    var mensaje = document.getElementById("mensaje");
    var resultado = document.getElementById("resultado");

    // Verificar si se seleccionó un archivo
    if (!fileInput.value) {
        mensaje.innerHTML = "Por favor seleccione un archivo.";
        return;
    }

    // Leer el archivo y convertirlo a matriz
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileInput.files[0]);
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var datos = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        // Verificar si el archivo tiene los encabezados correctos
        var encabezadosCorrectos = ["ID", "NAME", "DATE", "TIME", "HOLIDAY"];
        var encabezadosArchivo = datos[0];
        var validacionEncabezados = encabezadosCorrectos.every(function (encabezado) {
            return encabezadosArchivo.indexOf(encabezado) > -1;
        });

        if (!validacionEncabezados) {
            mensaje.innerHTML = "El archivo no tiene los encabezados correctos. Por favor seleccione un archivo válido.";
            return;
        }

        // Contar las filas con datos en la primera columna
        var filasConDatos = 0;
        for (var i = 1; i < datos.length; i++) {
            if (datos[i][0]) {
                filasConDatos++;
            }
        }

        resultado.innerHTML = "Registros cargados: " + filasConDatos;
    };
}
