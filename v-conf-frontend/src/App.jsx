import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import DefaultConfig from "./pages/DefaultConfig";
import ModifyConfig from "./pages/ModifyConfig";
import Invoice from "./pages/Invoice";
import ExcelUpload from "./pages/ExcelUpload";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
