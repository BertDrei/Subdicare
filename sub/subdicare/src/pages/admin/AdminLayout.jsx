import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // For nested routing
import NavigationBar from '../../components/AdminNavigationBar';
import '../page_css/admin_content.css';

function Home() {
  // Kunin ang user data mula sa localStorage
  const user_id = localStorage.getItem("user_id");
  const user_name = localStorage.getItem("user_name");
  const user_table = localStorage.getItem("user_table");

  useEffect(() => {
    console.log("User ID:", user_id);
    console.log("User Name:", user_name);
    console.log("User Table:", user_table);
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="admin-content">
        <Outlet /> {/* Displays nested routes */}
      </div>
    </div>
  );
}

export default Home;
