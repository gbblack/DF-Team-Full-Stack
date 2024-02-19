import UserAuthForms from "../Components/UserAuthForms";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("UserAuthForms Login Test Suite", () => {
  beforeEach(() => {
    render(<UserAuthForms />);
  });

  test(`should have titles in document`, () => {
    expect(screen.getByText("DFX Login")).toBeInTheDocument();
    const switchBtn = screen.getByTestId("signup-switch");
    fireEvent.click(switchBtn);
    expect(screen.getByText("DFX Signup")).toBeInTheDocument();
  });

  test(`should be able to switch back to login`, () => {
    const switchBtn = screen.getByTestId("signup-switch");
    fireEvent.click(switchBtn);
    const switchBtn2 = screen.getByTestId("login-switch");
    fireEvent.click(switchBtn2);
    expect(screen.getByText("DFX Login")).toBeInTheDocument();
  });

  test("login form should be in the document", () => {
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("login email field should be in the document", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

describe("UserAuthForms Sign up Test Suite", () => {
  beforeEach(() => {
    render(<UserAuthForms />);
    const switchBtn = screen.getByTestId("signup-switch");
    fireEvent.click(switchBtn);
  });

  test("signup form should be in the document", () => {
    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
  });
});
