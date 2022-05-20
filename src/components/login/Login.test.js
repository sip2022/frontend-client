import React from "react";
import "@testing-library/jest-dom/extend-expect";
// permite renderizar un componente y visualizar el resultado.
import { render as rtlRender, screen } from "@testing-library/react";
// Componente a probar
import LoginForm from "./LoginForm";

import { Provider } from "react-redux";
import { store } from "../../store/store";

// Funcion para renderizar con el store

const render = (component) =>
  rtlRender(<Provider store={store}>(component)</Provider>);

describe("Login", () => {
  // Test -> ver si renderiza
  test("render content", () => {
    const component = render(<LoginForm />);
    console.log(component);
  });
});
