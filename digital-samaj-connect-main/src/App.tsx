import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import Bills from "./pages/Bills";
import Receipt from "./pages/Receipt";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Communities from "./pages/Communities";
import SearchPage from "./pages/SearchPage";
import Complaints from "./pages/Complaints";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Theme from "./pages/Settings/Theme";
import FontSize from "./pages/Settings/FontSize";
import Language from "./pages/Language";
import Feedback from "./pages/Settings/Feedback";
import AppUpdates from "./pages/Settings/AppUpdates";
import ChangeMobile from "./pages/Settings/ChangeMobile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/theme" element={<Theme />} />
          <Route path="/settings/font-size" element={<FontSize />} />
          <Route path="/language" element={<Language />} />
          <Route path="/settings/feedback" element={<Feedback />} />
          <Route path="/settings/updates" element={<AppUpdates />} />
          <Route path="/settings/change-mobile" element={<ChangeMobile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
