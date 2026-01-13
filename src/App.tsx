import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import ActivityPage from "./pages/Activity";
import FAQPage from "./pages/FAQ";
import ApplyPage from "./pages/Apply";
import ApplyForm from "./pages/ApplyForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/activities" element={<ActivityPage />} /> 
        <Route path="/faq" element={<FAQPage/>} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/form" element={<ApplyForm />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
