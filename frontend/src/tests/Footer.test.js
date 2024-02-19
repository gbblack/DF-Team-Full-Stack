import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer';

describe(`footer tests`, () => {
    test(`Footer matches snapshot`, () => {
        const footerComponent = render(<Footer />);

        expect(footerComponent).toMatchSnapshot();
    });

    describe('link tests', () => {
        beforeEach(() => {
            render(<Footer />)
        });

        test(`test twitter link`, () => {
            expect(screen.getByTestId("t-link").closest('a')).toHaveAttribute('href', "https://twitter.com/digitalfutures0")

        });
        test(`test facebook link`, () => {

            expect(screen.getByTestId("fb-link").closest('a')).toHaveAttribute('href', "https://www.facebook.com/digital.futures2021")

        });
        test(`test LinkedIn link`, () => {

            expect(screen.getByTestId("l-link").closest('a')).toHaveAttribute('href', "https://www.linkedin.com/company/digital-futures2021")

        });
        test(`test facebook link`, () => {

            expect(screen.getByTestId("i-link").closest('a')).toHaveAttribute('href', "https://www.instagram.com/digital_futures/")

        });

    })
})