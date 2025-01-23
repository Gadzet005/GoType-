import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Play from "@mui/icons-material/PlayArrow";
import LogOut from "@mui/icons-material/Logout";
import RotateCcw from "@mui/icons-material/RotateLeft";

interface PauseMenuProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  onRestart: () => void;
  onExit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  open,
  onClose,
  onContinue,
  onRestart,
  onExit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          borderRadius: 4,
          minWidth: 500,
        },
      }}
    >
      <DialogContent>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 4,
            }}
          >
            Игра остановлена
          </Typography>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              startIcon={<Play />}
              onClick={onContinue}
              sx={{
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#45a049" },
                py: 1.5,
              }}
            >
              Продолжить
            </Button>

            <Button
              variant="contained"
              startIcon={<RotateCcw />}
              onClick={onRestart}
              sx={{
                bgcolor: "#2196F3",
                "&:hover": { bgcolor: "#1976D2" },
                py: 1.5,
              }}
            >
              Перезапустить
            </Button>

            <Button
              variant="contained"
              startIcon={<LogOut />}
              onClick={onExit}
              sx={{
                bgcolor: "#f44336",
                "&:hover": { bgcolor: "#d32f2f" },
                py: 1.5,
              }}
            >
              Выйти
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PauseMenu;
