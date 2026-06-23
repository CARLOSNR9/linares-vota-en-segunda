/**
 * Convierte un arreglo de objetos a formato CSV y descarga el archivo.
 * Incluye BOM para correcta lectura de caracteres especiales en Excel.
 * @param {Array} data - Arreglo de objetos a exportar
 * @param {String} filename - Nombre del archivo sin extensión
 */
export const exportToCSV = (data, filename = 'export') => {
  if (!data || !data.length) {
    return;
  }

  // Extraer los encabezados de las propiedades del primer objeto
  const headers = Object.keys(data[0]);

  // Construir las filas del CSV usando punto y coma (;) para mayor compatibilidad con Excel en español
  const csvRows = [];
  csvRows.push(headers.join(';'));

  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      // Escapar comillas dobles y envolver en comillas si hay comas o puntos y comas
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(';'));
  }

  const csvString = csvRows.join('\n');
  
  // Agregar BOM (Byte Order Mark) para UTF-8 para que Excel lo abra correctamente
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Crear un enlace temporal para descargar
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Convierte un arreglo de objetos a formato JSON y descarga el archivo.
 * @param {Array} data - Arreglo de objetos a exportar
 * @param {String} filename - Nombre del archivo sin extensión
 */
export const exportToJSON = (data, filename = 'export') => {
  if (!data || !data.length) {
    return;
  }

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
