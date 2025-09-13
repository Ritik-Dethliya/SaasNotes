import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Notes from "./pages/Notes.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import TenantProvider from "./context/TenantContext.jsx";
import User from "./pages/User.jsx";
import Admin from "./pages/admin.jsx";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/user" element={<User/>} />
            <Route path="/admin" element={<Admin/>} />

            <Route path="/upgrade" element={<Upgrade />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </AuthProvider>
  );
}


