import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/Main";
import ActivityPage from "./pages/Activity";
import FAQPage from "./pages/FAQ";
import ApplyPage from "./pages/Apply";
import ApplyForm from "./pages/ApplyForm";
import PublicApplicationPage from "./pages/PublicApplicationPage";
import MyApplicationLookup from "./pages/MyApplicationLookup";
import ScrollToTop from "./components/ScrollToTop";
import ApplyPeriodGuard from "./components/ApplyPeriodGuard";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route
          path="/apply/form"
          element={
            <ApplyPeriodGuard>
              <ApplyForm />
            </ApplyPeriodGuard>
          }
        />
        <Route path="/apply/check" element={<MyApplicationLookup />} />
        <Route
          path="/public/application/:token"
          element={<PublicApplicationPage />}
        />
        <Route path="/admin" element={<Navigate to="/" replace />} />

        <Route element={<AdminRoute />}>
          <Route
            path="/admin-panel/applications"
            element={<AdminApplicationsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
