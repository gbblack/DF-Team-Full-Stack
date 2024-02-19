import "./css/GradCard.css";
import DisplayModal from "./DisplayModal";

const GradCard = ({ props }) => {
  const { firstName, lastName, discipline, tagline, imagePath } = props;

  return (
    <div className="card-wrapper col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card" data-testid="card">
        <div className="grad-photo-wrapper">
          <img
            src={imagePath}
            className="grad-photo card-img-top"
            alt={`${firstName} ${lastName} Profile Shot`}
          />
        </div>

        <div className="card-body">
          <h3 className="card-title">
            {firstName} <br />
            {lastName}
          </h3>
          <div className="card-text">
            <p>{discipline}</p>
            <em>
              <p>{tagline}</p>
            </em>
          </div>
        </div>
        <DisplayModal props={props} />
      </div>
    </div>
  );
};

export default GradCard;
