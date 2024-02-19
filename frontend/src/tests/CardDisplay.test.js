import { render, screen, waitFor } from "@testing-library/react";
import CardDisplay from "../Components/CardDisplay";
import axios from "axios";

const testGrads = require("../Components/testGrads.json");

jest.mock("axios");

jest.mock("../Components/GradCard", () => () => (
  <div data-testid="test-grad-card"></div>
));

describe("CardDisplay test suite", () => {
  test(`should render the correct amount of cards`, async () => {
    axios.get.mockResolvedValueOnce({ data: { payload: testGrads } });

    render(<CardDisplay />);

    const cards = await waitFor(() => screen.getAllByTestId("test-grad-card"));

    const numberOfCards = testGrads.length;

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(cards.length).toEqual(numberOfCards);
  });

  test(`should throw an error`, async () => {
    axios.get.mockResolvedValueOnce();
    render(<CardDisplay />);
    const result = await waitFor(() =>
      screen.getByText(`There are no cards to display :(`)
    );
    expect(result).toHaveTextContent(`There are no cards to display :(`);
  });
});
