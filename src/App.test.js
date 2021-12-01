import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./apps/Store";

test("Render Header", () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
  const movieApp = screen.getByText(/Movie App/);
  expect(movieApp).toBeInTheDocument();
});
