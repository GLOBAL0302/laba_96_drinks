import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import LoginPage from './features/Users/LoginPage.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';
import Cocktails from './features/Cocktails/Cocktails.tsx';
import AddCocktails from './features/Cocktails/AddCocktails.tsx';
import { ToastContainer } from 'react-toastify';
import OneCocktailPage from './features/Cocktails/OneCocktailPage.tsx';

const App = () => {
  return (
    <>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<Cocktails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addCocktail" element={<AddCocktails />} />
        <Route path="/myCocktails" element={<Cocktails />} />
        <Route path="/oneCocktailPage/:id" element={<OneCocktailPage />} />
        <Route path="/*" element={<h2>No page exist</h2>} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
