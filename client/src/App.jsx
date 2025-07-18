import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { getAccountThunk } from "./store/authSlice";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";

function App() {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccountThunk());
  }, [dispatch]);

  return (
    <>
      {error && <p>{error}</p>}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
