import "./App.css";
import "./Components/css/global.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import GraduateSpotlight from "./Components/GraduateSpotlight";
import IndustryProfilePage from "./Components/IndustryProfilePage";
import UserAuthForms from "./Components/UserAuthForms";
import ProtectedRoute from "./Components/ProtectedRoute";

const DB_URI = process.env.REACT_APP_DB_URI;
console.log(`Connecting to: ${DB_URI}`);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/spotlight" element={<GraduateSpotlight />} />
              <Route
                path="/industryPartner"
                element={<IndustryProfilePage />}
              />
              <Route path="/" element={<Navigate to="/spotlight" />} />
            </Route>
            <Route path="/login" element={<UserAuthForms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
