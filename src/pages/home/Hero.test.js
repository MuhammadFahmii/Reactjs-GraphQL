import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Hero from "./Hero";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockImage = {
  results: [
    {
      poster_path:
        "https://image.tmdb.org/t/p/original/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
      release_date: "2021-09-30",
      vote_average: "7.2",
      runtime: "97",
    },
  ],
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockImage),
  });
});

test("Hero Image Render", async () => {
  await act(async () => render(<Hero />));
  const img = await screen.getByRole("img");
  const releaseDate = await screen.getByText(/Release Date/);
  const rating = await screen.getByText(/Rating/);
  const duration = await screen.getByText(/Duration/);
  expect(img).toBeInTheDocument();
  expect(releaseDate).toBeInTheDocument();
  expect(rating).toBeInTheDocument();
  expect(duration).toBeInTheDocument();
});
