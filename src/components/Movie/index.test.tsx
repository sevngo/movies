import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Movie from ".";

vi.mock("axios");

const { VITE_API_URL, VITE_API_KEY } = import.meta.env;
describe("App", () => {
  it("should fetch a movie", async () => {
    const movieId = 901;
    const route = `/movie/${movieId}`;
    const data = {
      release_date: "1931-02-01",
      original_title: "City Lights",
      overview:
        "In this sound-era silent film, a tramp falls in love with a beautiful blind flower seller.",
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const axiosGet = axios.get;

    vi.mocked(axiosGet).mockResolvedValueOnce({ data });
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={"movie/:movieId"} element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );
    screen.getByText("Loading...a");
    screen.debug();
    await screen.findByText("City Lights");
    expect(axiosGet).toHaveBeenCalledWith(
      `${VITE_API_URL}/movie/${movieId}?api_key=${VITE_API_KEY}`
    );
  });
});
