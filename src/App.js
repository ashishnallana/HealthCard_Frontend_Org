import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./AuthCheck/Private";
import PatientReports from "./components/PatientReports";

function App() {
  return (
    <div className="app bg-blue-600 text-white">
      <Router>
        {/* <h1>Organisation portal</h1> */}
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" Component={Dashboard} />
            <Route path="/patient" Component={PatientReports} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
