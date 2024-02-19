import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Components/Header";
import React from "react";

describe(`header tests`, () => {
  test(`That the Digital Futures link works`, () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId("df-link")).toBeInTheDocument();
  });

  test(`That the industyPartner link is rendered on Spotlight route`, () => {
    //Arrange
    //Need to render the header on the spotlight route
    render(
      <MemoryRouter initialEntries={["/spotlight"]}>
        <Header />
      </MemoryRouter>
    );

    //Expect
    //Header to have rendered a particular component
    expect(screen.getByTestId("profile-link")).toBeInTheDocument();
  });

  test(`That the Spotlightpage link is rendered on IndustryPartner route`, () => {
    //Arrange
    //Need to render the header on the index route
    render(
      <MemoryRouter initialEntries={["/industryPartner"]}>
        <Header />
      </MemoryRouter>
    );

    //Expect
    //Header to have rendered a particular component
    expect(screen.getByTestId("spotlight-link")).toBeInTheDocument();
  });

  test(`That the Log out link is rendered on IndustryPartner route`, () => {
    render(
      <MemoryRouter initialEntries={["/industryPartner"]}>
        <Header />
      </MemoryRouter>
    );

    //Expect
    //Header to have rendered a particular component
    expect(screen.getByTestId("logout-link")).toBeInTheDocument();
  });

  test(`That the Log out link is rendered on Spotlight route`, () => {
    render(
      <MemoryRouter initialEntries={["/spotlight"]}>
        <Header />
      </MemoryRouter>
    );

    //Expect
    //Header to have rendered a particular component
    expect(screen.getByTestId("logout-link")).toBeInTheDocument();
  });

  test(`That the Log out link is not rendered on the Login route`, () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Header />
      </MemoryRouter>
    );

    //Expect
    //Header to have rendered a particular component
    expect(screen.queryByTestId("logout-link")).not.toBeInTheDocument();
  });
});
