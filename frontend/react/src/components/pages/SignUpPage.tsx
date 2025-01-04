import { signUp } from "@/api/user";
import { PasswordField } from "@/components/form/PasswordField";
import { useUser } from "@/public/user";
import { RoutePath } from "@/routing/routePath";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../other/BackButton";

export const SignUpPage = observer(() => {
  const user = useUser();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState<string | null>(null);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const name: string = formData.get("name") as string;
    const password: string = formData.get("password") as string;
    const passwordRepeat: string = formData.get("passwordRepeat") as string;

    if (password !== passwordRepeat) {
      setFormError(() => "Пароли не совпадают.");
      return;
    }

    setWaiting(() => true);
    signUp(email, name, password).then((result) => {
      setWaiting(() => false);
      if (result.ok) {
        user.login(result.payload!);
        navigate(RoutePath.profile);
      } else {
        setFormError(() => result.error!);
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
            <Typography variant="h3">Регистрация</Typography>
            <Typography component="span" variant="subtitle1">
              Уже есть аккаунт?
            </Typography>
            <Link
              sx={{ textDecoration: "none", ml: 1 }}
              variant="subtitle1"
              href={RoutePath.signIn}
            >
              Страница входа
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
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField name="name" variant="outlined" label="Имя" type="text" />
            <PasswordField name="password" />
            <PasswordField name="passwordRepeat" label="Повторите пароль" />
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={waiting}
            >
              Зарегистрироваться
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
});
