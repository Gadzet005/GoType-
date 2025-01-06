import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BackButton = (props: { href: string }) => {
  const navigate = useNavigate();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigate(props.href);
    }
  });

  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      color="error"
      href={props.href}
    >
      Назад
    </Button>
  );
};
