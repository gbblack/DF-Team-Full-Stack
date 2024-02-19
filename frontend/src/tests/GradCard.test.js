import { render, screen } from '@testing-library/react';
import GradCard from '../Components/GradCard';

const testGrads = require('../Components/testGrads.json');


describe('GradCard test suite', () => {
    const testGraduate = testGrads[0];
    beforeEach(() => {
        render(<GradCard props={testGraduate} />)
    });

    test(`should render the graduate's name`, () => {
        expect(screen.getByText('Jared Kings')).toBeInTheDocument();
    });

    test(`should render the graduate's discipline`, () => {
        expect(screen.getByText(`Software Engineering`)).toBeInTheDocument();
    });

});


// import { render, screen } from '@testing-library/react';
// import GradCard from '../Components/GradCard';
// import axios from 'axios';

// const testGrads = require('../Components/testGrads.json');

// jest.mock("axios");


// describe('GradCard test suite', () => {
//     const testGraduate = testGrads[0];
//     // beforeEach(async () => {

//     // })

//     test(`should render the graduate's name`, async () => {
//         axios.get.mockResolvedValueOnce(testGraduate);
//         const result = await <GradCard props={ testGraduate }/>
//         expect(result.props.props.name).toEqual(testGraduate.name);
//         // expect(screen.getByText('Jean-Paul')).toBeInTheDocument();
//     });

//     test(`should render the graduate's discipline`, async () => {
//         axios.get.mockResolvedValueOnce(testGraduate);
//         const result = await <GradCard props={ testGraduate }/>
//         expect(result.props.props.discipline).toBe(testGraduate.discipline);
//         // expect(result.getByText(`Software Engineering`)).toBeInTheDocument();
//     });

//     test(`should render the graduate's discipline`, async () => {
//         axios.get.mockResolvedValueOnce(testGraduate);
//         const result = await <GradCard props={ testGraduate }/>
//         expect(result.props.props.discipline).toBe(testGraduate.discipline);
//         // expect(result.getByText(`Software Engineering`)).toBeInTheDocument();
//     });

// });
