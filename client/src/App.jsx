import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { DefaultNavbar } from "./components/Navbars";
import NotFound from "./pages/404";
import DashboardRs from "./pages/DashboardRs";
import Login from "./pages/Login";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <main>
      <Router>
        {user ? <DefaultNavbar /> : <></>}
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route
            path="/Dashboard/:title"
            element={user ? <DashboardRs /> : <Login />}
          />
          <Route path="/login" element={user ? <Dashboard /> : <Login />} />
          <Route path="*" element={user ? <NotFound /> : <Login />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
