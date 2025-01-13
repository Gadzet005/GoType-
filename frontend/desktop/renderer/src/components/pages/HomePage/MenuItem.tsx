import { Button } from "@mui/material";

interface MenuItemProps {
  label: string;
  href: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, href }) => {
  return (
    <Button
      sx={{ width: "100%", textAlign: "center" }}
      variant="contained"
      href={href}
      size="large"
    >
      {label}
    </Button>
  );
};
