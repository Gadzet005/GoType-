import { signUp } from "@/api/user";
import { PasswordField } from "@common/components/form/PasswordField";
import { useUser } from "@/hooks/user";
import { RoutePath } from "@/navigation/routePath";
import { Alert, Box, Container, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "@/hooks/navigation";
import { BackButton } from "../common/BackButton";
import { useTitle } from "@/hooks/title";
import { auth } from "@/public/auth/utils";
import { Button } from "@/components/common/Button";
import { Link } from "@/components/common/Link";

export const SignUpPage = observer(() => {
  useTitle("Регистрация");

  const user = useUser();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState<string | null>(null);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const name: string = formData.get("name") as string;
    const password: string = formData.get("password") as string;
    const passwordRepeat: string = formData.get("passwordRepeat") as string;

    if (password !== passwordRepeat) {
      setFormError(() => "Пароли не совпадают.");
      return;
    }

    setWaiting(() => true);
    signUp(name, password).then((result) => {
      setWaiting(() => false);
      if (result.ok) {
        auth(user, result.payload!).then(() => {
          navigate(RoutePath.profile);
        });
      } else {
        const error = result.error!;
        if (error === "ERR_USER_EXISTS") {
          setFormError("Пользователь с таким именем уже зарегистрирован.");
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
    <Box sx={{ p: 2 }}>
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
