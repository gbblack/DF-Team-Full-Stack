import { fireEvent, render, screen } from '@testing-library/react';
import DisplayModal from '../Components/DisplayModal'

const testGrads = require('../Components/testGrads.json');

describe('display Modal Tests', () => {
    beforeEach(() => {
        let testGrad = testGrads[0];
        render(<DisplayModal props={testGrad} />)
    })
    test('should render graduate name', () => {
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);
        expect(screen.getByText('Jared Kings')).toBeInTheDocument();
    });

    test(`should successfully close modal again`, () => {
        const btnDisplay = screen.getByTestId("display-button");
        fireEvent.click(btnDisplay);
        const btnClose = screen.getByTestId("close-button")
        fireEvent.click(btnClose);
        expect(screen.getByText('View Profile')).toBeInTheDocument();
    })

})        