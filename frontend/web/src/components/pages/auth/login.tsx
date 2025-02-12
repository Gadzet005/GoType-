import { useState, ChangeEvent, FormEvent } from 'react';
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material';
import { UserContext } from '@/store/user/UserContext';
import {
    SignInService,
    SignInServiceResult,
  } from "@/services/user/login";
import { useNavigate, useService, useTitle } from "@/hooks";
import { RoutePath } from "@/config/routes/path";
import { ApiError } from "@/config/api.config";
import { PasswordField } from "@common/components/form/PasswordField";
import { observer } from "mobx-react";


/*
export const Login = () => {
    const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);
  const { call: signIn, isPending } = useService(SignInService);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const name: string = formData.get("name") as string;
    const password: string = formData.get("password") as string;

    signIn({ name, password }).then((result: SignInServiceResult) => {
      if (result.ok) {
        navigate(RoutePath.profile);
      } else {
        const error = result.error!;
        if (error === ApiError.noSuchUser) {
          setFormError("Неверное имя или пароль.");
        } else if (error === ApiError.invalidInput) {
          setFormError("Неверный формат имени или пароля");
        } else {
          console.error("Unknown error:", error);
          setFormError("Неизвестная ошибка.");
        }
      }
    });
  };

  return (
    <Box sx={{
      maxWidth: 450,
      mx: 'auto',
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      mt: 4
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome Back
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          sx={{ mt: 3 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link 
          component={RouterLink} 
          to="/forgot-password" 
          variant="body2" 
          color="primary"
        >
          Forgot Password?
        </Link>
        
        <Link 
          component={RouterLink} 
          to="/register" 
          variant="body2" 
          color="primary"
        >
          Create New Account
        </Link>
      </Box>
    </Box>
  );
}
*/
export const Login = observer(() => {
    useTitle("Вход");
  
    const navigate = useNavigate();
    const [formError, setFormError] = React.useState<string | null>(null);
    const { call: signIn, isPending } = useService(SignInService);
  
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData(event.target as HTMLFormElement);
      const name: string = formData.get("name") as string;
      const password: string = formData.get("password") as string;
  
      signIn({ name, password }).then((result: SignInServiceResult) => {
        if (result.ok) {
          navigate(RoutePath.profile);
        } else {
          const error = result.error!;
          if (error === ApiError.noSuchUser) {
            setFormError("Неверное имя или пароль.");
          } else if (error === ApiError.invalidInput) {
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
                href={RoutePath.register}
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
                disabled={isPending()}
              >
                Вход
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  });