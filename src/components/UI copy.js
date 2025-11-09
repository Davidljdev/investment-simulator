"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { simularInversion } from "./Proceso";
import { crearGrafico } from "./Grafico";
import { variables } from "./Variables";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function InvestmentSimulator() {
  const [params, setParams] = useState({
    inversionInicial: variables.inversion_inicial,
    aporteMensual: variables.aporte_mensual,
    rentabilidadAnual: variables.rentabilidad_anual,
    años: variables.años,
    frecuenciaAporte: variables.frecuencia_aporte,
    añoDejarAportar: variables.año_dejar_de_aportar,
    añoRetiro: variables.año_retiro,
    porcentajeRetiroAnual: variables.porcentaje_retiro_anual,
    tasaImpuesto: variables.tasa_impuesto,
  });

  const [datos, setDatos] = useState(null);
  const [figura, setFigura] = useState(null);

  useEffect(() => {
    const resultado = simularInversion({
      inversion_inicial: params.inversionInicial,
      aporte_mensual: params.aporteMensual,
      rentabilidad_anual: params.rentabilidadAnual,
      años: params.años,
      frecuencia_aporte: params.frecuenciaAporte,
      año_dejar_de_aportar: params.añoDejarAportar,
      año_retiro: params.añoRetiro,
      porcentaje_retiro_anual: params.porcentajeRetiroAnual,
      tasa_impuesto: params.tasaImpuesto,
    });
    setDatos(resultado);

    const grafico = crearGrafico(resultado);
    grafico.layout.legend = {
      orientation: "h",
      y: -0.2,
      x: 0.5,
      xanchor: "center",
    };
    setFigura(grafico);
  }, [params]);

  const handleChange = (key, value) => {
    setParams({ ...params, [key]: value });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Investment Simulator</h1>

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="space-y-1">
            <Label>Initial Investment (USD)</Label>
            <Input
              type="number"
              step="500"
              value={params.inversionInicial}
              onChange={(e) => handleChange("inversionInicial", +e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Monthly Contribution (USD)</Label>
            <Input
              type="number"
              step="50"
              value={params.aporteMensual}
              onChange={(e) => handleChange("aporteMensual", +e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Annual Return (%)</Label>
            <Input
              type="number"
              value={params.rentabilidadAnual * 100}
              onChange={(e) => handleChange("rentabilidadAnual", +e.target.value / 100)}
            />
          </div>

          <div className="space-y-1">
            <Label>Portfolio Lifetime (Years)</Label>
            <Input
              type="number"
              step="5"
              value={params.años}
              onChange={(e) => handleChange("años", +e.target.value)}
            />
          </div>

          {/* === Deposit Frequency reemplazado por input numérico === */}
          <div className="space-y-1">
            <Label>Deposit Frequency (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              step={5}
              value={params.frecuenciaAporte * 100}
              onChange={(e) => handleChange("frecuenciaAporte", +e.target.value / 100)}
            />
          </div>

          <div className="space-y-1">
            <Label>Year to Stop Deposits</Label>
            <Input
              type="number"
              value={params.añoDejarAportar}
              onChange={(e) => handleChange("añoDejarAportar", +e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Year to Start Withdrawals</Label>
            <Input
              type="number"
              value={params.añoRetiro}
              onChange={(e) => handleChange("añoRetiro", +e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Annual Withdrawal Rate (%)</Label>
            <Input
              type="number"
              value={params.porcentajeRetiroAnual * 100}
              onChange={(e) => handleChange("porcentajeRetiroAnual", +e.target.value / 100)}
            />
          </div>

          {/* === Tax Rate reemplazado por input numérico === */}
          <div className="space-y-1">
            <Label>Tax Rate on Gains (%)</Label>
            <Input
              type="number"
              min={0}
              max={50}
              step={1}
              value={params.tasaImpuesto * 100}
              onChange={(e) => handleChange("tasaImpuesto", +e.target.value / 100)}
            />
          </div>
        </CardContent>
      </Card>

      {datos && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">💰 Total Accumulated</h2>
              <p className="text-xl font-bold">
                {datos?.total_final ? `$${datos.total_final.toLocaleString()}` : "—"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">🏦 Net Total After Taxes</h2>
              <p className="text-xl font-bold">${datos.total_post_impuestos.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">💸 Estimated Taxes</h2>
              <p className="text-xl font-bold">${datos.monto_impuestos.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {datos?.años_100k && (
        <div className="text-green-600 font-semibold text-center">
          🎯 $100,000 is reached approximately after {datos.años_100k} years.
        </div>
      )}

      {figura && (
        <Card>
          <CardContent style={{ height: "500px", padding: "1rem" }}>
            <Plot
              key={figura.key}
              data={figura.data}
              layout={figura.layout}
              config={figura.config}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
