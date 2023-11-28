import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import Movies from ".";

vi.mock("axios");

const { VITE_API_URL, VITE_API_KEY } = import.meta.env;
describe("App", () => {
  it("should fetch movies then refetch with search query", async () => {
    const firstTitle = "First Movie";
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const axiosGet = axios.get;

    vi.mocked(axiosGet).mockResolvedValueOnce({
      data: {
        results: [{ title: firstTitle, id: 0 }],
      },
    });
    render(<Movies />, { wrapper: BrowserRouter });
    screen.getByText("Loading...");
    await screen.findByText(firstTitle);
    expect(axiosGet).toHaveBeenCalledWith(
      `${VITE_API_URL}/discover/movie?api_key=${VITE_API_KEY}`
    );

    // refetch with search query params
    const secondTitle = "Second Movie";
    vi.mocked(axiosGet).mockResolvedValueOnce({
      data: {
        results: [{ title: secondTitle, id: 0 }],
      },
    });

    const searchValue = "Second";
    fireEvent.change(screen.getByLabelText("Search :"), {
      target: { value: searchValue },
    });

    await screen.findByText(secondTitle);

    expect(axiosGet).toHaveBeenCalledWith(
      `${VITE_API_URL}/search/movie?api_key=${VITE_API_KEY}&query=${searchValue}`
    );
  });
});
