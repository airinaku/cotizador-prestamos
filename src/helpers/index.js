const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat("es-ar", {
    style: "currency",
    currency: "ARS",
  });
  return formatter.format(valor);
};

const calcularTotalPagar = (cantidad, plazo) => {
  let total;

  //a > cantidad solicitada, < interés
  if (cantidad < 20000) {
    total = cantidad * 1.5;
  } else if (cantidad >= 20000 && cantidad < 40000) {
    total = cantidad * 1.4;
  } else if (cantidad >= 40000 && cantidad < 60000) {
    total = cantidad * 1.3;
  } else {
    total = cantidad * 1.2;
  }

  //plazo de tiempo a pagar (a > plazo, > interés)

  if (plazo === 6) {
    total *= 1.2;
  } else if (plazo === 12) {
    total *= 1.4;
  } else {
    total *= 1.6;
  }
  return total;
};

export { formatearDinero, calcularTotalPagar };
