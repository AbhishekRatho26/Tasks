import { Link, useLocation } from "react-router-dom";
import { ChefHat, PlusCircle, Home, Heart } from "lucide-react";
import { styled } from "styled-components";
import { Box, Typography } from "@mui/material";
import React from "react";

const SidebarContainer = styled(Box)`
  width: 250px;
  height: auto;
  background-color:rgb(207, 34, 101);
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
  font-size: 16px;

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background:rgb(69, 47, 211);
    color: white;
  }
`;

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <SidebarContainer>
      <SidebarHeader>
        <ChefHat size={32} />
        <Typography variant="h6" fontWeight="bold">
          Recipe Book
        </Typography>
      </SidebarHeader>
      <NavLink to="/" className={isActive("/")}> <Home size={20} /> Home </NavLink>
      <NavLink to="/favorites" className={isActive("/favorites")}> <Heart size={20} /> Favorites </NavLink>
      <NavLink to="/add-recipe" className={isActive("/add-recipe")}> <PlusCircle size={20} /> Add Recipe </NavLink>
    </SidebarContainer>
  );
}

export default Sidebar;
