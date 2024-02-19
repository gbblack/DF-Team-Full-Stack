import OrderCard from "./OrderCard";
import "./css/CardDisplay.css";
import "./css/OrderDisplay.css";

const OrderDisplay = ({ vacancies }) => {
  if (vacancies) {
    let orders = vacancies.map((results) => {
      return <OrderCard props={results} key={`${results._id.$oid}`} />;
    });

    return (
      <div className="order-display Display container">
        <h3 className="title" style={{ marginBottom: "16px" }}>
          Vacancies
        </h3>
        <div className="row">{orders}</div>
      </div>
    );
  }

  return <div className="Display">We have no Vacancy cards to display :(</div>;
};

export default OrderDisplay;
