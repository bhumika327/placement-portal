import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import MyApplications from "./pages/MyApplications";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          {children}
        </div>
      </div>
    </>
  );
}

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            token ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/companies"
          element={
            token ? (
              <Layout>
                <Companies />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/my-applications"
          element={
            token ? (
              <Layout>
                <MyApplications />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;