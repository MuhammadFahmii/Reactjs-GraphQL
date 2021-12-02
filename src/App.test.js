import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import client from "./apps/ApolloClient";
import Store from "./apps/Store";

test("Render Header", () => {
  render(
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
  const movieApp = screen.getByText(/Ez Movie/);
  expect(movieApp).toBeInTheDocument();
});
