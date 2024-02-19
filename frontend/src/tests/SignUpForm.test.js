import SignupForm from "../Components/SignupForm";
("../Components/SignupForm");
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("handleSubmit functions properly", () => {
  test("it sends the data", async () => {
    axios.post.mockResolvedValueOnce();
    render(<SignupForm switchPage={() => {}} setMessage={() => {}} />);

    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: `Flying without wings` } });
    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: `Flying without wings` },
    });
    const submitBtn = screen.getByTestId("submit");
    await waitFor(() => fireEvent.submit(submitBtn));

    expect(axios.post).toBeCalledWith("http://localhost:4000/auth/signup", {
      email: "Flying without wings",
      companyName: "Flying without wings",
      password: "Flying without wings",
    });
  });

  test("checks renders error if post doesn't work", async () => {
    axios.post.mockImplementationOnce(async () => {
      throw new Error();
    });
    render(<SignupForm switchPage={() => {}} setMessage={() => {}} />);

    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: `Flying without wings` } });
    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: `Flying without wings` },
    });
    const submitBtn = screen.getByTestId("submit");
    await waitFor(() => fireEvent.submit(submitBtn));

    const responseMsg = await waitFor(() =>
      screen.getByText("This email already exists")
    );

    expect(responseMsg).toBeInTheDocument();
  });

  test("resets state after a succesful signup", () => {
    axios.post.mockResolvedValueOnce();
    render(<SignupForm switchPage={() => {}} setMessage={() => {}} />);

    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: `Flying without wings` } });
    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: `Flying without wings` },
    });

    expect(screen.getAllByDisplayValue(`Flying without wings`)).toHaveLength(4);

    const submitBtn = screen.getByTestId("submit");
    fireEvent.submit(submitBtn);
    expect(emailInput).toHaveDisplayValue(``);
    expect(companyInput).toHaveDisplayValue(``);
    expect(passwordInput).toHaveDisplayValue(``);
  });

  test(`doesn't reset state after having an empty required field`, () => {
    axios.post.mockResolvedValueOnce();
    render(<SignupForm switchPage={() => {}} setMessage={() => {}} />);

    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });

    const submitBtn = screen.getByTestId("submit");
    fireEvent.submit(submitBtn);

    expect(companyInput).toHaveDisplayValue(`Flying without wings`);
  });

  test(`that confirm message appears`, () => {
    // axios.post.mockResolvedValueOnce()
    render(<SignupForm switchPage={() => {}} setMessage={() => {}} />);

    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: `Flying without wings` } });
    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: `Falling WITH wings` },
    });

    const submitBtn = screen.getByTestId("submit");
    fireEvent.submit(submitBtn);

    const responseMsg = screen.getByText(
      "Password and confirm password are not equal"
    );

    expect(responseMsg).toBeInTheDocument();
  });
});

describe("renders components properly", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });
  test("it renders the email text field", () => {
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });
  test("it renders the email text field", () => {
    expect(screen.getByTestId("company")).toBeInTheDocument();
  });
  test("it renders the password text field", () => {
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });
  test("it renders the submit button", () => {
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });
});

describe("handleChange operates properly", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });
  test("When change email field, email state is updated", () => {
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: `Flying without wings` } });
    expect(
      screen.getByDisplayValue(`Flying without wings`)
    ).toBeInTheDocument();
  });
  test("When change company field, email state is updated", () => {
    const companyInput = screen.getByTestId("company");
    fireEvent.change(companyInput, {
      target: { value: `Flying without wings` },
    });
    expect(
      screen.getByDisplayValue(`Flying without wings`)
    ).toBeInTheDocument();
  });
  test("When change password field, password state is updated", () => {
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {
      target: { value: `Flying without wings` },
    });
    expect(
      screen.getByDisplayValue("Flying without wings")
    ).toBeInTheDocument();
  });
});
