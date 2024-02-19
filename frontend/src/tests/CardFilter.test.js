import CardFilter from "../Components/CardFilter";
import CardDisplay from "../Components/CardDisplay"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import testData from '../Components/testGrads.json';
import axios from 'axios';

jest.mock("axios");

jest.mock("../Components/GradCard", () => () => <div data-testid="test-grad-card"></div>);
// jest.mock("../Components/CardDisplay", () => () => <div data-testid="test-card-display"></div>);

describe('Renders the filter suite', () => {

    beforeEach(() => {

        render(<CardFilter handleFilter={() => { }} Data={testData} originalData={testData} />)
    })

    test(`test that the mock axios actually does anything`, async () => {
        axios.get.mockResolvedValueOnce({ data: { payload: testData } });
        render(<CardDisplay />)

        const cards = await waitFor(() => screen.getAllByTestId("test-grad-card"));
        expect(cards).toHaveLength(5)
    })

    test('Should render all filter buttons', () => {
        const items = screen.getAllByRole('button')
        expect(items).toHaveLength(6)
    })

    test('Should render each button with the right title', () => {
        expect(screen.getByTestId('all')).toBeInTheDocument()
        expect(screen.getByText('Software Engineering')).toBeInTheDocument();
        expect(screen.getByText('Data Science')).toBeInTheDocument();
        expect(screen.getByText('Cloud Engineering')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('Unavailable')).toBeInTheDocument();
    })
})

describe('Card Filter button press renders', () => {

    beforeEach(() => {
        // render(<CardFilter handleFilter={() => { }} Data={testData} originalData={testData} />)
        axios.get.mockResolvedValueOnce({ data: { payload: testData } });
        render(<CardDisplay />) //automatically renders cardfilter
    })

    test('Should render the correct amount of cards when filtered by All', async () => {
        const allButton = screen.getByText('All')
        fireEvent.click(allButton);
        const cards = await waitFor(() => screen.getAllByTestId("test-grad-card"));
        expect(cards).toHaveLength(5)
    })

    test('Should render the correct amount of cards when filtered by SE', () => {
        const SEButton = screen.getByText('Software Engineering')
        fireEvent.click(SEButton);
        const cards = screen.getAllByTestId('test-grad-card')
        expect(cards).toHaveLength(2)

    })


    test('Should render the correct amount of cards when filtered by DS', () => {
        const DSButton = screen.getByText('Data Science')
        fireEvent.click(DSButton);
        const cards = screen.getAllByTestId('test-grad-card')
        expect(cards).toHaveLength(2)
    })


    test('Should render the correct amount of cards when filtered by CE', () => {
        const CEButton = screen.getByText('Cloud Engineering')
        fireEvent.click(CEButton);
        const cards = screen.getAllByTestId('test-grad-card')
        expect(cards).toHaveLength(1)

    })

})


