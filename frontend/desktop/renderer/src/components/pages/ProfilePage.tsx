import { useUser } from "../../public/user";
import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BackButton } from "../other/BackButton";
import { RoutePath } from "@/routing/routePath";
import { useTitle } from "@/public/utils/title";
import { unauth } from "@/public/auth/utils";

export const ProfilePage = observer(() => {
  useTitle("Профиль");

  const user = useUser();

  const handleLogout = () => {
    unauth(user);
  };

  return (
    <Box>
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
              <Avatar sx={{ width: 64, height: 64 }}>
                {user.profile!.name[0].toUpperCase()}
              </Avatar>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
                Основная информация
              </Typography>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  label="Имя"
                  defaultValue={user.profile!.name}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
});
