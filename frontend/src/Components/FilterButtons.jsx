import React from 'react'
import '../Components/css/CardFilter.css'

const FilterButtons = ({ filterItem, setGraduateCards, gradFilter, cards, resetFilter }) => {

  const btnTitle = attribute => {
    if (attribute === true) {   //Note this has to be equal to true, not just truthy for it to work
      return "Available";
    }
    if (attribute === false) {
      return "Unavailable";
    }
    return (attribute);
  }

  return (
    <>
      {gradFilter.map((grad, id) => {
        // console.log(grad)
        return (
          <button
            className="discipline-buttons btn-dark filter-btn"
            onClick={() => filterItem(grad)}
            key={id}
          >
            {btnTitle(grad)}
          </button>

        );
      })}


    </>
  );
}

export default FilterButtons;