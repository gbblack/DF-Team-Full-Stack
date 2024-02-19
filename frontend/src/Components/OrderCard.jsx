import "./css/GradCard.css";
import "./css/OrderCard.css";

const OrderCard = ({ props }) => {
  const { position, location, startDate } = props;

  const formattedDate = new Date(startDate).toLocaleDateString("en-GB");

  return (
    <div className="card-wrapper col-12 col-md-6 col-xl-4">
      <div className="card" data-testid="test-order-card">
        <div className="order-card-body">
          <h3 className="job-name card-title">{position}</h3>

          <div className="job-details card-text">
            <ul>
              <li className="job-detail-field">
                <span>Location</span>
                <span>{location}</span>
              </li>
              <li className="job-detail-field">
                <span>Start Date</span>
                <span>{formattedDate}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
