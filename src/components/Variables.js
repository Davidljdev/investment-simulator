
export const variables = {
  // Parámetros básicos
  inversion_inicial: 10000,       // USD
  aporte_mensual: 500,            // USD
  rentabilidad_anual: 0.15,       // 15%
  años: 35,
  tasa_impuesto: 0.30,            // 30%

  // Variables realistas
  frecuencia_aporte: 0.90,        // 90% de los meses se hace aporte
  año_dejar_de_aportar: 15,       // A partir de este año, dejo de aportar
  año_retiro: 10,                 // A partir de este año, retiro 4% del total cada año
  porcentaje_retiro_anual: 0.04,  // 4% de retiro anual
};
