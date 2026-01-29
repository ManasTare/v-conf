/**
 * Purpose: Main application component.
 * Handles client-side routing, global providers (I18n), and protected route logic.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts & HOCs
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Context
import { I18nProvider } from "./context/I18nContext";

// Pages - Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Pages - Core
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Welcome from "./pages/Welcome";
import DefaultConfig from "./pages/DefaultConfig";
import ModifyConfig from "./pages/ModifyConfig";
import Invoice from "./pages/Invoice";

// Pages - Admin/Util
import ExcelUpload from "./pages/ExcelUpload";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            <Route path="configurator/:modelId" element={
              <ProtectedRoute>
                <DefaultConfig />
              </ProtectedRoute>
            } />
            <Route path="configure/:id" element={
              <ProtectedRoute>
                <ModifyConfig />
              </ProtectedRoute>
            } />
            <Route path="invoice" element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            } />
            <Route path="admin/upload" element={
              <ProtectedRoute>
                <ExcelUpload />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
