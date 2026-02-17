import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Coding from "./pages/Coding";
import Contact from "./pages/Contact";
import MLCourses from "./pages/MLCourses";
import AICourses from "./pages/AICourses";
import DSACourses from "./pages/DSACourses";
import WebDevelopment from "./pages/WebDevelopment";
import AppDevelopment from "./pages/AppDevelopment";
import SystemDesign from "./pages/SystemDesign";
import DeepLearning from "./pages/DeepLearning";
import CareerRoadmap from "./pages/CareerRoadmap";
import CyberSecurity from "./pages/CyberSecurity";
import Database from "./pages/Database";
import GitHub from "./pages/GitHub";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* pt-20 important hai kyunki navbar fixed hai */}
        {/* <Outlet /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ml" element={<MLCourses />} />
          <Route path="/ai" element={<AICourses />} />
          <Route path="/dsa" element={<DSACourses />} />
          <Route path="/web" element={<WebDevelopment />} />
          <Route path="/app" element={<AppDevelopment />} />
          <Route path="/sys" element={<SystemDesign />} />
          <Route path="/deep" element={<DeepLearning />} />
          <Route path="/road" element={<CareerRoadmap />} />
          <Route path="/cyber" element={<CyberSecurity />} />
          <Route path="/database" element={<Database />} />
          <Route path="/git" element={<GitHub />} />
        </Routes>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
