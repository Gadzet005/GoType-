import { Button } from "@/components/ui/Button";
import { RoutePath } from "@/core/config/routes/path";
import { useNavigate, useService, useTitle, useUser } from "@/core/hooks";
import { LogoutService } from "@/core/services/user/logout";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { BackButton } from "../common/BackButton";

export const ProfilePage = observer(() => {
  useTitle("Профиль");

  const user = useUser();
  const navigate = useNavigate();
  const { call: logout } = useService(LogoutService);

  const handleLogout = React.useCallback(() => {
    logout().then(() => {
      navigate(RoutePath.home);
    });
  }, [logout, navigate]);

  if (!user.profile) {
    return <></>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <BackButton href={RoutePath.home} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container sx={{ mx: 1, borderRadius: 4, p: 3 }} maxWidth="sm">
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
                {user.profile.name[0].toUpperCase()}
              </Avatar>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
                Основная информация
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ pb: 2 }}>
                  <TextField
                    sx={{ width: "100%" }}
                    variant="outlined"
                    label="Имя"
                    defaultValue={user.profile.name}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    sx={{
                      fontWeight: 500,
                      fontSize: "1rem",
                      py: 2,
                    }}
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                  >
                    Выйти из аккаунта
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
});
