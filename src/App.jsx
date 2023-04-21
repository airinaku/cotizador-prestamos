import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(40000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    //calcular el pago por mes
    setPago(total / meses);
  }, [meses, total]);

  const MIN = 0;
  const MAX = 80000;
  const STEP = 100;

  function handleChange(e) {
    setCantidad(+e.target.value);
  }

  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert("Cantidad no válida");
      return;
    }

    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert("Cantidad no válida");
      return;
    }

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10 rounded-lg">
      <Header />

      <div className="flex justify-between my-6">
        <Button operador="-" fn={handleClickDecremento} />
        <Button operador="+" fn={handleClickIncremento} />
      </div>

      <input
        type="range"
        className="w-full h-6 bg-gray-200 accent-blue-400 hover:accent-blue-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-10 text-4xl font-extrabold text-blue-700">
        {formatearDinero(cantidad)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-blue-700 ">plazo </span>a pagar
      </h2>
      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={(e) => setMeses(+e.target.value)}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
      <div className="my-5 space-y-3 bg-gray-50 p-5 rounded-lg">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-blue-700">de pagos </span>
        </h2>

        <div className="my-5 space-y-3 bg-blue-100 p-3 rounded-lg">
          <p className="text-xl text-gray-500 text-center font-medium">
            A pagar durante: {meses} Meses
          </p>
          <p className="text-xl text-gray-500 text-center font-medium">
            Total a pagar: {formatearDinero(total)}
          </p>
          <p className="text-xl text-gray-500 text-center font-medium">
            Pago mensual: {formatearDinero(pago)}
          </p>
        </div>
      </div>
    </div>
  );
}
export default App;
