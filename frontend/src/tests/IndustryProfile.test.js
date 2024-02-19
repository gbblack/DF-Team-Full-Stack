import { render, screen } from "@testing-library/react";
import IndustryProfile from "../Components/IndustryProfile";
import React from "react";
describe("IndustryProfile test suite", () => {
  test(`should render the correct Industry Profile title`, async () => {
    render(<IndustryProfile props={{ companyName: "HSBC" }} />);
    expect(screen.getByText("HSBC")).toBeInTheDocument();
  });

  test("should render the Partner's profile logo", () => {
    render(<IndustryProfile props={{ companyName: "HSBC" }} />);
    expect(screen.getByAltText("HSBC Logo")).toBeInTheDocument();
  });

  test("should render a default message if no key contacts provided", () => {
    render(<IndustryProfile props={{ companyName: "HSBC" }} />);
    expect(screen.getByText("No contacts added.")).toBeInTheDocument();
  });

  test("should render a default message if no office locations provided", () => {
    render(<IndustryProfile props={{ companyName: "HSBC" }} />);
    expect(screen.getByText("No locations added.")).toBeInTheDocument();
  });

  test("should render an office location if provied", () => {
    render(
      <IndustryProfile
        props={{ companyName: "HSBC", officeLocations: ["London"] }}
      />
    );
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  test("should render a key contacts details if provided", () => {
    const testContact = {
      name: "testname",
      email: "testemail",
      telephone: "012345",
      location: "testlocation",
      position: "testposition",
    };

    render(
      <IndustryProfile
        props={{ companyName: "HSBC", keyContacts: [testContact] }}
      />
    );

    expect(screen.getByText(testContact.name)).toBeInTheDocument();
    expect(screen.getByText(testContact.email)).toBeInTheDocument();
    expect(screen.getByText(testContact.telephone)).toBeInTheDocument();
    expect(screen.getByText(testContact.location)).toBeInTheDocument();
    expect(screen.getByText(testContact.position)).toBeInTheDocument();
  });
});
