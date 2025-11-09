"use client";

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function crearGrafico({ datos }) {
  if (!datos || !datos.años || !datos.valores_totales) {
    return <p>No hay datos para mostrar.</p>;
  }

  // === TRACES ===
  const trace_total = {
    x: datos.años,
    y: datos.valores_totales,
    mode: "lines+markers",
    name: "Total Acumulado",
    line: { width: 3 },
    marker: { size: 6 },
  };

  const trace_post_impuestos = {
    x: datos.años,
    y: datos.valores_post_impuestos,
    mode: "lines+markers",
    name: "Total después de impuestos",
    line: { dash: "dot", width: 2 },
    marker: { size: 5 },
  };

  const trace_retiros = {
    x: datos.años,
    y: datos.retiros,
    mode: "lines+markers",
    name: "Retiros anuales",
    line: { dash: "dashdot", width: 2 },
    marker: { size: 5 },
  };

  // === LAYOUT ===
  const layout = {
    title: "Evolución del Portafolio",
    xaxis: {
      title: "Años",
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      title: "Valor del portafolio (USD)",
      showgrid: true,
      zeroline: false,
      tickprefix: "$",
    },
    legend: {
      orientation: "h",
      x: 0,
      y: -0.3,
    },
    margin: { t: 50, r: 30, b: 80, l: 80 },
    plot_bgcolor: "white",
    paper_bgcolor: "white",
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Plot
        data={[trace_total, trace_post_impuestos, trace_retiros]}
        layout={layout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
