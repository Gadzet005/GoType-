import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/user";
import { observer } from "mobx-react";
import { useTitle } from "@/public/utils/title";
import { Menu } from "./Menu";

export const HomePage = observer(() => {
  useTitle("Главная");
  const user = useUser();

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xl: "30%", md: "50%", sm: "70%" },
        }}
      >
        <Typography
          sx={{ py: 5, fontWeight: "bold", fontSize: "9rem" }}
          color="primary"
          variant="h1"
        >
          GoType!
        </Typography>

        <Menu isUserAuth={user.isAuth} />
      </Box>
    </Box>
  );
});
