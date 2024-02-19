import { render, screen, waitFor } from '@testing-library/react';
import OrderDisplay from '../Components/OrderDisplay';

import testVacancies from '../Components/testVacancies.json';

// const packagedTestVacancies = { vacancies: testVacancies }

describe('OrderDisplay test suite', () => {

    test(`should render the correct amount of cards`, () => {
        render(<OrderDisplay vacancies={testVacancies.vacancies} />);
        const cards = screen.getAllByTestId("test-order-card");
        const numberOfCards = testVacancies.vacancies.length;
        expect(cards.length).toBe(numberOfCards);
    });

    test(`it should render loading text without props`, () => {
        render(<OrderDisplay />);
        expect(screen.getByText(`We have no Vacancy cards to display :(`)).toHaveTextContent(`We have no Vacancy cards to display :(`)
    })
})