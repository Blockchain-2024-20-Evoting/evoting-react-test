import React from "react";
import { NavBarV2 } from "./NavBarV2";
import { Outlet } from "react-router-dom";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
      <NavBarV2 />
      <Outlet />
    </>
  );
};
