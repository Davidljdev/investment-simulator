# Investment Simulator - Next.js

This is a **stock investment simulator** built with **Next.js**, **React**, and **Plotly.js**, designed to help investors visualize the evolution of their portfolio over time. It allows users to customize contributions, returns, withdrawals, and taxes.

---

## Features

* Simulates investment growth with **monthly contributions**, **annual return**, **withdrawals**, and **taxes**.  
* Interactive chart powered by **Plotly.js**, showing values on hover and a legend at the bottom.  
* **Responsive interface** built with cards and input controls.  
* **Collapsible card** with usage guide and detailed explanation of the simulator.

---

## Libraries / Dependencies

These are the main libraries used in the project:

* **React** (`react`, `react-dom`) – main framework.  
* **Next.js** (`next`) – server-side rendering framework.  
* **Plotly.js** (`react-plotly.js`, `plotly.js`) – for interactive charts.  
* **Tailwind CSS** (`tailwindcss`, `postcss`, `autoprefixer`) – for styles and layout.  
* **Shadcn/UI Components** (`@/components/ui/card`, `@/components/ui/input`, `@/components/ui/label`, `@/components/ui/slider`) – custom UI components.  
* **Dynamic imports** (`next/dynamic`) – to render the chart on the client side.  
* **Optional utilities**: additional helper libraries as needed (e.g., `classnames`).

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install

# Core React and Next.js libraries
npm install react react-dom next

# Plotly.js for interactive charts
npm install react-plotly.js plotly.js

# Tailwind CSS and dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Shadcn/UI components (if used via npm)
npm install @shadcn/ui

# Optional utilities (e.g., dynamic class handling)
npm install classnames
```

Make sure you have Node.js >= 18.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
/components
  /ui
    Card.js
    CardContent.js
    Input.js
    Label.js
    Slider.js
/pages
  index.js           -> main page with InvestmentSimulator
/Grafico.js          -> function for creating Plotly charts
/Proceso.js          -> investment simulation logic
/Variables.js        -> default parameter values
```

---

## Usage

* Adjust the **Initial Investment**, **Monthly Contributions**, **Annual Return**, etc.  
* Watch how the **chart** updates in real time.  
* Check **Total Accumulated**, **Net After Taxes**, and **Estimated Taxes**.  
* Expand the **explanatory card** to see a guide for each parameter.

---

## Notes

* This project is **for educational purposes only** and **does not constitute financial advice**.  
* Make sure the **currency and percentage values** are adapted to your local context.  
* The simulator uses a deterministic pseudo-random generator to simulate **contribution frequency**.

---

## Deployment

* Can be deployed to **Vercel**, **Netlify**, or any Next.js-compatible hosting service:

```bash
npm run build
npm run start
```

* Vercel will automatically detect that this is a Next.js project and configure everything.

---

## License

Licensed by David, PhD in Nothing.
