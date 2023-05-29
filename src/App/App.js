import "./App.css";
import React, { useState } from "react";

import Button from "./botones/botones";
import Pantalla from "./pantalla/pantalla";

const Values = [
  ["DEL", "+/-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "=", "wuuuu"],
];

const mod = (num) => num.toString().replace(/\s/g, "");

const toString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\.|$))/g, "$1 ");

const calcular = (a, b, sign) => {
  if (sign === "+") {
    if (a + b > 999999999) {
      return "ERROR";
    }
    return a + b;
  }
  if (sign === "-") {
    if (a - b < 0) {
      return "ERROR***";
    }
    return a - b;
  }
  if (sign === "X") {
    if (a * b > 999999999) {
      return "ERROR";
    }
    return a * b;
  }
  return a / b;
};

// const valor = "000000000";

function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    valor: 0,
  });

  const reset = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      valor: 0,
    });
  };

  const invert = () => {
    if (calc.sign) {
      setCalc({
        ...calc,
        num: calc.num ? toString(mod(calc.num) * -1) : 0,
      });
    } else {
      setCalc({
        ...calc,
        num: calc.num ? toString(mod(calc.num) * -1) : 0,
        valor: calc.valor ? toString(mod(calc.valor) * -1) : 0,
        sign: "",
      });
    }
  };

  const modulo = () => {
    let num = calc.num ? parseFloat(mod(calc.num)) : 0;
    let valor = calc.valor ? parseFloat(mod(calc.valor)) : 0;
    setCalc({
      ...calc,
      num: (num /= 100 ** 1),
      valor: (valor /= 100 ** 1),
      sign: "",
    });
  };

  const numH = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (mod(calc.num).length < 9) {
      setCalc({
        ...calc,
        num:
          mod(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toString(Number(mod(calc.num + value)))
            : toString(calc.num + value),
        valor: !calc.sign ? 0 : calc.valor,
      });
    }
  };

  const punto = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const igual = () => {
    const val = toString(
      calcular(Number(mod(calc.valor)), Number(mod(calc.num)), calc.sign)
    );

    if (calc.sign && calc.num && mod(val).length < 10) {
      setCalc({
        ...calc,
        valor:
          calc.num === "0" && calc.sign === "/"
            ? "0"
            : toString(
                calcular(
                  Number(mod(calc.valor)),
                  Number(mod(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    } else {
      setCalc({
        ...calc,
        valor: "ERROR",
        sign: "",
        num: 0,
      });
    }
  };

  const operarador = (e) => {
    let res;

    if (!calc.num) {
    res = calc.valor;
    } else if (!calc.valor) {
    res = calc.num;
    } else {
    res = toString(
        calcular(Number(mod(calc.valor)), Number(mod(calc.num)), calc.sign)
    );
    }
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      valor: !calc.num
        ? calc.valor
        : !calc.valor
        ? calc.num
        : toString(
            calcular(Number(mod(calc.valor)), Number(mod(calc.num)), calc.sign)
          ),
      num: 0,
    });
  };

  const eventHandler = (e, btn) => {
    switch (btn) {
      case "DEL":
        reset();
        break;
      case "+/-":
        invert();
        break;
      case "%":
        modulo();
        break;
      case "=":
        igual();
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        operarador(e);
        break;
      case ".":
        punto(e);
        break;
      default:
        numH(e);
        break;
    }
  };

  return (
    <div className="calculadora">
      <Pantalla valor={calc.num ? calc.num : calc.valor} />
      <div className="boton">
        {Values.flat().map((btn) => {
          const i = btn;
          return (
            <Button
              key={i}
              className={btn}
              value={btn}
              onClick={(e) => eventHandler(e, btn)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
