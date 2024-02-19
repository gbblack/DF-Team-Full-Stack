// import CardDisplay from './CardDisplay';
import "./css/IndustryProfile.css";

const IndustryProfile = ({ props }) => {
  const {
    companyName,
    keyContacts = [],
    logo = "",
    officeLocations = [],
  } = props;

  const renderOfficeLocations = !officeLocations[0] ? (
    <p className="text-secondary">No locations added.</p>
  ) : (
    officeLocations.map((location) => (
      <p key={location}>
        <strong>{location}</strong>
      </p>
    ))
  );

  const renderKeyContacts = !keyContacts[0] ? (
    <p className="text-secondary">No contacts added.</p>
  ) : (
    keyContacts.map((contact) => (
      <div key={contact.name} className="contact-container d-flex flex-column">
        <p className="contact-field">
          <strong>Name:</strong> {contact.name}
        </p>
        <p className="contact-field">
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p className="contact-field">
          <strong>Telephone:</strong>{" "}
          {contact.telephone ? (
            <a href={`tel:${contact.telephone}`}>{contact.telephone}</a>
          ) : (
            "N/A"
          )}
        </p>
        <p className="contact-field">
          <strong>Position:</strong> {contact.position || "N/A"}
        </p>
        <p className="contact-field">
          <strong>Location:</strong> {contact.location || "N/A"}
        </p>
      </div>
    ))
  );

  return (
    <div className="profile-container container d-flex flex-column flex-md-row">
      <div className="profile-photo-wrapper">
        <img src={logo} className="profile-photo" alt={`${companyName} Logo`} />
      </div>
      <div className="profile-text-container d-flex flex-column">
        <h2 className="profile-heading">{companyName}</h2>
        <div className="profile-fields-container d-flex flex-column flex-lg-row">
          <div>
            <h4 className="profile-heading">Office Loctions</h4>
            <div className="locations-container d-flex flex-column">
              {renderOfficeLocations}
            </div>
          </div>
          <div className="contacts-wrapper">
            <h4 className="profile-heading">Key Contacts</h4>
            <div className="contacts-container d-flex flex-column">
              {renderKeyContacts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryProfile;
