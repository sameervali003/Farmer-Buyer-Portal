import React from "react"
//import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterFarmer from "./pages/RegisterFarmer";
import RegisterBuyer from "./pages/RegisterBuyer";
import Detect from "./pages/Detect";
import Share from "./pages/Share";
import Profile from "./pages/Profile";
import Lend from "./pages/Lend";
import Tool from "./pages/Tool";
import { LoginProvider } from "./contexts/LoginContext";
import MyTools from "./pages/MyTools";
import Sell from "./pages/Sell";
import MyCrops from "./pages/MyCrops";
import Crop from "./pages/Crop";
import Lend2 from "./pages/Lend2";
import Footer from "./components/Footer";
import FarmerPortal from "./pages/farmer_dashboard";
import Dashboard from './pages/buyer_dashboard';
import EditBuyerProfile from './pages/edit_buyer_profile';
import EditFarmerProfile from "./pages/edit_farmer_profile";
import RecentBuyerTransactions from "./pages/view_buyer_transactions";
import RealTimeCropPriceGraph from "./pages/graph";


function App() {
  return (
    <LoginProvider>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registerfarm" element={<RegisterFarmer />} />
          <Route exact path="/registerbuyer" element={<RegisterBuyer />} />

          <Route exact path="about" element={<Home />} />
          <Route exact path="detect" element={<Detect />} />
          <Route exact path="share" element={<Share />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="lend" element={<Lend />} />
          <Route exact path="lend2" element={<Lend2 />} />
          <Route exact path="tool/:id" element={<Tool />} />
          <Route exact path="mytools" element={<MyTools />} />
          <Route exact path="mycrops" element={<MyCrops />} />
          <Route exact path="sell" element={<Sell />} />
          <Route exact path="crop/:id" element={<Crop />} />
          <Route exact path="/farmer_dashboard" element={<FarmerPortal />} />
          <Route exact path="/buyer_dashboard" element={<Dashboard />} />
          <Route exact path="/edit_buyer_profile" element={<EditBuyerProfile />} />
          <Route exact path="/edit_farmer_profile" element={<EditFarmerProfile />} />
          <Route exact path="/view_buyer_trans" element={<RecentBuyerTransactions />} />

          <Route exact path="/real-time-graph" element={<RealTimeCropPriceGraph />} />


        </Routes>
      </BrowserRouter>
      <Footer />
    </LoginProvider>
  );
}

export default App;