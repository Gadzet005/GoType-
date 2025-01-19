import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, ButtonProps } from "@/components/common/Button";
import React, { useEffect } from "react";
import { useNavigate } from "@/public/navigation";

interface BackButtonProps extends ButtonProps {
  href: string;
  params?: any[];
}

export const BackButton: React.FC<BackButtonProps> = ({
  variant = "contained",
  startIcon = <ArrowBackIcon />,
  color = "error",
  children = "Назад",
  ...other
}) => {
  const navigate = useNavigate();

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      navigate(other.href, other.params);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <Button variant={variant} startIcon={startIcon} color={color} {...other}>
      {children}
    </Button>
  );
};
