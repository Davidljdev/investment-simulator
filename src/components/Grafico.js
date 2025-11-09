// Grafico.js
export function crearGrafico(datos) {
    return {
        data: [
            {
                x: datos.años_lista,
                y: datos.total_por_año,
                type: "scatter",
                mode: "lines+markers",
                name: "Total",
                line: { color: "blue", width: 2 },
                fill: "tozeroy",
                fillcolor: "hsla(240, 54%, 85%, 0.20)",
                //hovertemplate: "%{y:.2s} $",
                hovertemplate: "%{y:,.0f}",
            },
            {
                x: datos.años_lista,
                y: datos.intereses_por_año,
                type: "scatter",
                mode: "lines+markers",
                name: "Interests",
                line: { color: "orange", width: 2 },
                fill: "tozeroy",
                fillcolor: "rgba(190, 131, 22, 0.2)", // naranja translúcido
                hovertemplate: "%{y:,.0f}",
            },
            {
                x: datos.años_lista,
                y: datos.aportes_por_año,
                type: "scatter",
                mode: "lines+markers",
                name: "Contributions",
                line: { color: "green", width: 2 },
                fill: "tozeroy",
                fillcolor: "rgba(0, 128, 0, 0.2)", // verde translúcido
                hovertemplate: "%{y:,.0f}",
            },
            {
                x: datos.años_lista,
                y: datos.retiros_por_año,
                type: "scatter",
                mode: "lines+markers",
                name: "Withdrawals",
                line: { color: "red", width: 2 },
                hovertemplate: "%{y:,.0f}",
            },
        ],
        layout: {
            title: {
                text: "Investment Growth", // título principal
                font: { size: 24 },
                x: 0.5, // centra horizontalmente
                xanchor: "center",
            },
            xaxis: {
                title: {
                    text: "Years",
                    font: { size: 16 },
                },
                showgrid: true,
                zeroline: false,
            },
            yaxis: {
                title: {
                    text: "USD",
                    font: { size: 16 },
                },
                showgrid: true,
                zeroline: false,
            },
            margin: { t: 60, r: 30, l: 50, b: 50 },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            hovermode: "x unified",
            autosize: true,
        },
        config: { responsive: true },
        key: Math.random(), // para forzar re-render
    };
}
