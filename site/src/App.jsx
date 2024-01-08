import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
function App() {
  return (
    <>
      <BrowserRouter>
        {window.location.pathname !== "/dashboard" && (
          <div className="underwater h-screen bg-no-repeat w-8/12 absolute right-0"></div>
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
