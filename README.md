# Simulador de Inversiones - Next.js

Este es un **simulador de inversiones en bolsa** construido con **Next.js**, **React** y **Plotly.js**, diseñado para ayudar a los inversores a visualizar la evolución de su portafolio a lo largo del tiempo. Permite personalizar aportes, rentabilidades, retiros y impuestos.

---

## Características

* Simula el crecimiento de la inversión con **aportes mensuales**, **rentabilidad anual**, **retiros** e **impuestos**.
* Gráfico interactivo con **Plotly.js** mostrando valores al pasar el cursor y leyenda en la parte inferior.
* **Interfaz responsiva** construida con cards y controles de entrada.
* **Card colapsable** con explicación y guía de uso del simulador.

---

## Librerías / Dependencias

Estas son las principales librerías usadas en el proyecto:

* **React** (`react`, `react-dom`) – framework principal.
* **Next.js** (`next`) – framework de renderizado del lado del servidor.
* **Plotly.js** (`react-plotly.js`, `plotly.js`) – para gráficos interactivos.
* **Tailwind CSS** (`tailwindcss`, `postcss`, `autoprefixer`) – para estilos y layout.
* **Componentes Shadcn/UI** (`@/components/ui/card`, `@/components/ui/input`, `@/components/ui/label`, `@/components/ui/slider`) – componentes UI personalizados.
* **Dynamic imports** (`next/dynamic`) – para renderizado del gráfico en el cliente.
* **Utilidades opcionales**: otras librerías helper según tu proyecto (por ejemplo, `classnames`).

---

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd <carpeta-del-proyecto>
```

2. Instalar dependencias:

```bash
npm install

# Librerías principales de React y Next.js
npm install react react-dom next

# Plotly.js para gráficos interactivos
npm install react-plotly.js plotly.js

# Tailwind CSS y dependencias de desarrollo
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Componentes Shadcn/UI (si los usas desde npm)
npm install @shadcn/ui

# Utilidades opcionales (ej. manejo de clases dinámicas)
npm install classnames

```

Asegúrate de tener Node.js >= 18.

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Estructura de Carpetas

```
/components
  /ui
    Card.js
    CardContent.js
    Input.js
    Label.js
    Slider.js
/pages
  index.js           -> página principal con InvestmentSimulator
/Grafico.js          -> función para crear el gráfico con Plotly
/Proceso.js          -> lógica de simulación de inversión
/Variables.js        -> valores por defecto de los parámetros
```

---

## Uso

* Ajusta los valores de **Inversión Inicial**, **Aportes Mensuales**, **Rentabilidad Anual**, etc.
* Observa cómo el **gráfico** se actualiza en tiempo real.
* Consulta **Total Acumulado**, **Neto después de impuestos** y **Impuestos estimados**.
* Expande la **card explicativa** para recibir guía sobre cada parámetro.

---

## Notas

* Este proyecto es **educativo** y **no constituye asesoramiento financiero**.
* Asegúrate de que los valores de **moneda y porcentajes** sean compatibles con tu contexto local.
* El simulador usa un generador pseudoaleatorio determinista para simular la **frecuencia de aportes**.

---

## Despliegue

* Se puede desplegar en **Vercel**, **Netlify** o cualquier hosting compatible con Next.js:

```bash
npm run build
npm run start
```

* Vercel detectará automáticamente que es un proyecto Next.js y configurará todo.

---

## Licencia

Licencia David
