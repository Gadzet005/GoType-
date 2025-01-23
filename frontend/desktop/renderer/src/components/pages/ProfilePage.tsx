import { useUser } from "@/hooks/user";
import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "@/components/common/Button";
import { BackButton } from "../common/BackButton";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { unauth } from "@/public/auth/utils";
import { useNavigate } from "@/hooks/navigation";

export const ProfilePage = observer(() => {
  useTitle("Профиль");

  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    unauth(user).then(() => {
      navigate(RoutePath.home);
    });
  };

  if (!user.profile) {
    return <></>;
  }

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
              <Avatar sx={{ width: 64, height: 64, bgcolor: "orange" }}>
                {user.profile.name[0].toUpperCase()}
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
                  defaultValue={user.profile.name}
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
