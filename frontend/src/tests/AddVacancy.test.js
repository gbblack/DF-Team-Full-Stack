import AddVacancy from "../Components/AddVacancy";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock('axios')

describe("handleSubmit functions properly", () => {

    test("it sends the data", async () => {
        axios.post.mockResolvedValueOnce()
        render(< AddVacancy />);
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);

        const positionInput = screen.getByTestId("position");
        fireEvent.change(positionInput, { target: { value: `Flying without wings` } })
        const locationInput = screen.getByTestId("location");
        fireEvent.change(locationInput, { target: { value: `Flying without wings` } })
        const dateInput = screen.getByTestId("start-date");
        fireEvent.change(dateInput, { target: { value: `2022-05-24` } })
        const submitBtn = screen.getByTestId("submit");
        await waitFor(() => fireEvent.submit(submitBtn));

        expect(axios.post).toBeCalledWith("http://localhost:4000/industryPartner/vacancies", { "position": "Flying without wings", "location": "Flying without wings", "startDate": "2022-05-24" }, { "headers": { "x-access-token": undefined } })
    })


    test("checks renders error if post doesn't work", async () => {
        axios.post.mockImplementationOnce(async () => { throw new Error() });
        render(< AddVacancy />);
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);

        const positionInput = screen.getByTestId("position");
        fireEvent.change(positionInput, { target: { value: `Flying without wings` } })
        const locationInput = screen.getByTestId("location");
        fireEvent.change(locationInput, { target: { value: `Flying without wings` } })
        const dateInput = screen.getByTestId("start-date");
        fireEvent.change(dateInput, { target: { value: `2022-05-24` } })
        const submitBtn = screen.getByTestId("submit");
        await waitFor(() => fireEvent.submit(submitBtn));

        const responseMsg = await waitFor(() => screen.getByText("Vacancy could not be added."))

        expect(responseMsg).toBeInTheDocument();
    })

    test('resets state after a succesful signup', () => {
        axios.post.mockResolvedValueOnce()
        render(< AddVacancy />);
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);

        const positionInput = screen.getByTestId("position");
        fireEvent.change(positionInput, { target: { value: `Flying without wings` } })
        const locationInput = screen.getByTestId("location");
        fireEvent.change(locationInput, { target: { value: `Flying without wings` } })
        const dateInput = screen.getByTestId("start-date");
        fireEvent.change(dateInput, { target: { value: `2022-05-24` } })

        expect(screen.getAllByDisplayValue(`Flying without wings`)).toHaveLength(2);

        const submitBtn = screen.getByTestId("submit");
        fireEvent.submit(submitBtn);

        expect(positionInput).toHaveDisplayValue(``);
        expect(locationInput).toHaveDisplayValue(``);
        // expect(dateInput).toHaveDisplayValue(``);

    })

    test(`that confirm message appears`, async () => {                                        //////////////////////////////////////////////////////////////////
        axios.post.mockResolvedValueOnce()
        render(< AddVacancy />);
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);

        const positionInput = screen.getByTestId("position");
        fireEvent.change(positionInput, { target: { value: `Flying without wings` } })
        const locationInput = screen.getByTestId("location");
        fireEvent.change(locationInput, { target: { value: `Flying without wings` } })
        const dateInput = screen.getByTestId("start-date");
        fireEvent.change(dateInput, { target: { value: `2022-05-24` } })

        const submitBtn = screen.getByTestId("submit");
        fireEvent.submit(submitBtn);

        const responseMsg = await waitFor(() => screen.getByText("Vacancy successfully added!"));

        expect(responseMsg).toBeInTheDocument();
    })

})

describe("renders components properly", () => {
    beforeEach(() => {
        render(< AddVacancy />)
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);
    })
    test("it renders the position text field", () => {
        expect(screen.getByTestId("position")).toBeInTheDocument();
    })
    test("it renders the location text field", () => {
        expect(screen.getByTestId("location")).toBeInTheDocument();
    })
    test("it renders the start date text field", () => {
        expect(screen.getByTestId("start-date")).toBeInTheDocument();
    })
    test("it renders the submit button", () => {
        expect(screen.getByTestId("submit")).toBeInTheDocument();
    })
})


describe("handleChange operates properly", () => {
    beforeEach(() => {
        render(< AddVacancy />)
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);
    });

    test("When change position field, position state is updated", () => {
        const positionInput = screen.getByTestId("position");
        fireEvent.change(positionInput, { target: { value: `Flying without wings` } })
        expect(screen.getByDisplayValue(`Flying without wings`)).toBeInTheDocument();
    });

    test("When change location field, location state is updated", () => {
        const locationInput = screen.getByTestId("location");
        fireEvent.change(locationInput, { target: { value: `Flying without wings` } })
        expect(screen.getByDisplayValue("Flying without wings")).toBeInTheDocument();
    });

})
