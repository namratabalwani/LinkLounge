import { BrowserRouter , Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, cssBaseLine, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme = {theme}>
        <CssBaseline />
        <Routes>
          <Route path ="/" element = {<LoginPage></LoginPage>}></Route>
          <Route path = "/home" element = { <HomePage></HomePage>}></Route>
          <Route path = "/profile/:userId" element = {<ProfilePage></ProfilePage>}></Route>          
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>;
}

export default App;
