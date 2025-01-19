import { signIn } from "@/api/user";
import { PasswordField } from "@common/components/form/PasswordField";
import { useUser } from "@/public/user";
import { RoutePath } from "@/public/navigation/routePath";
import { Alert, Box, Container, TextField, Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import { Link } from "@/components/common/Link";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "@/public/navigation";
import { BackButton } from "../common/BackButton";
import { useTitle } from "@/public/utils/title";
import { auth } from "@/public/auth/utils";

export const SignInPage = observer(() => {
  useTitle("Вход");

  const user = useUser();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState<string | null>(null);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const name: string = formData.get("name") as string;
    const password: string = formData.get("password") as string;

    setWaiting(() => true);
    signIn(name, password).then((result) => {
      setWaiting(() => false);
      if (result.ok) {
        auth(user, result.payload!).then(() => {
          navigate(RoutePath.profile);
        });
      } else {
        const error = result.error!;
        if (error === "ERR_NO_SUCH_USER") {
          setFormError("Неверное имя или пароль.");
        } else if (error === "ERR_INVALID_INPUT") {
          setFormError("Неверный формат имени или пароля");
        } else {
          console.error("Unknown error:", error);
          setFormError("Неизвестная ошибка.");
        }
      }
    });
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
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h3">Вход</Typography>
            <Typography component="span" variant="subtitle1">
              Нет аккаунта?
            </Typography>
            <Link
              sx={{ textDecoration: "none", ml: 1 }}
              variant="subtitle1"
              href={RoutePath.signUp}
            >
              Страница регистрации
            </Link>
          </Box>

          {formError && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Alert severity="error" variant="filled">
                {formError}
              </Alert>
            </Box>
          )}

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={submitHandler}
          >
            <TextField name="name" variant="outlined" label="Имя" type="text" />
            <PasswordField />
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={waiting}
            >
              Вход
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
});
