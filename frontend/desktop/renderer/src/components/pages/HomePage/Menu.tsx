import { Box } from "@mui/material";
import { RoutePath } from "@/routing/routePath";
import { MenuItem } from "./MenuItem";
import React from "react";

enum AccessType {
  forAnonymous,
  forAuth,
  forAll,
}

interface MenuItem {
  label: string;
  href: string;
  accessType: AccessType;
}

const menu: MenuItem[] = [
  {
    label: "Вход",
    href: RoutePath.signIn,
    accessType: AccessType.forAnonymous,
  },
  {
    label: "Регистрация",
    href: RoutePath.signUp,
    accessType: AccessType.forAnonymous,
  },
  {
    label: "Список уровней",
    href: RoutePath.levelList,
    accessType: AccessType.forAuth,
  },
  {
    label: "Редактор уровня",
    href: RoutePath.editor,
    accessType: AccessType.forAuth,
  },
  {
    label: "Профиль",
    href: RoutePath.profile,
    accessType: AccessType.forAuth,
  },
];

interface MenuProps {
  isUserAuth: boolean;
}

export const Menu: React.FC<MenuProps> = ({ isUserAuth }) => {
  const items = menu
    .filter((item) => {
      return (
        item.accessType == AccessType.forAll ||
        (isUserAuth && item.accessType == AccessType.forAuth) ||
        (!isUserAuth && item.accessType == AccessType.forAnonymous)
      );
    })
    .map((item) => {
      return <MenuItem key={item.label} label={item.label} href={item.href} />;
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
