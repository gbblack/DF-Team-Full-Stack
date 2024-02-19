import FilterButtons from "../Components/FilterButtons";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("FilterButtons tests", () => {
    beforeEach(() => {
        const filterButtons = render(<FilterButtons filterItem={() => { }} gradFilter={["Software Engineering", "Data Science", "Cloud Engineering"]
        } />)
        // console.log(filterButtons.btnTitle("Software Engineering"))
    })

    test(`this suite is working`, () => {
        expect(true).toBeTruthy();
    })

    test(``, () => {

    })
});