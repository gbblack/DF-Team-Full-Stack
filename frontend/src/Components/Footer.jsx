import "./css/Footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="footer container-fluid">
      <div className="row icons justify-content-center">
        <a
          href="https://twitter.com/digitalfutures0"
          data-testid="t-link"
          target="_blank norefferer"
          className="col-1"
        >
          <TwitterIcon htmlColor={"#f4f2ee"} />
        </a>
        <a
          href="https://www.facebook.com/digital.futures2021"
          data-testid="fb-link"
          target="_blank norefferer"
          className="col-1"
        >
          <FacebookIcon htmlColor={"#f4f2ee"} />
        </a>
        <a
          href="https://www.linkedin.com/company/digital-futures2021"
          data-testid="l-link"
          target="_blank norefferer"
          className="col-1"
        >
          <LinkedInIcon htmlColor={"#f4f2ee"} />
        </a>
        <a
          href="https://www.instagram.com/digital_futures/"
          data-testid="i-link"
          target="_blank norefferer"
          className="col-1"
        >
          <InstagramIcon htmlColor={"#f4f2ee"} />
        </a>
      </div>
      © 2022 Digital Futures
    </footer>
  );
};

export default Footer;
