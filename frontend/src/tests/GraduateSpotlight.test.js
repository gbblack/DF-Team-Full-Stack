import { render, screen } from '@testing-library/react';
import GraduateSpotlight from '../Components/GraduateSpotlight';
import CardDisplay from '../Components/CardDisplay';
import React from 'react';

describe('GraduteSpotlight test suite', () => {

    beforeEach(() => {
        render(<GraduateSpotlight />)
    });

    test(`should render the CardDisplay component`, () => {
        expect(React.isValidElement(<CardDisplay />)).toBeTruthy();
    });

    test(`should render the Graduate Spotlight title`, () => {
        expect(screen.getByText(`Graduate Spotlight`)).toBeInTheDocument();
    });

});
