import { BrowserRouter as Router, Route, Routes, useLocation , Navigate} from "react-router-dom";
import NavigationBar from "./components/Navbar"; // Import Navbar

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HealthForm from "./pages/HealthForm";
import SubmittedReports from "./pages/SubmitedReports";
import PatientReports from "./pages/PatientReports";
import ViewReport from "./pages/ViewReport";
import DoctorDashBoard from "./pages/DoctorDashboard"; // ✅ Import




function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <NavigationBar />} {/* Navbar will not show on Login/Register */}
      <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-form" element={<HealthForm />} />
        <Route path="/submitted-reports" element={<SubmittedReports />} />
        <Route path="/patient-reports" element={<PatientReports />} />
        <Route path="/patient-report/:reportId" element={<ViewReport />} />
        <Route path="/doctor-dashboard" element={<DoctorDashBoard />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
