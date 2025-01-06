import { Box, Button, Typography } from "@mui/material";
import { RoutePath } from "@/routing/routePath";
import { useUser } from "@/public/user";
import { observer } from "mobx-react";

export const HomePage = observer(() => {
  const user = useUser();
  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: { xl: "30%", md: "50%", sm: "70%" },
        }}
      >
        <Typography sx={{ pb: 3 }} variant="h1">
          GoType!
        </Typography>

        {!user.isAuth && (
          <Button
            sx={{ display: "block", width: "100%", textAlign: "center" }}
            variant="contained"
            href={RoutePath.signUp}
            size="large"
          >
            Регистрация
          </Button>
        )}

        {!user.isAuth && (
          <Button
            sx={{ display: "block", width: "100%", textAlign: "center" }}
            variant="contained"
            href={RoutePath.signIn}
            size="large"
          >
            Вход
          </Button>
        )}

        {user.isAuth && (
          <Button
            sx={{ display: "block", width: "100%", textAlign: "center" }}
            variant="contained"
            href={RoutePath.profile}
            size="large"
          >
            Профиль
          </Button>
        )}
      </Box>
    </Box>
  );
});
