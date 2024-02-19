import LoginForm from "../Components/LoginForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}))


describe("handleSubmit functions properly", () => {

    test("it sends the data", async () => {
        axios.post.mockResolvedValueOnce()
        render(<LoginForm setMessage={() => { }} />);

        const submitBtn = screen.getByTestId("submit");
        await waitFor(() => fireEvent.submit(submitBtn));

        expect(axios.post).toBeCalledWith('http://localhost:4000/auth/login', { "email": "", "password": "" })
    })

    test("should show a response msg on failed submit", async () => {
        axios.post.mockImplementationOnce(async () => { throw new Error() });
        render(<LoginForm setMessage={() => { }} />);

        const submitBtn = screen.getByTestId("submit");

        await waitFor(() => fireEvent.submit(submitBtn));

        const responseMsg = await waitFor(() => screen.getByText("Wrong email or password"))

        expect(responseMsg).toBeInTheDocument();
    })

    test("it should show a response msg on invalid response format", async () => {
        axios.post.mockResolvedValueOnce()
        render(<LoginForm setMessage={() => { }} />);

        const submitBtn = screen.getByTestId("submit");
        await waitFor(() => fireEvent.submit(submitBtn));

        const responseMsg = await waitFor(() => screen.getByText("Wrong email or password"))

        expect(responseMsg).toBeInTheDocument();
    })

    test("correct login navigates to the spotlight page", async () => {

        axios.post.mockResolvedValueOnce({ data: { payload: { accessToken: "accessToken", role: "INDUSTRY_PARTNER" } } });
        render(<LoginForm setMessage={() => { }} />);
        const submitBtn = screen.getByTestId("submit");
        await waitFor(() => fireEvent.submit(submitBtn));


        expect(mockedNavigate).toHaveBeenCalled();
    })

})

describe("renders components properly", () => {
    beforeEach(() => {
        render(<LoginForm setMessage={() => { }} />)
    })
    test("it renders the email text field", () => {
        expect(screen.getByTestId("email")).toBeInTheDocument();
    })
    test("it renders the password text field", () => {
        expect(screen.getByTestId("password")).toBeInTheDocument();
    })
    test("it renders the submit button", () => {
        expect(screen.getByTestId("submit")).toBeInTheDocument();
    })
})


describe("handleChange operates properly", () => {
    beforeEach(() => {
        render(<LoginForm setMessage={() => { }} />)
    })
    test("When change email field, email state is updated", () => {
        const emailInput = screen.getByTestId("email");
        fireEvent.change(emailInput, { target: { value: `Flying without wings` } })
        expect(screen.getByDisplayValue(`Flying without wings`)).toBeInTheDocument();
    })
    test("When change password field, password state is updated", () => {
        const passwordInput = screen.getByTestId("password");
        fireEvent.change(passwordInput, { target: { value: `Flying without wings` } })
        expect(screen.getByDisplayValue("Flying without wings")).toBeInTheDocument();
    })
}) 