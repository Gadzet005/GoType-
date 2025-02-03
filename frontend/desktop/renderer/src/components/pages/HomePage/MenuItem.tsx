import { Button, ButtonProps } from "@/components/ui/Button";
import React from "react";

export interface MenuItemProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  color?: ButtonProps["color"];
  icon?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  href,
  icon,
  color = "primary",
}) => {
  return (
    <Button
      sx={{
        width: "100%",
        textAlign: "center",
        p: 2,
        fontSize: "1.25rem",
        fontWeight: 700,
        "&:hover": {
          bgcolor: `${color}.dark`,
        },
      }}
      variant="contained"
      color={color}
      href={href}
      onClick={onClick}
      startIcon={icon}
      size="large"
    >
      {label}
    </Button>
  );
};
