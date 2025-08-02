import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile";
import TopUp from "./pages/TopUp";
import TransactionPage from "./pages/TransactionPage";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile-buy/:id" element={<Profile />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/list-transaction" element={<TransactionPage />} />
          <Route path="/myprofile" element={<EditProfile />} />
        </Routes>
      </div>
  );
}

export default App;