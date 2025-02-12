import "./css/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './store/user/UserProvider';

import { Header } from './components/header/Header';
import { Register } from './components/pages/auth/register';
import { Login } from './components/pages/auth/login';
import { Download } from './components/pages/download';
import { CommunityRules } from './components/pages/support/rules';
import { Main } from './components/pages/main/main';
import { Levels } from './components/pages/levels/levels';
import { Rating } from './components/pages/rating/rating';
import { AppNavigation } from "./navigation/AppNavigation";

import { routes } from "@/config/routes";
/*<Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/download" element={<Download />} />
                <Route path="/support/rules" element={<CommunityRules />} />
                <Route path="/" element={<Main />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/rating" element={<Rating />} />
                
                </Routes>
                */
export const App = () => {
    return (
        <UserProvider>
          <BrowserRouter>
          <Header />
            <div className="out container">
                <div className="inn container">
                <AppNavigation routes={routes} />
                
            </div>
            </div>
          </BrowserRouter>
        </UserProvider>
      );
}
  
