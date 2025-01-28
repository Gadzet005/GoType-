import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, ButtonProps } from "@/components/common/Button";
import { useNavigate } from "@/hooks/navigation";
import { useKeyboard } from "@/hooks/keyboard";

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

  useKeyboard("Escape", () => navigate(other.href, other.params));

  return (
    <Button
      sx={{ py: 2, px: 4, fontSize: "1rem", fontWeight: 500 }}
      variant={variant}
      startIcon={startIcon}
      color={color}
      {...other}
    >
      {children}
    </Button>
  );
};
