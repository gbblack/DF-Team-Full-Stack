import IndustryProfile from "./IndustryProfile";
import OrderDisplay from "./OrderDisplay";
import "./css/GraduateSpotlight.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddVacancy from "./AddVacancy";

const IndustryProfilePage = () => {
  const url = `${process.env.REACT_APP_DB_URI}/industryPartner`;
  const [partner, setPartner] = useState(null);
  const [vacancies, setVacancies] = useState();

  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("user")).accessToken;
    axios
      .get(url, {
        headers: {
          "x-access-token": loginToken,
        },
      })
      .then((response) => {
        // console.log(response)
        // console.log(response.data.payload)
        setPartner(response.data.payload);
      })
      .catch((err) => {
        // console.log(JSON.parse(localStorage.getItem("user")).accessToken)
        console.log(err);
      });
  }, [url]);

  if (partner) {
    return (
      <div className="Main" data-testid="test-ipp">
        <IndustryProfile props={partner} />
        <OrderDisplay vacancies={partner.vacancies} />
        <AddVacancy />
      </div>
    );
  }

  return (
    <div>
      <p>There are no cards to display :(</p>
    </div>
  );
};

export default IndustryProfilePage;
