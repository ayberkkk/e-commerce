import React from "react";
import AdminHeader from "./layouts/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
