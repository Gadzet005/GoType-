import { AppBar, Toolbar, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "@/store/user/UserContext";
import { useUser, useService } from "@/hooks";
import { Logo } from "../logo";
import { useNavigate } from "@/hooks/navigation";
import { LogoutService } from "@/services/user/logout";
import { RoutePath } from "@/config/routes/path";

export const Header = () => {
  const user = useUser();
  const { call: logout } = useService(LogoutService);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          sx={{ textDecoration: "none", ml: 1 }}
          variant="subtitle1"
          href={RoutePath.register}
        >
          Страница регистрации
        </Link>
        <Link
          component={RouterLink}
          to={RoutePath.default}
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          <Logo />
        </Link>
        <Button
          component={RouterLink}
          href={RoutePath.download}
          color="inherit"
        >
          Download
        </Button>
        <Button component={RouterLink} to={RoutePath.rating} color="inherit">
          Rating
        </Button>
        <Button component={RouterLink} to={RoutePath.levelList} color="inherit">
          Levels
        </Button>

        {user ? (
          <>
            <Button component={RouterLink} to="/profile" color="inherit">
              Profile
            </Button>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </>
        ) : (
          <Button component={RouterLink} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
