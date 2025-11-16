import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import CreateNotice from "./pages/CreateNotice";
import Bills from "./pages/Bills";
import Shop from "./pages/Shop";
import Communities from "./pages/Communities";
import Search from "./pages/Search";
import ComplaintBox from "./pages/ComplaintBox";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has logged in before
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");
    if (hasLoggedIn === "true") {
      setIsAuthenticated(true);
    }

    // Show splash for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/otp"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <OTPVerification onSuccess={() => setIsAuthenticated(true)} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/notices"
              element={isAuthenticated ? <Notices /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/notices/create"
              element={isAuthenticated ? <CreateNotice /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/bills"
              element={isAuthenticated ? <Bills /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/shop"
              element={isAuthenticated ? <Shop /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/communities"
              element={isAuthenticated ? <Communities /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/search"
              element={isAuthenticated ? <Search /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/complaints"
              element={isAuthenticated ? <ComplaintBox /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/settings"
              element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/notifications"
              element={isAuthenticated ? <Notifications /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
