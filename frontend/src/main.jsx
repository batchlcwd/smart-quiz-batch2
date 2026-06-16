import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/public/HomePage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";
import DashboardPage from "./pages/protected/DashboardPage.jsx";
import AppLayout from "./pages/public/AppLayout.jsx";
import { ThemeProvider } from "next-themes";
import FeaturesPage from "./pages/public/FeaturesPage.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import DashboardHome from "./pages/protected/DashboardHome.jsx";
import NewFeedPage from "./pages/protected/NewFeedPage.jsx";
import SettingsPage from "./pages/protected/SettingsPage.jsx";
import AddQuizPage from "./pages/protected/AddQuizPage.jsx";
import GenerateQuizPage from "./pages/protected/GenerateQuizPage.jsx";
import ManageQuizzesPage from "./pages/protected/ManageQuizzesPage.jsx";
import ManageCategoriesPage from "./pages/protected/ManageCategoriesPage.jsx";
import ManageQuestionsPage from "./pages/protected/ManageQuestionsPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="features" element={<FeaturesPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHome />} />
            <Route path="newfeed" element={<NewFeedPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="add-quiz" element={<AddQuizPage />} />
            <Route path="generate-quiz" element={<GenerateQuizPage />} />
            <Route path="manage-quizzes" element={<ManageQuizzesPage />} />
            <Route path="manage-categories" element={<ManageCategoriesPage />} />
            <Route path="manage-questions" element={<ManageQuestionsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
