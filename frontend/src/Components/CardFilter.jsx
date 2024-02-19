import React from 'react'
import FilterButtons from './FilterButtons';
// import Data from './testGrads.json';
import { useState } from 'react';

const CardFilter = ({ handleFilter, Data, originalData }) => {
  const [graduateCards, setGraduateCards] = useState(Data);

  const gradFilterDisc = ["Software Engineering", "Data Science", "Cloud Engineering"]
  const gradFilterAvail = [true, false]

  const filterItem = (currentCategory) => {
    const filteredCards = originalData.filter((card) => {
      return ((card.discipline === currentCategory) || (card.availability === currentCategory))
    });
    handleFilter(filteredCards);
  };

  const resetFilter = () => {
    handleFilter(originalData);
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="button-container">

            <button
              className="all-button btn-dark filter-btn"
              data-testid="all"
              onClick={() => resetFilter()}
            >
              All
            </button>
            <FilterButtons
              filterItem={filterItem}
              setGraduateCards={setGraduateCards}
              gradFilter={gradFilterDisc}
              cards={graduateCards}
              resetFilter={resetFilter}
            />
            <FilterButtons
              filterItem={filterItem}
              setGraduateCards={setGraduateCards}
              gradFilter={gradFilterAvail}
              cards={graduateCards}
              resetFilter={resetFilter}
            />

          </div>
        </div>
      </div>
    </>
  );
};


export default CardFilter