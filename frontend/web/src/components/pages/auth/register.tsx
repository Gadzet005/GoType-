import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material';
import { UserContext } from '@/store/user/UserContext';
import { observer } from "mobx-react";
import { useTitle, useNavigate, useService} from "@/hooks"
import { SignUpService, SignUpServiceResult } from "@/services/user/register"
import React from "react"
import { RoutePath } from "@/config/routes/path";
import { ApiError } from "@/config/api.config";
import { PasswordField } from "@common/components/form/PasswordField";

export const Register = observer(() => {
    useTitle("Регистрация");
  
    const navigate = useNavigate();
    const [formError, setFormError] = React.useState<string | null>(null);
    const { call: signUp, isPending } = useService(SignUpService);
  
    const submitHandler = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        const formData = new FormData(event.target as HTMLFormElement);
        const name: string = formData.get("name") as string;
        const password: string = formData.get("password") as string;
        const passwordRepeat: string = formData.get("passwordRepeat") as string;
  
        if (password !== passwordRepeat) {
          setFormError(() => "Пароли не совпадают.");
          return;
        }
  
        signUp({ name, password }).then((result: SignUpServiceResult) => {
          if (result.ok) {
            navigate(RoutePath.profile);
          } else {
            const error = result.error!;
            if (error === ApiError.userExists) {
              setFormError("Пользователь с таким именем уже зарегистрирован.");
            } else if (ApiError.invalidInput) {
              setFormError("Неверный формат имени или пароля");
            } else {
              console.error("Unknown error:", error);
              setFormError("Неизвестная ошибка.");
            }
          }
        });
      },
      [navigate, signUp]
    );
  
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
              <Typography variant="h3">Регистрация</Typography>
              <Typography component="span" variant="subtitle1">
                Уже есть аккаунт?
              </Typography>
              <Link
                sx={{ textDecoration: "none", ml: 1 }}
                variant="subtitle1"
                href={RoutePath.login}
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
                disabled={isPending()}
              >
                Зарегистрироваться
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  });


/*
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  agree?: string;
}
/*
export const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agree: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.agree) {
      newErrors.agree = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Здесь должен быть вызов API
      // const response = await fetch('/api/register', { ... })
      login({ 
        id: '1',
        username: formData.username,
        email: formData.email,
        isAdmin: false
      });
    } catch (error) {
      console.error('Registration failed:', error);
      // Обработка ошибок сервера
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agree' ? checked : value
    }));
    
    // Очистка ошибок при изменении поля
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        
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
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label={
            <span>
              I agree to the{' '}
              <Link component={RouterLink} to="/terms">
                Terms of Service
              </Link>
            </span>
          }
        />
        {errors.agree && (
          <Typography color="error" variant="body2">
            {errors.agree}
            </Typography>
        )}
        
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      
      <Typography sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Login here
        </Link>
      </Typography>
    </Box>
  );
}
  */