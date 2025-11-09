export function simularInversion({
  inversion_inicial,
  aporte_mensual,
  rentabilidad_anual,
  años,
  frecuencia_aporte,
  año_dejar_de_aportar,
  año_retiro,
  porcentaje_retiro_anual,
  tasa_impuesto,
}) {
  // === Arrays de salida (misma estructura que usas) ===
  const años_lista = [];
  const total_por_año = [];
  const aportes_por_año = [];
  const intereses_por_año = []; // neto: total - aportes (para evitar que supere al total)
  const retiros_por_año = [];

  // === Variables internas ===
  let capital = inversion_inicial;
  let aportes_acumulados = inversion_inicial;

  // Simulación año a año (usando aporte esperado por año según frecuencia)
  for (let año = 1; año <= años; año++) {
    años_lista.push(año);

    // Aporte anual esperado (si aún aportas)
    if (año <= año_dejar_de_aportar) {
      const aporte_anual = aporte_mensual * 12 * frecuencia_aporte;
      capital += aporte_anual;
      aportes_acumulados += aporte_anual;
    }

    // Interés anual sobre el capital actual
    const interes_anual = capital * rentabilidad_anual;
    capital += interes_anual;

    // Retiro anual (no acumulativo): se aplica sobre el capital después de sumar intereses
    let retiro_this_year = 0;
    if (año >= año_retiro) {
      retiro_this_year = capital * porcentaje_retiro_anual;
      capital -= retiro_this_year; // afecta el saldo para el siguiente año
    }

    // Guardar valores: total al cierre de año, aportes acumulados, intereses netos (total - aportes), y retiro del año
    total_por_año.push(capital);
    aportes_por_año.push(aportes_acumulados);
    intereses_por_año.push(capital - aportes_acumulados); // interés neto acumulado hasta este año
    retiros_por_año.push(retiro_this_year);
  }

  // Cálculos finales
  const total_final = total_por_año[total_por_año.length - 1];
  const monto_impuestos = intereses_por_año[intereses_por_año.length - 1] * tasa_impuesto;
  const total_post_impuestos = total_final - monto_impuestos;
  const umbral = 100000;
  const años_100k = total_por_año.findIndex((v) => v >= umbral) + 1 || null;

  // LOG de verificación (identity: total = aportes + intereses_netos)
  console.log("==============================================================");
  console.log("Año |     Total     |    Aportes    |  InteresesNetos  |  RetiroAño  |  Check(diff)");
  console.log("==============================================================");
  for (let i = 0; i < años_lista.length; i++) {
    const año = años_lista[i];
    const total = total_por_año[i];
    const aportes = aportes_por_año[i];
    const intereses_netos = intereses_por_año[i];
    const retiro = retiros_por_año[i];
    const check = total - (aportes + intereses_netos); // debe ser 0
    console.log(
      `${String(año).padStart(3)} | ${total.toFixed(2).padStart(12)} | ${aportes.toFixed(2).padStart(13)} | ${intereses_netos
        .toFixed(2)
        .padStart(16)} | ${retiro.toFixed(2).padStart(11)} | ${check.toFixed(5).padStart(11)}`
    );
  }
  console.log("==============================================================");
  console.log("Total final:", total_final.toFixed(2), "| Post impuestos:", total_post_impuestos.toFixed(2));
  console.log("==============================================================");

  // Retorno con las mismas keys que tu plot espera
  return {
    años_lista,
    total_por_año,
    aportes_por_año,
    intereses_por_año,
    retiros_por_año,
    total_final,
    total_post_impuestos,
    monto_impuestos,
    años_100k,
  };
}
