import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavigationBar from "../../components/HomeNavigationBar";

import '../page_css/home_content.css';


function Home() {
  return (
    <div>
      <HomeNavigationBar />
      <div className="home-content">
        <Outlet />
      </div>
    </div>
  );
}
    
export default Home;
