import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Login from "./pages/Login";

function App() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <Dashboard />
      <Companies />
    </div>
  );
}

export default App;