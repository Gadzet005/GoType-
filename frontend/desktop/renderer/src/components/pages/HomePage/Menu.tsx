import { Box } from "@mui/material";
import { MenuItem } from "./MenuItem";
import { menuList, AccessType } from "./menuList";
import React from "react";

interface MenuProps {
  isUserAuth: boolean;
}

export const Menu: React.FC<MenuProps> = ({ isUserAuth }) => {
  const items = menuList
    .filter((item) => {
      return (
        item.accessType == AccessType.forAll ||
        (isUserAuth && item.accessType == AccessType.forAuth) ||
        (!isUserAuth && item.accessType == AccessType.forAnonymous)
      );
    })
    .map((item) => {
      return (
        <MenuItem
          key={item.label}
          label={item.label}
          href={item.href}
          color={item.color}
          onClick={item.onClick}
          icon={item.icon}
        />
      );
    });

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        gap: 1,
      }}
    >
      {items}
    </Box>
  );
};
