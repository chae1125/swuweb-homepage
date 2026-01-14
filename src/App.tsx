import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import ActivityPage from "./pages/Activity";
import FAQPage from "./pages/FAQ";
import ApplyPage from "./pages/Apply";
import ApplyForm from "./pages/ApplyForm";
import PublicApplicationPage from "./pages/PublicApplicationPage";
import MyApplicationLookup from "./pages/MyApplicationLookup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/activities" element={<ActivityPage />} /> 
        <Route path="/faq" element={<FAQPage/>} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/form" element={<ApplyForm />} />
        <Route path="/apply/check" element={<MyApplicationLookup />} />
        <Route path="/public/application/:token" element={<PublicApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
