import { act, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { QueryGetFavouriteMovie } from "../../graphql/Query";
import FavouriteMovie from "./FavouriteMovie";

const mockedUsedNavigate = jest.fn();
const mockedUseDispatch = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedUseDispatch,
}));

const mocks = [
  {
    request: {
      query: QueryGetFavouriteMovie,
      variables: {},
    },
    result: {
      data: {
        movie_app_favourite_movies: [
          {
            id: 1,
            image: "http://google.com",
            overview: "lalala",
            title: "Avengers",
            id_movie: 1,
          },
        ],
      },
    },
  },
];

test("Render favourite movie", async () => {
  window.scrollTo = jest.fn();
  await act(async () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FavouriteMovie />
      </MockedProvider>
    )
  );
  const title = await screen.findByText(/Avengers/);
  expect(title).toBeInTheDocument();
});
