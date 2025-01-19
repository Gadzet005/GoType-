import { Button, ButtonProps } from "@/components/common/Button";
import React from "react";

export interface MenuItemProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  color?: ButtonProps["color"];
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  href,
  color,
}) => {
  return (
    <Button
      sx={{ width: "100%", textAlign: "center" }}
      variant="contained"
      color={color}
      href={href}
      onClick={onClick}
      size="large"
    >
      {label}
    </Button>
  );
};
