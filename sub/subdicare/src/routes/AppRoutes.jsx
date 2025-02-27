import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LogInPage from "../pages/home/LogInPage";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminHomePage from "../pages/admin/Home";
import AdminAnnouncement from "../pages/admin/Announcement";
import AdminReports from "../pages/admin/Reports";
import AdminRequests from "../pages/admin/Requests";
import AdminAccounts from "../pages/admin/Accounts";

import MemberLayout from "../pages/member/MemberLayout";
import Announcements from "../pages/member/Announcement";
import Report from "../pages/member/Report";
import RequestServices from "../pages/member/Request";
import MemberHome from "../pages/member/Home";
import MemberAccount from "../pages/member/YourAccount";

import ModeratorLayout from "../pages/moderator/ModeratorLayout";
import ModeratorAnnouncement from "../pages/moderator/Announcement";
import ModeratorHomePage from "../pages/moderator/Home";
import ModeratorAccounts from "../pages/moderator/Account";
import ModeratorRequests from "../pages/moderator/Requests";
import ModeratorReports from "../pages/moderator/Reports";
import ModeratorYourAccount from "../pages/moderator/YourAccount";

import ProtectedRoute from "./ProtectedRoute";

import HomeLayout from "../pages/home/HomeLayout";
import Home from "../pages/home/Home";
import AboutUs from "../pages/home/AboutUs";
import Contacts from "../pages/home/Contacts";
import PortalAdmin from "../pages/PortalAdmin";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<HomeLayout />}>

        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    <Route path="/admin-portal" element={<PortalAdmin />}/>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedTable="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<AdminHomePage />} />
        <Route path="announcements" element={<AdminAnnouncement />} />
        <Route path="report" element={<AdminReports />} />
        <Route path="request" element={<AdminRequests />} />
        <Route path="account" element={<AdminAccounts />} />
      </Route>

      {/* Moderator Routes */}
      <Route
        path="/moderator"
        element={
          <ProtectedRoute allowedTable="moderators">
            <ModeratorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<ModeratorHomePage />} />
        <Route path="announcements" element={<ModeratorAnnouncement />} />
        <Route path="reports" element={<ModeratorReports />} />
        <Route path="requests" element={<ModeratorRequests />} />
        <Route path="accounts" element={<ModeratorAccounts />} />
        <Route path="your-account" element={<ModeratorYourAccount />} />
      </Route>

      {/* Member Routes */}
      <Route
        path="/member"
        element={
          <ProtectedRoute allowedTable="members">
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<MemberHome />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="report" element={<Report />} />
        <Route path="request" element={<RequestServices />} />
        <Route path="your-account" element={<MemberAccount />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
