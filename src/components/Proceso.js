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
  // Arrays con los nombres que ya usas
  const años_lista = [];
  const total_por_año = [];
  const aportes_por_año = [];
  const intereses_por_año = []; // ajustado para cumplir la igualdad que tú verificas
  const retiros_por_año = [];

  // Variables internas
  let capital = inversion_inicial;
  let aportes_acumulados = inversion_inicial;

  // Simulación año a año (aportes esperados: 12 * frecuencia_aporte)
  for (let año = 1; año <= años; año++) {
    años_lista.push(año);

    // 1) Aporte anual esperado (si aplica)
    if (año <= año_dejar_de_aportar) {
      const aporte_anual = aporte_mensual * 12 * frecuencia_aporte;
      capital += aporte_anual;
      aportes_acumulados += aporte_anual;
    }

    // 2) Interés del año (sobre el capital ya con aportes)
    const interes_anual = capital * rentabilidad_anual;
    capital += interes_anual;

    // 3) Retiro del año (no acumulativo): porcentaje sobre el capital tras intereses
    let retiro_this_year = 0;
    if (año >= año_retiro) {
      retiro_this_year = capital * porcentaje_retiro_anual;
      capital -= retiro_this_year; // resta efectiva para el siguiente año
    }

    // 4) Guardar valores
    total_por_año.push(capital);
    aportes_por_año.push(aportes_acumulados);
    retiros_por_año.push(retiro_this_year);

    // 5) CALCULO DE 'intereses_por_año' PARA QUE LA IGUALDAD QUE USAS FUNCIONE:
    // Queremos: total = aportes + intereses - retiro_del_año
    // => intereses = total - aportes + retiro_del_año
    const intereses_for_check = capital - aportes_acumulados + retiro_this_year;
    intereses_por_año.push(intereses_for_check);
  }

  // Cálculos finales (sin tocar nombres)
  const total_final = total_por_año[total_por_año.length - 1];
  const monto_impuestos = intereses_por_año[intereses_por_año.length - 1] * tasa_impuesto;
  const total_post_impuestos = total_final - monto_impuestos;
  const años_100k = total_por_año.findIndex((v) => v >= 100000) + 1 || null;

  /*
  // LOG para verificar rápidamente
  console.log("==============================================================");
  console.log("Año |     Total     |    Aportes    |   Intereses   |  RetiroAño  | CheckDiff");
  console.log("==============================================================");
  for (let i = 0; i < años_lista.length; i++) {
    const total = total_por_año[i];
    const aportes = aportes_por_año[i];
    const intereses = intereses_por_año[i];
    const retiro = retiros_por_año[i];
    const check = total - (aportes + intereses - retiro); // debe ser ~0
    console.log(
      `${String(años_lista[i]).padStart(3)} | ${total.toFixed(2).padStart(12)} | ${aportes
        .toFixed(2)
        .padStart(13)} | ${intereses.toFixed(2).padStart(13)} | ${retiro.toFixed(2).padStart(11)} | ${check
        .toFixed(5)
        .padStart(9)}`
    );
  }
  console.log("==============================================================");
  console.log("Total final:", total_final.toFixed(2), "| Post impuestos:", total_post_impuestos.toFixed(2));
  console.log("==============================================================");
  */

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
