import "./css/CardDisplay.css";
import GradCard from "./GradCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import CardFilter from "./CardFilter";
// const tests = require('./testGrads.json');

const CardDisplay = () => {

    const url = `${process.env.REACT_APP_DB_URI}/graduates`
    const [card, setCard] = useState(null);
    const [roganTest, setRoganTest] = useState();
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setRoganTest(response.data.payload);
                setCard(response.data.payload);
            }).catch(err => err);
    }, [url])

    const handleFilter = (cards) => {
        setCard(cards);
    }
    if (card) {
        let cards = card.map(results => {
            return <GradCard props={results} key={results._id.$oid} />
        })
        return (
            <div className="Display container">
                <CardFilter
                    handleFilter={handleFilter}
                    Data={card}
                    originalData={roganTest}
                />
                <div className="row card-holder">{cards}</div>
            </div>
        );
    }

    return (
        <div className="Display">
            <p>There are no cards to display :(</p>
        </div>
    );
};

export default CardDisplay;
