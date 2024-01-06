import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <>
      <BrowserRouter>
        {window.location.pathname !== "./connected" && (
          <div className="underwater h-screen bg-no-repeat w-8/12 absolute right-0"></div>
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
