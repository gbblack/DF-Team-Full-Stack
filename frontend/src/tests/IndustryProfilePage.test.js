import { render, screen, waitFor } from '@testing-library/react';
import IndustryProfilePage from '../Components/IndustryProfilePage';
import axios from 'axios';
import React from 'react';
import OrderDisplay from '../Components/OrderDisplay';
import IndustryProfile from '../Components/IndustryProfile';

const testVacancies = require('../Components/testVacancies.json');

jest.mock('axios');
jest.mock("../Components/OrderCard", () => () => <div data-testid="test-order-card"></div>);
localStorage.setItem("user", JSON.stringify({ "accessToken": "fakeToken" }))
describe('IndustryProfilePage test suite', () => {
    test(`should render the OrderDisplay component`, () => {
        expect(React.isValidElement(<OrderDisplay />)).toBeTruthy();
    });

    test(`should render the IndustryProfile component`, () => {
        expect(React.isValidElement(<IndustryProfile />)).toBeTruthy();
    });
    test(`should render both the OrderDisplay and the IndustryProfile component`, () => {
        expect(React.isValidElement(<IndustryProfile />)).toBeTruthy();
        expect(React.isValidElement(<OrderDisplay />)).toBeTruthy();
    });


    test(`should not throw an error`, async () => {

        axios.get.mockResolvedValueOnce({ data: { payload: testVacancies.vacancies } });
        render(<IndustryProfilePage />);
        const result = await waitFor(() => screen.getByTestId("test-ipp"))
        expect(result).toBeTruthy();
    });


    test(`should throw an error`, async () => {
        axios.get.mockResolvedValueOnce();
        render(<IndustryProfilePage />);
        const result = await waitFor(() => screen.getByText(`There are no cards to display :(`))
        expect(result).toHaveTextContent(`There are no cards to display :(`);
    })

});
