import { render, screen } from "@testing-library/react";
import OrderCard from "../Components/OrderCard";

const testVacancies = require("../Components/testVacancies.json");

describe("OrderCard test suite", () => {
  const testVacancy = testVacancies.vacancies[4];
  beforeEach(() => {
    render(<OrderCard props={testVacancy} />);
  });

  test(`should render vacancy position`, () => {
    expect(screen.getByText("Grating dat cheese")).toBeInTheDocument();
  });

  test(`should render vacancy position`, () => {
    expect(screen.getByText('Grating dat cheese')).toBeInTheDocument();
  });

  test(`should render the vacancy location`, () => {
    expect(screen.getByText(`The moon. The moon is made of cheese`)).toBeInTheDocument();
  });

  test(`should render the vacancy startDate`, () => {
    expect(screen.getByText(`04/03/2023`)).toBeInTheDocument();
  });
});